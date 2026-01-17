# Artrix × Vero Media | Strategic Alliance Presentation

A high-impact, cinematic presentation deck for the Artrix × Vero Media strategic partnership proposal.

## 🚀 Quick Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repository
4. Vercel auto-detects Vite — just click **Deploy**

Or use Vercel CLI:
```bash
npx vercel
```

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
artrix-vero-slides/
├── index.html          # Main presentation
├── src/
│   ├── styles/
│   │   └── main.css    # Custom styles & animations
│   └── scripts/
│       └── main.js     # Slide navigation logic
├── vite.config.js      # Vite build configuration
├── vercel.json         # Vercel deployment config
├── postcss.config.js   # PostCSS with autoprefixer
└── package.json        # Dependencies & scripts
```

## ⌨️ Navigation Controls

| Key | Action |
|-----|--------|
| `→` / `Space` / `Enter` | Next slide |
| `←` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `1-9` | Jump to slide |
| Swipe Left/Right | Touch navigation |

## 🎨 Features

- **13 immersive slides** with cinema-grade transitions
- **Glass morphism UI** with backdrop blur effects
- **Smooth parallax** pan animations on backgrounds
- **Progress bar** showing presentation progress
- **Touch support** with swipe gestures
- **Keyboard shortcuts** for quick navigation
- **Lazy loading** images for performance
- **CSS-only animations** (no heavy JS libraries)

## 🖼 Image Sources

All images sourced from Unsplash with optimized parameters:
- `w=2000` for full-screen backgrounds
- `w=1200` for medium content
- `w=800` for thumbnails
- `q=80` for quality/size balance

## 🎨 Customization

### Colors
Edit the Tailwind config in `index.html`:
```javascript
colors: {
    'artrix-red': '#ea580c',   // Primary accent
    'artrix-dark': '#050505',  // Background
}
```

### Adding Slides
1. Copy an existing `<div class="slide" data-index="N">` block
2. Update `data-index` to the next number
3. Update `totalSlides` in `src/scripts/main.js`

### Animations
Edit `src/styles/main.css` for:
- Transition timing
- Reveal delays
- Float/pan animations

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

Private - Vero Media × Artrix
