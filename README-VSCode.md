# Skill Analyzer - VS Code Setup & Running Guide

## 🚀 Quick Start with VS Code

### Method 1: Using VS Code Terminal (Recommended)

1. **Open VS Code**
   - Open the Skill Analyzer folder in VS Code
   - Open terminal: `Ctrl + \`` (backtick) or `View → Terminal`

2. **Install Dependencies** (if not already done)
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm run start
   ```
   - This will start the server on `http://localhost:8000`
   - OR use: `npm run dev` for live reload

### Method 2: Using VS Code Tasks

1. **Open Command Palette**: `Ctrl + Shift + P`

2. **Type and Select**: `Tasks: Run Task`

3. **Choose One**:
   - `Start Skill Analyzer` - Basic server
   - `Start Development Server` - With live reload

### Method 3: Using VS Code Debug/Run

1. **Go to Run and Debug Panel**: `Ctrl + Shift + D`

2. **Select Configuration**:
   - `Launch Skill Analyzer` (Port 8000)
   - `Launch with Live Server` (Port 8080)

3. **Click Play Button** (▶️) or press `F5`

## 📁 Project Structure

```
Skill/
├── frontend/           # Main application
│   ├── index.html     # Home page
│   ├── analyzer.html  # Skill assessment
│   ├── progress.html  # Progress tracking
│   ├── about.html     # About page
│   ├── css/          # Stylesheets
│   └── js/           # JavaScript files
├── .vscode/          # VS Code configuration
│   ├── launch.json    # Debug configurations
│   └── tasks.json    # Task configurations
└── package.json      # Node.js configuration
```

## 🎯 Available Pages

- **Home**: `http://localhost:8000/index.html`
- **Analyzer**: `http://localhost:8000/analyzer.html`
- **Progress**: `http://localhost:8000/progress.html`
- **About**: `http://localhost:8000/about.html`

## 🔧 Development Features

### Live Reload
- Use `npm run dev` for automatic page refresh on file changes
- VS Code will automatically reload when you save files

### Debugging
- Set breakpoints in JavaScript files
- Use VS Code debugger to step through code
- Console output appears in VS Code terminal

### Git Integration
- Git repository already initialized
- Use VS Code Source Control panel (Ctrl+Shift+G)
- Commit changes directly from VS Code

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8000
npx kill-port 8000

# Or use different port
npm run start -- -p 3000
```

### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules
npm cache clean --force
npm install
```

### Browser Not Opening
- Manually navigate to `http://localhost:8000`
- Check terminal for any error messages
- Ensure no firewall blocking the port

## 🎨 Customization

### VS Code Settings
Create `.vscode/settings.json` for custom preferences:
```json
{
    "liveServer.settings.port": 8000,
    "liveServer.settings.root": "/frontend"
}
```

### Environment Variables
Create `.env` file for configuration:
```
PORT=8000
HOST=localhost
```

## 📱 Mobile Testing
- Use browser dev tools (F12) → Device mode
- Test responsive design on different screen sizes
- Check touch interactions on mobile devices

## 🚀 Production Deployment
For production deployment, consider:
- Building optimized assets
- Setting up a proper web server
- Configuring HTTPS
- Setting up CI/CD pipeline

---

**Happy Coding! 🎉**
