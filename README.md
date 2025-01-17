# Nostr Timeline Plugin for Obsidian

A plugin for Obsidian that creates a visual timeline of your Nostr notes, displaying connections between notes and their replies in an intuitive, chronological format.

## Features

- 📱 Visual timeline display of Nostr notes
- 🔄 Real-time updates as notes change
- 🌳 Branch visualization for note relationships
- 🔍 Preview bubbles for quick content viewing
- 🎨 Smooth animations and transitions
- 👤 Author profile linking
- ⚡ Automatic file monitoring
<img width="750" alt="Screenshot 2025-01-17 at 1 46 59 PM" src="https://github.com/user-attachments/assets/c33dab71-d4a3-4805-825f-95632a4e8cfc" />

## Timeline Visualization

The timeline provides a clear visual representation of your Nostr notes:

- **Center Timeline**: A vertical line showing chronological progression
- **Event Dots**: Marks each note's position in time
- **Branch Lines**: Orange lines connecting related notes
- **Content Cards**: Note previews alternating left and right
- **Root/Reply Labels**: Clear indicators of note relationships
- **Preview Bubbles**: Quick content viewing on hover

## Installation

1. Open Obsidian Settings
2. Go to Community Plugins and disable Safe Mode
3. Click Browse and search for "Nostr Timeline"
4. Install the plugin
5. Enable the plugin in your settings

## Usage

### Opening the Timeline

1. Click the ribbon icon to open the timeline view
2. Or use the command palette and search for "Open Nostr Timeline"

### Note Organization

- Notes should be stored in the `nostr/notes` directory
- Each note should include frontmatter with:
  ```yaml
  ---
  created: 1234567890    # Unix timestamp
  author: username       # Note author
  reply_to: note-id     # Optional, for replies
  ---
Timeline Navigation
Click on notes to open them in the editor
Hover over notes to see content previews
Click author names to view their profiles
Follow branch lines to see note relationships
Scroll vertically to move through time
Visual Elements
Orange Lines: Show connections between notes
Center Dots: Mark each note's timestamp
Branch Labels: Indicate "Root" and "Reply" relationships
Content Cards: Display note previews
Author Links: Quick access to profile pages
Configuration
Settings
Timeline appearance customization
Card width and spacing
Animation speeds
Preview behavior
Display preferences
Show/hide previews
Author link handling
Branch line style
Monitoring options
Auto-refresh settings
File watching behavior
Directory Structure
YourVault/
└── nostr/
    └── notes/           # Main notes directory
        ├── note1.md     # Individual notes
        ├── note2.md
        └── replies/     # Optional replies folder
Development
Prerequisites
Node.js 16+
npm or yarn
Obsidian developer tools
Setup
Clone the repository
git clone https://github.com/yourusername/obsidian-nostr-timeline
cd obsidian-nostr-timeline
Install dependencies
npm install
Build the plugin
npm run build
Copy to your vault's plugins directory
cp -r build/ /path/to/vault/.obsidian/plugins/nostr-timeline/
Development Commands
npm run dev - Start development build with hot reload
npm run build - Create production build
npm run lint - Run linter
npm test - Run tests
Key Files
main.ts - Plugin initialization and setup
TimelineView.ts - Main timeline visualization
types.ts - TypeScript interfaces
styles.css - Timeline styling
SettingsTab.ts - Plugin configuration
Contributing
Fork the repository
Create a feature branch
Make your changes
Submit a pull request
Areas for Contribution
Timeline visualization improvements
Performance optimizations
New features and enhancements
Bug fixes and testing
Documentation improvements
License
MIT License - see LICENSE file for details

Support
GitHub Issues: Report a bug
Discussions: Feature requests
Wiki: Documentation
Credits
Built for the Nostr community
Uses Obsidian Plugin API
Inspired by social timeline interfaces
Changelog
1.0.0
Initial release
Basic timeline visualization
Note relationship handling
Real-time updates
Preview functionality
