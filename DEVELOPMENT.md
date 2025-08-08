# Development Server Setup

## Quick Start

### Option 1: Using Python (Recommended)
```bash
# Navigate to project directory
cd "c:\Users\anura\OneDrive\Documents\GitHub\NCC-RECRUITMENT3"

# Start a simple HTTP server
python -m http.server 8000
```
Then open http://localhost:8000 in your browser.

### Option 2: Using Node.js
```bash
# Install a simple server globally
npm install -g http-server

# Navigate to project directory
cd "c:\Users\anura\OneDrive\Documents\GitHub\NCC-RECRUITMENT3"

# Start the server
http-server -p 8000
```

### Option 3: Using PowerShell (Windows 10+)
```powershell
# Navigate to project directory
cd "c:\Users\anura\OneDrive\Documents\GitHub\NCC-RECRUITMENT3"

# Start IIS Express (if available)
iisexpress /path:"$PWD" /port:8000
```

### Option 4: Using VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Open the project folder in VS Code
3. Right-click on `index.html` and select "Open with Live Server"

## Testing Checklist

- [ ] Countdown timer is working correctly
- [ ] Typewriter animation cycles through quotes
- [ ] Image gallery navigation works (prev/next buttons)
- [ ] Gallery auto-advances every 5 seconds
- [ ] "Why Join NCC?" page navigation works
- [ ] Scroll animations trigger when scrolling down
- [ ] QR code generates correctly (after updating config.json)
- [ ] Responsive design works on mobile/tablet
- [ ] All images load properly

## Configuration

1. Update `config.json` with your actual Google Form URL
2. Modify event details in `config.json` as needed
3. Test on multiple devices and browsers
