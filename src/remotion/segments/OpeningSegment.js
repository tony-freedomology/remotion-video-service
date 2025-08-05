import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const OpeningSegment = ({ content, brandColors }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated gradient positions for lava lamp effect
  const blob1X = interpolate(frame, [0, fps * 16], [30, 70], {
    extrapolateRight: 'extend',
  });
  const blob1Y = interpolate(frame, [0, fps * 13], [20, 80], {
    extrapolateRight: 'extend',
  });

  const blob2X = interpolate(frame, [0, fps * 20], [80, 20], {
    extrapolateRight: 'extend',
  });
  const blob2Y = interpolate(frame, [0, fps * 11], [70, 30], {
    extrapolateRight: 'extend',
  });

  // Animation timings
  const logoOpacity = interpolate(frame, [0, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleOpacity = interpolate(frame, [45, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(frame, [90, 135], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(circle at ${blob1X}% ${blob1Y}%, rgba(34, 223, 220, 0.12) 0%, transparent 60%),
          radial-gradient(circle at ${blob2X}% ${blob2Y}%, rgba(34, 237, 182, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, ${brandColors.accent} 0%, #2A4A4A 100%)
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'Helvetica, Arial, sans-serif',
      }}
    >
      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          marginBottom: 60,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 10px 30px rgba(34, 223, 220, 0.2)`,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-2px',
            }}
          >
            MS
          </div>
        </div>
      </div>

      {/* Main Title */}
      <div
        style={{
          opacity: titleOpacity,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        <h1
          style={{
            fontSize: 84,
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-3px',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          MAGNETIC SPRINT
        </h1>
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 34,
            fontWeight: 600,
            color: brandColors.primary,
            letterSpacing: '-0.5px',
            margin: 0,
          }}
        >
          21 Days to Lead Your Marriage
        </h2>

        <div
          style={{
            width: 100,
            height: 4,
            background: `linear-gradient(90deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
            margin: '30px auto 0 auto',
            borderRadius: 2,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};