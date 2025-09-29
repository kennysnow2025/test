# FastAPI Frontend Demo

A modern TypeScript frontend that demonstrates interaction with the FastAPI backend.

## Features

- 🎨 **Modern UI Design** - Clean, responsive interface with CSS Grid and Flexbox
- 📱 **Mobile Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🔄 **Real-time API Integration** - Full CRUD operations with the FastAPI backend
- 🎯 **Type Safety** - Written in TypeScript with comprehensive type definitions
- 🚀 **Fast Development** - Hot reload during development
- 📊 **API Health Monitoring** - Real-time connection status indicator
- 🎭 **Interactive UI** - Modals, toast notifications, and smooth animations
- 🔍 **Filtering & Search** - Filter items by category
- ✨ **Modern UX** - Loading states, error handling, and user feedback

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Vanilla JS** - No framework dependencies for maximum performance
- **CSS Grid & Flexbox** - Modern responsive layouts
- **Font Awesome** - Beautiful icons
- **ES Modules** - Modern JavaScript module system

## Project Structure

```
frontend/
├── src/
│   ├── index.html      # Main HTML template
│   ├── styles.css      # Modern CSS styling
│   ├── main.ts         # Main application logic
│   ├── api.ts          # API client and utilities
│   ├── ui.ts           # UI helper functions
│   └── types.ts        # TypeScript type definitions
├── dist/               # Built files (generated)
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md          # This file
```

## Quick Start

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Start the development server:**
   ```bash
   npm run serve
   ```

4. **For development with auto-rebuild:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:8080`

## Prerequisites

- **FastAPI Backend**: Make sure the FastAPI server is running on `http://localhost:8000`
- **Node.js**: For TypeScript compilation and development server
- **Python**: For the simple HTTP server (included with Python)

## API Integration

The frontend communicates with the FastAPI backend through a comprehensive API client:

- **Health Check**: Monitor API connectivity
- **CRUD Operations**: Create, Read, Update, Delete items
- **Filtering**: Get items by category
- **Error Handling**: Graceful error handling with user feedback
- **Type Safety**: All API responses are typed

## Features Overview

### Item Management
- ➕ **Add Items**: Create new items with validation
- 📝 **Edit Items**: Update existing items via modal
- 🗑️ **Delete Items**: Remove items with confirmation
- 👀 **View Items**: Browse all items with rich details

### User Experience
- 🎨 **Modern Design**: Clean, professional interface
- 📱 **Responsive**: Works on all screen sizes
- ⚡ **Fast**: Optimized for performance
- 🔔 **Notifications**: Toast messages for user feedback
- 🔍 **Filtering**: Filter items by category
- 📊 **Status Indicators**: API health monitoring

### Data Validation
- ✅ **Client-side Validation**: Form validation before API calls
- 🛡️ **XSS Protection**: HTML escaping for security
- 🔒 **Type Safety**: TypeScript ensures data integrity

## Development

### Available Scripts

- `npm run build` - Compile TypeScript and copy assets
- `npm run dev` - Development mode with auto-rebuild
- `npm run serve` - Serve built files
- `npm run clean` - Clean build directory

### Customization

The application is highly customizable:

- **Styling**: Modify `src/styles.css` for visual changes
- **API Endpoint**: Update `API_BASE_URL` in `src/api.ts`
- **Features**: Add new functionality in `src/main.ts`
- **Types**: Extend type definitions in `src/types.ts`

## Browser Support

- ✅ Chrome 80+
- ✅ Firefox 72+
- ✅ Safari 13+
- ✅ Edge 80+

## Contributing

1. Make your changes in the `src/` directory
2. Run `npm run build` to compile
3. Test in the browser at `http://localhost:8080`
4. Ensure the FastAPI backend is running for full functionality