# 2(A)CTR NCC GITAM Recruitment 2025
link:-https://ncc-enrollment.netlify.app/
A professional recruitment website for the 2(A)CTR NCC unit at GITAM University.

## Project Structure

```
NCC-RECRUITMENT3/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── config.json         # Configuration settings
└── README.md           # Project documentation
```

## Features

- **Professional Navigation Bar**: Sticky navigation with Home, About NCC, Join Now, and Contact sections
- **Responsive Design**: Works on desktop, tablet, and mobile devices with mobile hamburger menu
- **Countdown Timer**: Live countdown to the recruitment event
- **Image Gallery**: Slideshow of NCC activities with auto-advance
- **Typewriter Animation**: Rotating inspirational quotes
- **Scroll Animations**: Smooth reveal animations as user scrolls
- **QR Code Integration**: Automatic QR code generation for registration
- **Professional Army Theme**: Military-inspired design with army green colors
- **Multi-page Structure**: Organized content across four main sections

## Setup Instructions

1. **Update Registration Link**: 
   - Open `config.json`
   - Replace `YOUR_FORM_ID_HERE` with your actual Google Form ID
   - The script will automatically generate the QR code

2. **Customize Event Details**:
   - Edit `config.json` to update event date, time, location, etc.

3. **Deploy**:
   - Upload all files to your web server
   - Ensure all files are in the same directory

## File Descriptions

### index.html
The main HTML structure with four main sections:
- **Home**: General introduction, NCC history, countdown timer, and event details
- **About NCC**: Benefits of joining, testimonials, and image gallery
- **Join Now**: Registration form, QR code, and enrollment information
- **Contact**: Contact information and location details

Navigation bar with responsive mobile menu for seamless user experience.

### styles.css
Contains all custom CSS including:
- Army-themed color scheme
- Responsive layouts
- Animations and transitions
- Gallery and typewriter styles

### script.js
JavaScript functionality including:
- Navigation bar functionality with active state management
- Mobile menu toggle
- Countdown timer logic
- Page navigation and transitions
- Image gallery controls
- Scroll animations
- Typewriter effect

### config.json
Configuration file for easy customization of:
- Event details
- Registration URLs
- Gallery images
- Typewriter quotes

## Dependencies

- **Tailwind CSS**: Utility-first CSS framework (loaded via CDN)
- **Google Fonts**: Oswald and Roboto Mono fonts
- **No other external dependencies**

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Graceful degradation for older browsers

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-green: #4B5320;
    --secondary-green: #586028;
    --background-white: #FFFFFF;
    --off-white-text: #F5F5DC;
    --dark-text: #1C1C1C;
}
```

### Content
Update text content directly in `index.html` or through `config.json` for dynamic content.

## Performance Features

- Optimized images via WebP compression service
- Minimal external dependencies
- Efficient animations using CSS transforms
- Lazy loading for better performance

## Accessibility

- Semantic HTML structure
- Alt text for all images
- Keyboard navigation support
- Screen reader friendly

## License

This project is created for educational purposes for GITAM University NCC recruitment.
