import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { SprintVideo } from './SprintVideo.js';

// Default video configuration
const DEFAULT_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
};

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="SprintVideo"
        component={SprintVideo}
        durationInFrames={600} // 20 seconds default, will be overridden by actual script duration
        fps={DEFAULT_CONFIG.fps}
        width={DEFAULT_CONFIG.width}
        height={DEFAULT_CONFIG.height}
        defaultProps={{
          script: {
            title: 'Sample Sprint Video',
            subtitle: 'Day 1',
            segments: [],
            totalDuration: 20,
            audioFile: ''
          },
          brandColors: {
            primary: '#22DFDC',
            secondary: '#22EDB6',
            accent: '#242424'
          },
          sprintId: 'sample',
          dayNumber: 1
        }}
        // Calculate duration based on script
        calculateMetadata={({ props }) => {
          const { script } = props;
          const durationInFrames = Math.ceil(script.totalDuration * DEFAULT_CONFIG.fps);
          
          return {
            durationInFrames,
            props: {
              ...props,
              calculatedDuration: durationInFrames
            }
          };
        }}
      />
    </>
  );
};

// Register the root component
registerRoot(RemotionRoot);