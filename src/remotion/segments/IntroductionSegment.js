import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const IntroductionSegment = ({ content, segment, brandColors }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation timings
  const dayOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const contentOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, white 0%, rgba(34, 223, 220, 0.05) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        {/* Day indicator */}
        <div style={{ opacity: dayOpacity, marginBottom: 50 }}>
          <div
            style={{
              display: 'inline-block',
              background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
              padding: '12px 30px',
              borderRadius: 25,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: '0.5px',
              }}
            >
              DAY 01
            </span>
          </div>
        </div>

        {/* Main title */}
        <div
          style={{
            opacity: titleOpacity,
            marginBottom: 40,
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: brandColors.accent,
              letterSpacing: '-2px',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Setting Your Compass
          </h1>
        </div>

        {/* Content */}
        <div style={{ opacity: contentOpacity }}>
          <div
            style={{
              background: 'white',
              borderRadius: 20,
              padding: 50,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
              border: `2px solid ${brandColors.primary}`,
            }}
          >
            <p
              style={{
                fontSize: 38,
                lineHeight: 1.4,
                color: brandColors.accent,
                fontWeight: 600,
                letterSpacing: '-0.5px',
                margin: 0,
              }}
            >
              Leadership in marriage isn't accidental—it's{' '}
              <span style={{ color: brandColors.primary }}>intentional</span>
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};