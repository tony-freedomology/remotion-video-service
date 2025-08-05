import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const ActionItemsSegment = ({ content, brandColors }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation timings
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const step1Opacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const step2Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const step3Opacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const step4Opacity = interpolate(frame, [120, 150], [0, 1], {
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
            Your Action Steps
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

        {/* Action steps grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          {/* Step 1 */}
          <div style={{ opacity: step1Opacity }}>
            <div
              style={{
                background: 'white',
                borderRadius: 20,
                padding: 30,
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
                border: `3px solid ${brandColors.primary}`,
                textAlign: 'left',
                height: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 15,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: brandColors.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 900,
                    fontSize: 20,
                    marginRight: 15,
                  }}
                >
                  1
                </div>
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: brandColors.accent,
                    margin: 0,
                  }}
                >
                  Find Quiet Time
                </h3>
              </div>
              <p
                style={{
                  fontSize: 18,
                  color: '#666',
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                Carve out 15 minutes with no phone, no distractions
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ opacity: step2Opacity }}>
            <div
              style={{
                background: 'white',
                borderRadius: 20,
                padding: 30,
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
                border: `3px solid ${brandColors.secondary}`,
                textAlign: 'left',
                height: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 15,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: brandColors.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 900,
                    fontSize: 20,
                    marginRight: 15,
                  }}
                >
                  2
                </div>
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: brandColors.accent,
                    margin: 0,
                  }}
                >
                  Reflect Honestly
                </h3>
              </div>
              <p
                style={{
                  fontSize: 18,
                  color: '#666',
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                Notice your patterns without judgment, just clarity
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ opacity: step3Opacity }}>
            <div
              style={{
                background: 'white',
                borderRadius: 20,
                padding: 30,
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
                border: `3px solid ${brandColors.primary}`,
                textAlign: 'left',
                height: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 15,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: brandColors.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 900,
                    fontSize: 20,
                    marginRight: 15,
                  }}
                >
                  3
                </div>
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: brandColors.accent,
                    margin: 0,
                  }}
                >
                  Set Your Vision
                </h3>
              </div>
              <p
                style={{
                  fontSize: 18,
                  color: '#666',
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                Write down your vision for your marriage leadership
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div style={{ opacity: step4Opacity }}>
            <div
              style={{
                background: 'white',
                borderRadius: 20,
                padding: 30,
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
                border: `3px solid ${brandColors.secondary}`,
                textAlign: 'left',
                height: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 15,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: brandColors.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 900,
                    fontSize: 20,
                    marginRight: 15,
                  }}
                >
                  4
                </div>
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: brandColors.accent,
                    margin: 0,
                  }}
                >
                  Take Action
                </h3>
              </div>
              <p
                style={{
                  fontSize: 18,
                  color: '#666',
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                Choose one small step you can take today
              </p>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};