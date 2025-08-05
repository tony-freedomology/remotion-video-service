import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const MetaphorSegment = ({ content, brandColors }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation timings
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const item1Opacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const item2Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const item3Opacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, white 0%, #F0FFFF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          paddingLeft: 60,
          paddingRight: 60,
          width: '100%',
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            textAlign: 'center',
            marginBottom: 80,
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
            The Captain's Choice
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

        {/* Three key actions */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 50,
          }}
        >
          {/* Study the map */}
          <div style={{ opacity: item1Opacity, textAlign: 'center' }}>
            <div
              style={{
                background: 'white',
                borderRadius: 20,
                padding: 40,
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
                border: '2px solid #E0F7FA',
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 20,
                  color: brandColors.primary,
                }}
              >
                🗺️
              </div>
              <h3
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: brandColors.accent,
                  letterSpacing: '-0.5px',
                  margin: 0,
                }}
              >
                Study the Map
              </h3>
            </div>
          </div>

          {/* Set destination */}
          <div style={{ opacity: item2Opacity, textAlign: 'center' }}>
            <div
              style={{
                background: 'white',
                borderRadius: 20,
                padding: 40,
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
                border: '2px solid #E0F7FA',
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 20,
                  color: brandColors.secondary,
                }}
              >
                🎯
              </div>
              <h3
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: brandColors.accent,
                  letterSpacing: '-0.5px',
                  margin: 0,
                }}
              >
                Set Destination
              </h3>
            </div>
          </div>

          {/* Stay on course */}
          <div style={{ opacity: item3Opacity, textAlign: 'center' }}>
            <div
              style={{
                background: 'white',
                borderRadius: 20,
                padding: 40,
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
                border: '2px solid #E0F7FA',
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 20,
                  color: brandColors.primary,
                }}
              >
                ⚓
              </div>
              <h3
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: brandColors.accent,
                  letterSpacing: '-0.5px',
                  margin: 0,
                }}
              >
                Stay on Course
              </h3>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};