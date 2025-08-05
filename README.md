# Remotion Video Service

A dedicated microservice for generating sprint lesson videos using Remotion and your brand guidelines.

## 🚀 Quick Start

### 1. Environment Setup

```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

Required environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

### 2. Installation

```bash
npm install
```

### 3. Development

```bash
npm run dev
```

Server runs on `http://localhost:3001`

### 4. Production

```bash
npm start
```

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Generate Single Video
```
POST /generate-video

Body:
{
  "sprintId": "sprint_123",
  "dayNumber": 1,
  "videoScript": {
    "title": "Day 1: Setting Your Compass",
    "subtitle": "Day 1",
    "segments": [...],
    "totalDuration": 330,
    "audioFile": "https://supabase-url/audio.mp3"
  },
  "brandColors": {
    "primary": "#22DFDC",
    "secondary": "#22EDB6", 
    "accent": "#242424"
  }
}
```

### Generate Multiple Videos
```
POST /generate-videos-bulk

Body:
{
  "sprintId": "sprint_123",
  "lessons": [
    {
      "day": 1,
      "videoScript": {...}
    },
    {
      "day": 2, 
      "videoScript": {...}
    }
  ],
  "brandColors": {...}
}
```

### Check Video Status
```
GET /video-status/:sprintId/:dayNumber
```

## 🎨 Video Design

The service creates videos with your exact brand guidelines:

- **Colors**: Cyan (#22DFDC), Jade (#22EDB6), Dark Grey (#242424)
- **Animations**: Lava lamp animated gradients
- **Typography**: Large, readable sans-serif fonts
- **Style**: Professional course creator quality

## 🏗️ Architecture

```
src/
├── server.js              # Express server & API routes
├── video-generator.js     # Main video generation logic
├── supabase-client.js     # Supabase integration
└── remotion/
    ├── index.js           # Remotion root component
    ├── SprintVideo.js     # Main video composition
    └── segments/          # Individual segment components
        ├── OpeningSegment.js
        ├── IntroductionSegment.js
        ├── ProblemSetupSegment.js
        ├── MetaphorSegment.js
        ├── ReflectionSegment.js
        ├── VisionBuildingSegment.js
        ├── ActionItemsSegment.js
        └── AffirmationSegment.js
```

## 🚢 Deployment on Render

1. **Create new Web Service on Render**
2. **Connect your GitHub repo**
3. **Build command**: `npm install`
4. **Start command**: `npm start`
5. **Add environment variables** in Render dashboard
6. **Deploy!**

## 📝 Video Generation Process

1. **Receive request** with script and audio URL
2. **Download audio** from Supabase storage
3. **Bundle Remotion** composition with segments
4. **Render video** with brand styling and animations
5. **Upload MP4** to Supabase storage
6. **Return public URL**

## 🔧 Configuration

### Video Settings
- **Resolution**: 1920x1080 (Full HD)
- **Frame Rate**: 30fps
- **Codec**: H.264
- **Quality**: High (CRF 18)

### Performance
- **Concurrency**: 2 (configurable)
- **Timeout**: 15 minutes per video
- **Memory**: Optimized for cloud deployment

## 🎬 Segment Types

Each segment type has its own visual design:

- **Opening**: Dark animated background, brand logo, main title
- **Introduction**: Light background, day indicator, clean typography
- **Problem Setup**: Dark animated background, highlighted question
- **Metaphor**: Light background, three-column layout
- **Reflection**: Dark animated background, two-column insights
- **Vision Building**: Light background, bullet point lists
- **Action Items**: Light background, four-step action plan
- **Affirmation**: Light background, bordered affirmation text

## 🔗 Integration

Update your main app's Edge Function to call this service:

```typescript
// In your Supabase Edge Function
const response = await fetch('https://your-render-service.com/generate-video', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ sprintId, dayNumber, videoScript, brandColors })
});

const result = await response.json();
return result.videoUrl;
```

## 📊 Monitoring

- **Health checks** at `/health`
- **Detailed logging** of all operations
- **Error handling** with proper HTTP status codes
- **Progress tracking** for long-running renders

## 🐛 Troubleshooting

### Common Issues

1. **Video generation timeout**: Increase server timeout or reduce video complexity
2. **Audio download fails**: Check audio URL accessibility
3. **Upload to Supabase fails**: Verify storage bucket exists and permissions are correct
4. **Out of memory**: Reduce concurrency or upgrade server resources

### Logs

Check server logs for detailed error information:
```bash
# On Render, view logs in the dashboard
# Locally:
npm run dev
```