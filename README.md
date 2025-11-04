# Flores Premium - Coming Soon Preview

A stunning coming soon page for Flores Premium Rakija featuring animated particles, countdown timer, and email subscription with Google Sheets integration.

## 🌟 Features

- **Animated Background**: Beautiful smoke particles and golden sparks effects
- **Countdown Timer**: Real-time countdown to launch date
- **Email Subscription**: Integrated with Google Sheets for collecting emails
- **Multi-language Support**: Serbian (SR) and English (EN)
- **Spam Protection**: 
  - Email validation
  - Rate limiting (max 3 submissions per minute)
  - Honeypot field for bot detection
- **Responsive Design**: Optimized for all devices
- **Success/Error Messages**: Clear user feedback

## 🚀 Live Preview

Visit the live preview at: `http://localhost:5501` (when running locally)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/flores-coming-soon-preview.git
cd flores-coming-soon-preview
```

2. Start a local server:
```bash
python -m http.server 5501
```

3. Open your browser and navigate to:
```
http://localhost:5501
```

## 🔧 Configuration

### Google Sheets Setup

1. Create a Google Sheet
2. Go to Extensions > Apps Script
3. Copy the code from `google-sheets-script.js` (if available in parent project)
4. Deploy as Web App
5. Update the `GOOGLE_SHEET_URL` in `script.js` with your deployment URL

### Countdown Timer

Edit the launch date in `script.js`:
```javascript
const launchDate = new Date(2025, 11, 31, 23, 59, 59).getTime();
```

## 🎨 Customization

- **Colors**: Edit CSS variables in `style.css`
- **Particles**: Adjust particle settings in `particles.js`
- **Translations**: Modify text in `script.js` translations object

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── style.css           # Styles and animations
├── script.js           # Logic, countdown, form handling
├── particles.js        # Particle effects (smoke + sparks)
├── bottle.png          # Product image
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🛡️ Security Features

- Client-side email validation
- Rate limiting using localStorage
- Honeypot field for spam prevention
- Form submission throttling

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

© 2025 Flores Premium. All rights reserved.

## 🤝 Contributing

This is a private preview page. For inquiries, please contact the development team.

---

Built with ❤️ for Flores Premium Rakija
