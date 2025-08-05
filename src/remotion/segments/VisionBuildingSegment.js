import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const VisionBuildingSegment = ({ content, brandColors }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation timings
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const point1Opacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const point2Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const point3Opacity = interpolate(frame, [90, 120], [0, 1], {
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
        {/* Title */}
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
              color: brandColors.accent,
              letterSpacing: '-1px',
              margin: 0,
            }}
          >
            Your Vision
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

        {/* Vision points */}
        <div style={{ textAlign: 'left', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ opacity: point1Opacity, marginBottom: 40 }}>
            <div
              style={{
                background: 'white',
                borderRadius: 15,
                padding: 30,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                border: `2px solid ${brandColors.primary}20`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: brandColors.primary,
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    fontSize: 28,
                    lineHeight: 1.4,
                    color: brandColors.accent,
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  Maybe you're steady and grounded, able to hold her emotions without losing yours
                </p>
              </div>
            </div>
          </div>

          <div style={{ opacity: point2Opacity, marginBottom: 40 }}>
            <div
              style={{
                background: 'white',
                borderRadius: 15,
                padding: 30,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                border: `2px solid ${brandColors.secondary}20`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: brandColors.secondary,
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    fontSize: 28,
                    lineHeight: 1.4,
                    color: brandColors.accent,
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  You initiate deeper conversations and create space for real connection
                </p>
              </div>
            </div>
          </div>

          <div style={{ opacity: point3Opacity }}>
            <div
              style={{
                background: 'white',
                borderRadius: 15,
                padding: 30,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                border: `2px solid ${brandColors.primary}20`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: brandColors.primary,
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    fontSize: 28,
                    lineHeight: 1.4,
                    color: brandColors.accent,
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  You lead with clarity about where your marriage is going
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};