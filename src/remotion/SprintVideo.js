import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';

// Import segment components
import { OpeningSegment } from './segments/OpeningSegment.js';
import { IntroductionSegment } from './segments/IntroductionSegment.js';
import { ProblemSetupSegment } from './segments/ProblemSetupSegment.js';
import { MetaphorSegment } from './segments/MetaphorSegment.js';
import { ReflectionSegment } from './segments/ReflectionSegment.js';
import { VisionBuildingSegment } from './segments/VisionBuildingSegment.js';
import { ActionItemsSegment } from './segments/ActionItemsSegment.js';
import { AffirmationSegment } from './segments/AffirmationSegment.js';

export const SprintVideo = ({ script, brandColors, sprintId, dayNumber }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Component mapping for different segment types
  const getSegmentComponent = (type) => {
    const componentMap = {
      opening: OpeningSegment,
      introduction: IntroductionSegment,
      'problem-setup': ProblemSetupSegment,
      metaphor: MetaphorSegment,
      reflection: ReflectionSegment,
      'vision-building': VisionBuildingSegment,
      'action-items': ActionItemsSegment,
      affirmation: AffirmationSegment,
    };

    return componentMap[type] || IntroductionSegment; // Fallback to introduction
  };

  // Render individual segment
  const renderSegment = (segment, index) => {
    const startFrame = Math.floor(segment.startTime * fps);
    const endFrame = Math.floor(segment.endTime * fps);
    const durationFrames = endFrame - startFrame;

    const SegmentComponent = getSegmentComponent(segment.type);

    return (
      <Sequence
        key={`${segment.type}-${index}`}
        from={startFrame}
        durationInFrames={durationFrames}
      >
        <SegmentComponent
          content={segment.content}
          segment={segment}
          brandColors={brandColors}
          segmentIndex={index}
          totalSegments={script.segments.length}
        />
      </Sequence>
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: '#242424' }}>
      {/* Audio track */}
      {script.audioFile && (
        <Audio src={script.audioFile} />
      )}

      {/* Render all segments */}
      {script.segments.map((segment, index) => renderSegment(segment, index))}

      {/* Optional: Debug overlay in development */}
      {process.env.NODE_ENV === 'development' && (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: 4,
              fontSize: 14,
              fontFamily: 'monospace',
            }}
          >
            <div>Frame: {frame}</div>
            <div>Time: {(frame / fps).toFixed(1)}s</div>
            <div>Sprint: {sprintId} Day {dayNumber}</div>
            <div>Segments: {script.segments.length}</div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};