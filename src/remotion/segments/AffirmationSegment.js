import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const AffirmationSegment = ({ content, brandColors }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation timings
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const affirmationOpacity = interpolate(frame, [30, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const nextOpacity = interpolate(frame, [75, 105], [0, 1], {
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
          maxWidth: 900,
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
              color: brandColors.accent,
              letterSpacing: '-1px',
              margin: 0,
            }}
          >
            Your Daily Affirmation
          </h2>
          <div
            style={{
              width: 100,
              height: 4,
              background: `linear-gradient(90deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
              margin: '20px auto 0 auto',
              borderRadius: 2,
            }}
          />
        </div>

        {/* Main affirmation */}
        <div
          style={{
            opacity: affirmationOpacity,
            marginBottom: 60,
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: 20,
              padding: 50,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
              border: `3px solid ${brandColors.primary}`,
            }}
          >
            <p
              style={{
                fontSize: 42,
                lineHeight: 1.3,
                color: brandColors.accent,
                fontWeight: 700,
                letterSpacing: '-0.5px',
                margin: 0,
              }}
            >
              "I set my intention as the leader of my marriage. I choose{' '}
              <span style={{ color: brandColors.primary }}>clarity</span>,{' '}
              <span style={{ color: brandColors.secondary }}>confidence</span>, and{' '}
              <span style={{ color: brandColors.primary }}>vision</span>—starting today."
            </p>
          </div>
        </div>

        {/* Next steps */}
        <div style={{ opacity: nextOpacity }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
              borderRadius: 15,
              padding: 30,
              color: 'white',
            }}
          >
            <h3
              style={{
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: '-0.5px',
                marginBottom: 10,
                margin: '0 0 10px 0',
              }}
            >
              Tomorrow: Building Your Masculine Frame
            </h3>
            <p
              style={{
                fontSize: 22,
                fontWeight: 500,
                opacity: 0.9,
                margin: 0,
              }}
            >
              Day 1 Complete • 20 Days Remaining
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};