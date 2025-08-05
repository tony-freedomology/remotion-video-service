import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const ProblemSetupSegment = ({ content, brandColors }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated radial gradients for lava lamp effect
  const blob1X = interpolate(frame, [0, fps * 15], [20, 80], {
    extrapolateRight: 'extend',
  });
  const blob1Y = interpolate(frame, [0, fps * 12], [30, 70], {
    extrapolateRight: 'extend',
  });

  const blob2X = interpolate(frame, [0, fps * 18], [70, 30], {
    extrapolateRight: 'extend',
  });
  const blob2Y = interpolate(frame, [0, fps * 10], [60, 20], {
    extrapolateRight: 'extend',
  });

  const blob3X = interpolate(frame, [0, fps * 20], [40, 90], {
    extrapolateRight: 'extend',
  });
  const blob3Y = interpolate(frame, [0, fps * 14], [80, 40], {
    extrapolateRight: 'extend',
  });

  // Animation timings
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const questionOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const answerOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(circle at ${blob1X}% ${blob1Y}%, rgba(34, 223, 220, 0.15) 0%, transparent 50%),
          radial-gradient(circle at ${blob2X}% ${blob2Y}%, rgba(34, 237, 182, 0.1) 0%, transparent 60%),
          ${brandColors.accent}
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          paddingLeft: 60,
          paddingRight: 60,
          textAlign: 'center',
        }}
      >
        {/* Section title */}
        <div
          style={{
            opacity: titleOpacity,
            marginBottom: 60,
          }}
        >
          <h2
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-1px',
              margin: 0,
            }}
          >
            The Reality Check
          </h2>
          <div
            style={{
              width: 100,
              height: 4,
              background: brandColors.primary,
              margin: '20px auto 0 auto',
              borderRadius: 2,
            }}
          />
        </div>

        {/* Key question */}
        <div
          style={{
            opacity: questionOpacity,
            marginBottom: 50,
          }}
        >
          <div
            style={{
              background: `rgba(34, 223, 220, 0.1)`,
              borderRadius: 15,
              padding: 40,
              border: `2px solid rgba(34, 223, 220, 0.3)`,
            }}
          >
            <p
              style={{
                fontSize: 42,
                lineHeight: 1.3,
                color: brandColors.primary,
                fontWeight: 700,
                letterSpacing: '-0.5px',
                margin: 0,
              }}
            >
              "What is my vision for my marriage?"
            </p>
          </div>
        </div>

        {/* Key insight */}
        <div style={{ opacity: answerOpacity }}>
          <p
            style={{
              fontSize: 38,
              lineHeight: 1.4,
              color: 'white',
              fontWeight: 600,
              letterSpacing: '-0.5px',
              margin: 0,
            }}
          >
            Most men <span style={{ color: brandColors.secondary }}>drift</span>, responding to daily pressures, hoping things will just get better with time
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};