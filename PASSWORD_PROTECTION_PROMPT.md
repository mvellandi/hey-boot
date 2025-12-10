# Password Protection Component for Static GitHub Pages Sites

## Goal
Create a reusable, client-side password protection system for static websites hosted on GitHub Pages. This should be a standalone component that can be easily integrated into any static site.

## Requirements

### Functionality
- Client-side password protection (no server required)
- Session-based authentication (stays logged in during browser session)
- Configurable password via simple config
- Blocks content until correct password entered
- Humorous/themed UI (dwarf guard aesthetic)

### Technical Constraints
- Must work on GitHub Pages (static hosting only)
- No server-side processing
- No build step required for end users
- Pure HTML/CSS/JavaScript (vanilla JS preferred)

### UI Design
- Full-page overlay blocking content
- Layout: Visual element on left, form on right (responsive)
- Components:
  - Left side: Customizable image/visual (default: guard/gatekeeper theme)
  - Right side form:
    - Header text (large, bold) - customizable
    - Subheader/flavor text - customizable
    - Password input field
    - Submit button
    - Error message display for wrong passwords
- Mobile responsive (stack vertically on small screens)
- Fully themeable (colors, fonts, spacing)

### Security Notes
- This is **security by obscurity** only
- Prevents casual browsing and search engine indexing
- Does NOT protect against determined users
- Password is hashed but still client-side
- Use with robots.txt and noindex meta tags

## Package Structure
```
password-guard/
├── README.md              # Installation and usage instructions
├── guard.js               # Main password protection logic
├── guard.css              # Styling for the protection screen
├── config.js.example      # Example configuration file
└── assets/
    ├── default-guard.png  # Default guard/gatekeeper image (generic theme)
    └── themes/            # Optional pre-made theme examples
        ├── dwarf/
        ├── robot/
        └── minimal/
```

## Configuration Example
```javascript
// config.js
const PasswordGuard = {
  // SHA-256 hash of the password (not the password itself)
  passwordHash: 'hash_here',

  // Customizable text content
  headerText: "Private Site",
  subheaderText: "Please enter the password to continue",

  // Optional: custom image for left side
  guardImage: './path/to/custom-image.png',
  guardImageAlt: 'Site guardian',

  // Optional: custom styling
  theme: {
    primaryColor: '#8b4513',
    secondaryColor: '#d4a574',
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff'
  },

  // Optional: button text
  submitButtonText: 'Enter',

  // Optional: error messages
  errorMessage: 'Incorrect password. Please try again.'
};
```

## Integration Steps for End Users
1. Download/copy the `password-guard` folder to their project
2. Copy `config.js.example` to `config.js` and set their password hash
3. Add one line to their HTML files:
   ```html
   <script src="./password-guard/guard.js" type="module"></script>
   ```
4. Add robots.txt and meta tags for crawler protection

## To-Do List

### Phase 1: Core Functionality
- [ ] Create guard.js with password validation logic
- [ ] Implement sessionStorage for "remember me" during session
- [ ] Create password hashing utility (SHA-256)
- [ ] Build configuration system

### Phase 2: UI Components
- [ ] Design and code the protection overlay HTML structure
- [ ] Create guard.css with responsive layout (left image, right form)
- [ ] Create or source default guard/gatekeeper image (check licensing)
- [ ] Add smooth fade-in/fade-out transitions
- [ ] Implement error shake animation for wrong password
- [ ] Make all text and images configurable via config

### Phase 3: Polish & Features
- [ ] Add keyboard support (Enter key to submit)
- [ ] Create password hash generator tool/script
- [ ] Add customization options (themes, messages)
- [ ] Implement rate limiting (prevent brute force)
- [ ] Add "forgot password" hint system (optional)

### Phase 4: Documentation
- [ ] Write comprehensive README.md
- [ ] Create installation guide
- [ ] Document configuration options
- [ ] Add FAQ section
- [ ] Provide example implementations

### Phase 5: Testing & Distribution
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Create demo site
- [ ] Package for npm (optional)
- [ ] Create GitHub repository

## Additional Features (Nice to Have)
- [ ] Multiple password support
- [ ] Custom redirect on wrong password
- [ ] Attempt counter with lockout
- [ ] Password strength indicator
- [ ] Dark/light theme toggle
- [ ] Internationalization support
- [ ] Pre-built theme packages (dwarf, robot, minimal, corporate, etc.)
- [ ] Theme gallery/showcase site

## Security Considerations
1. Use SHA-256 hashing for password comparison
2. Never store plain text passwords in code
3. Add salt to hash (configurable)
4. Implement rate limiting on attempts
5. Clear console in production to hide implementation details
6. Obfuscate code (optional, for added obscurity)

## Example Use Cases
- Personal portfolio sites
- Private family photo galleries
- Beta/preview sites for clients
- Internal documentation sites
- Job application sites
- Private blogs or journals
- Client preview/staging sites
- Password-protected landing pages

## Design Philosophy
- **Generic by default** - Works for any use case out of the box
- **Highly customizable** - Every visual element can be themed
- **Minimal dependencies** - Pure vanilla JS, no frameworks
- **Accessible** - Keyboard navigation, ARIA labels, screen reader friendly
- **Performant** - Small footprint, fast load time
- **User-friendly** - Clear error messages, smooth animations

## Success Criteria
- Can be integrated in < 5 minutes
- Works without any build tools
- Mobile responsive
- Blocks view source / direct URL access
- Session persists across pages
- Humorous and pleasant UX
