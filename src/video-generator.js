import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { createWriteStream } from 'fs';
import { mkdir, unlink } from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { supabase } from './supabase-client.js';

/**
 * Main video generation function
 */
export async function generateVideo({ sprintId, dayNumber, videoScript, brandColors }) {
  const tempDir = `/tmp/remotion-${sprintId}-${dayNumber}`;
  const outputPath = `${tempDir}/output.mp4`;
  
  try {
    // Create temporary directory
    await mkdir(tempDir, { recursive: true });
    
    console.log(`📁 Created temp directory: ${tempDir}`);
    
    // Download audio file if provided
    let audioPath = null;
    if (videoScript.audioFile) {
      audioPath = await downloadAudio(videoScript.audioFile, `${tempDir}/audio.mp3`);
      console.log(`🎵 Audio downloaded: ${audioPath}`);
    }

    // Bundle the Remotion composition
    console.log('📦 Bundling Remotion composition...');
    const bundleLocation = await bundle({
      entryPoint: path.resolve('./src/remotion/index.js'),
      webpackOverride: (config) => config,
    });

    // Get composition details
    const compositionId = 'SprintVideo';
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: compositionId,
      inputProps: {
        script: videoScript,
        brandColors,
        sprintId,
        dayNumber
      },
    });

    if (!composition) {
      throw new Error(`Composition "${compositionId}" not found`);
    }

    console.log(`🎬 Rendering video: ${composition.width}x${composition.height}, ${composition.fps}fps, ${composition.durationInFrames} frames`);

    // Render the video
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: {
        script: videoScript,
        brandColors,
        sprintId,
        dayNumber
      },
      // Include audio if available
      ...(audioPath && { audioCodec: 'aac' }),
      // Quality settings
      crf: 18, // High quality
      pixelFormat: 'yuv420p',
      // Performance settings
      concurrency: 2,
    });

    console.log(`✅ Video rendered successfully: ${outputPath}`);

    // Upload to Supabase storage
    const videoUrl = await uploadVideoToSupabase(outputPath, sprintId, dayNumber);

    // Get file stats
    const stats = await import('fs').then(fs => fs.promises.stat(outputPath));
    
    // Cleanup temporary files
    await cleanupTempFiles(tempDir);

    return {
      videoUrl,
      fileName: `${sprintId}/day-${dayNumber}.mp4`,
      duration: composition.durationInFrames / composition.fps,
      fileSize: stats.size,
      resolution: `${composition.width}x${composition.height}`
    };

  } catch (error) {
    console.error('❌ Video generation failed:', error);
    
    // Cleanup on error
    try {
      await cleanupTempFiles(tempDir);
    } catch (cleanupError) {
      console.error('⚠️ Cleanup failed:', cleanupError);
    }
    
    throw error;
  }
}

/**
 * Download audio file from URL
 */
async function downloadAudio(audioUrl, outputPath) {
  try {
    const response = await axios({
      method: 'GET',
      url: audioUrl,
      responseType: 'stream',
      timeout: 30000 // 30 second timeout
    });

    const writer = createWriteStream(outputPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(outputPath));
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('❌ Audio download failed:', error);
    throw new Error(`Failed to download audio: ${error.message}`);
  }
}

/**
 * Upload video to Supabase storage
 */
async function uploadVideoToSupabase(videoPath, sprintId, dayNumber) {
  try {
    const fileName = `${sprintId}/day-${dayNumber}.mp4`;
    
    // Read the video file
    const fs = await import('fs');
    const videoBuffer = await fs.promises.readFile(videoPath);
    
    console.log(`📤 Uploading video to Supabase: ${fileName} (${Math.round(videoBuffer.length / 1024 / 1024)}MB)`);

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('sprint-videos')
      .upload(fileName, videoBuffer, {
        contentType: 'video/mp4',
        upsert: true
      });

    if (error) {
      throw new Error(`Supabase upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('sprint-videos')
      .getPublicUrl(fileName);

    console.log(`✅ Video uploaded successfully: ${urlData.publicUrl}`);
    
    return urlData.publicUrl;

  } catch (error) {
    console.error('❌ Video upload failed:', error);
    throw error;
  }
}

/**
 * Clean up temporary files
 */
async function cleanupTempFiles(tempDir) {
  try {
    const fs = await import('fs');
    await fs.promises.rm(tempDir, { recursive: true, force: true });
    console.log(`🗑️ Cleaned up temp directory: ${tempDir}`);
  } catch (error) {
    console.error('⚠️ Cleanup warning:', error.message);
    // Don't throw - cleanup failure shouldn't break the main process
  }
}