# Claude Code Instructions

## Project Overview
This is the Hey Boot website - a personal application site with password protection via the staticguard npm package.

## Important Context
- **Framework**: Vite + Tailwind CSS 4.0
- **Pages**: index.html, video.html, contact.html
- **Password Protection**: Uses staticguard package (separate repo)
- **Build Output**: `/docs` for GitHub Pages
- **Assets**: `/public` directory

## Key Files
- `src/*.html` - Main pages
- `src/styles.css` - Global styles with Tailwind imports
- `src/script.js` - Mobile menu functionality
- `src/videos.js` - Vimeo player integration
- `vite.config.js` - Build configuration
- `public/gaurdian-sm2.png` - Guard image for password screen

## StaticGuard Integration
The site uses the `staticguard` npm package for client-side password protection.

**Configuration**:
- Password: `intro` (hashed)
- Guard image: Dwarf guardian (`/gaurdian-sm2.png`)
- Theme: Brown/earth tones matching site design
- Session: sessionStorage (clears on tab close)

See `/docs/IMPLEMENTATION_PLAN.md` for full staticguard documentation.

## Guidelines
- Keep design consistent (brown palette, DM Sans font)
- Maintain responsive layout (mobile-first)
- Don't modify staticguard package from this repo
- Build outputs to `/docs` for GitHub Pages deployment
