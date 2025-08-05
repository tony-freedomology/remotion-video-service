import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const ReflectionSegment = ({ content, brandColors }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated radial gradients for lava lamp effect
  const blob1X = interpolate(frame, [0, fps * 17], [25, 75], {
    extrapolateRight: 'extend',
  });
  const blob1Y = interpolate(frame, [0, fps * 14], [40, 60], {
    extrapolateRight: 'extend',
  });

  const blob2X = interpolate(frame, [0, fps * 22], [60, 10], {
    extrapolateRight: 'extend',
  });
  const blob2Y = interpolate(frame, [0, fps * 9], [80, 20], {
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

  const point1Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const point2Opacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(circle at ${blob1X}% ${blob1Y}%, rgba(34, 237, 182, 0.12) 0%, transparent 55%),
          radial-gradient(circle at ${blob2X}% ${blob2Y}%, rgba(34, 223, 220, 0.1) 0%, transparent 65%),
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
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            marginBottom: 50,
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
            Time to Reflect
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
            marginBottom: 60,
          }}
        >
          <p
            style={{
              fontSize: 42,
              lineHeight: 1.3,
              color: brandColors.primary,
              fontWeight: 600,
              letterSpacing: '-0.5px',
              margin: 0,
            }}
          >
            How often do you take the lead with intimacy, connection, and the emotional climate of your home?
          </p>
        </div>

        {/* Two key points */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 50,
          }}
        >
          {/* Point 1 */}
          <div style={{ opacity: point1Opacity }}>
            <div
              style={{
                background: 'rgba(34, 223, 220, 0.1)',
                borderRadius: 15,
                padding: 30,
                border: '2px solid rgba(34, 223, 220, 0.3)',
                textAlign: 'left',
              }}
            >
              <h3
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: brandColors.primary,
                  letterSpacing: '-0.5px',
                  marginBottom: 15,
                  margin: '0 0 15px 0',
                }}
              >
                Current Patterns
              </h3>
              <p
                style={{
                  fontSize: 24,
                  color: 'white',
                  fontWeight: 500,
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                Where are you leading well, and where are you holding back?
              </p>
            </div>
          </div>

          {/* Point 2 */}
          <div style={{ opacity: point2Opacity }}>
            <div
              style={{
                background: 'rgba(34, 237, 182, 0.1)',
                borderRadius: 15,
                padding: 30,
                border: '2px solid rgba(34, 237, 182, 0.3)',
                textAlign: 'left',
              }}
            >
              <h3
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: brandColors.secondary,
                  letterSpacing: '-0.5px',
                  marginBottom: 15,
                  margin: '0 0 15px 0',
                }}
              >
                Honest Awareness
              </h3>
              <p
                style={{
                  fontSize: 24,
                  color: 'white',
                  fontWeight: 500,
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                See your patterns without shame, just clarity
              </p>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};