import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateVideo } from './video-generator.js';
import { supabase } from './supabase-client.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'Remotion Video Service',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Main video generation endpoint
app.post('/generate-video', async (req, res) => {
  try {
    const { sprintId, dayNumber, videoScript, brandColors } = req.body;

    // Validate required fields
    if (!sprintId || !dayNumber || !videoScript) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: sprintId, dayNumber, videoScript'
      });
    }

    console.log(`🎬 Starting video generation for Sprint ${sprintId}, Day ${dayNumber}`);
    console.log(`📝 Script: "${videoScript.title}" with ${videoScript.segments.length} segments`);

    // Set timeout for long-running video generation
    const timeout = setTimeout(() => {
      res.status(408).json({
        success: false,
        error: 'Video generation timed out'
      });
    }, 15 * 60 * 1000); // 15 minutes

    // Generate the video
    const result = await generateVideo({
      sprintId,
      dayNumber,
      videoScript,
      brandColors: brandColors || {
        primary: '#22DFDC',
        secondary: '#22EDB6',
        accent: '#242424'
      }
    });

    clearTimeout(timeout);

    console.log(`✅ Video generation complete: ${result.videoUrl}`);

    res.json({
      success: true,
      videoUrl: result.videoUrl,
      fileName: result.fileName,
      duration: result.duration,
      fileSize: result.fileSize,
      message: 'Video generated successfully'
    });

  } catch (error) {
    console.error('❌ Video generation error:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Video generation failed',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Bulk video generation endpoint (for multiple days)
app.post('/generate-videos-bulk', async (req, res) => {
  try {
    const { sprintId, lessons, brandColors } = req.body;

    if (!sprintId || !lessons || !Array.isArray(lessons)) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: sprintId, lessons (array)'
      });
    }

    console.log(`🎬 Starting bulk video generation for Sprint ${sprintId} (${lessons.length} lessons)`);

    const results = [];
    const errors = [];

    // Process each lesson sequentially to avoid overwhelming the system
    for (const lesson of lessons) {
      try {
        const result = await generateVideo({
          sprintId,
          dayNumber: lesson.day,
          videoScript: lesson.videoScript,
          brandColors: brandColors || {
            primary: '#22DFDC',
            secondary: '#22EDB6',
            accent: '#242424'
          }
        });

        results.push({
          day: lesson.day,
          success: true,
          videoUrl: result.videoUrl,
          duration: result.duration
        });

        console.log(`✅ Day ${lesson.day} complete`);

      } catch (error) {
        console.error(`❌ Day ${lesson.day} failed:`, error.message);
        errors.push({
          day: lesson.day,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      results,
      errors,
      totalProcessed: lessons.length,
      successCount: results.length,
      errorCount: errors.length,
      message: `Bulk generation complete: ${results.length}/${lessons.length} successful`
    });

  } catch (error) {
    console.error('❌ Bulk video generation error:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Bulk video generation failed'
    });
  }
});

// Video status endpoint (for checking progress)
app.get('/video-status/:sprintId/:dayNumber', async (req, res) => {
  try {
    const { sprintId, dayNumber } = req.params;
    
    // Check if video exists in Supabase storage
    const fileName = `${sprintId}/day-${dayNumber}.mp4`;
    const { data, error } = await supabase.storage
      .from('sprint-videos')
      .list(sprintId, {
        search: `day-${dayNumber}.mp4`
      });

    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to check video status'
      });
    }

    const videoExists = data && data.length > 0;
    
    if (videoExists) {
      const { data: urlData } = supabase.storage
        .from('sprint-videos')
        .getPublicUrl(fileName);

      res.json({
        success: true,
        exists: true,
        videoUrl: urlData.publicUrl,
        fileName: fileName
      });
    } else {
      res.json({
        success: true,
        exists: false,
        message: 'Video not found'
      });
    }

  } catch (error) {
    console.error('❌ Video status check error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check video status'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /health',
      'POST /generate-video',
      'POST /generate-videos-bulk',
      'GET /video-status/:sprintId/:dayNumber'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Remotion Video Service running on port ${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`🎬 Video generation: http://localhost:${PORT}/generate-video`);
});

export default app;