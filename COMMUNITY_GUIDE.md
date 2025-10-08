# Guide for Plex Development Community

Welcome to the PlexAddons version checker! This is an **unofficial community project** created by bali0531 (Plex Development moderator) to help all Plex Development addon creators provide automatic update checking.

## 📋 Types of Addons

### 💰 Paid Addons (`external: false`)
Community-made addons that have been **accepted to sell on PlexStore** (plexdevelopment.net). These are premium addons created by community members.

### 🎁 Free Addons (`external: true`)
Free addons made by Plex Development community members. Anyone can add their free addon to this registry!

## 🎯 Quick Overview

The PlexAddons version checker allows users of your Plex Development Discord bot addon to automatically check for updates. Whether you have an official PlexStore addon or a free community addon, you can add it to this registry!

When you add your addon to this registry, users will see:

```
   [UPDATE] Version Check: Outdated (v1.0.0 → v1.2.0)

📦 PlexAddons Update Available for YourAddon
   Current: v1.0.0
   Latest:  v1.2.0 (2025-10-08)
   Author:  YourName
   Changes: Bug fixes and new features
   Download: https://plexdevelopment.net/downloads/your-addon
```

## ✅ Adding Your Addon (2 Steps)

### Step 1: Request to Add Your Addon

**For Paid Addons (Sold on PlexStore):**
- Contact bali0531 via Discord (https://discord.com/users/1141211789552537691)
- Provide your addon details (name, version, download URL)
- Your addon will be added with `external: false`

**For Free Addons:**
- Submit a Pull Request (see below)
- Your addon will be added with `external: true`

#### Submitting a Pull Request (Free Addons):
1. Fork this repository
2. Edit `versions.json`
3. Add your addon entry (see template below)
4. Update the `lastUpdated` timestamp
5. Submit PR with title: "Add [YourAddon] to registry (free)"

### Step 2: Add VersionChecker to Your Addon

1. **Copy the file:**
   ```bash
   # Copy VersionChecker.js to your addon folder
   curl -O https://raw.githubusercontent.com/Bali0531-RC/PlexAddons/main/VersionChecker.js
   ```

2. **Add to your main file:**
   ```javascript
   const VersionChecker = require('./VersionChecker');
   
   // At the top of your ready event or initialization
   const versionChecker = new VersionChecker('YourAddonName', '1.0.0');
   
   versionChecker.checkForUpdates().then(result => {
       console.log(versionChecker.formatVersionMessage(result));
       if (result.isOutdated) {
           console.log(versionChecker.getUpdateDetails(result));
       }
   });
   ```

3. **Install dependency:**
   ```bash
   npm install node-fetch
   ```

That's it! ✨

## 📝 Addon Entry Template

### For Paid Addons - Sold on PlexStore (`external: false`):

```json
{
    "YourAddonName": {
        "version": "1.0.0",
        "releaseDate": "2025-10-08",
        "downloadUrl": "https://plexdevelopment.net/downloads/your-addon",
        "breaking": false,
        "urgent": false,
        "description": "Initial release - describe what's new",
        "external": false,
        "author": "YourName",
        "homepage": "https://plexdevelopment.net"
    }
}
```

### For Free Addons (`external: true`):

```json
{
    "YourAddonName": {
        "version": "1.0.0",
        "releaseDate": "2025-10-08",
        "downloadUrl": "https://github.com/yourusername/your-addon/releases",
        "breaking": false,
        "urgent": false,
        "description": "Initial release - describe what's new",
        "external": true,
        "author": "Your Discord Username",
        "homepage": "https://github.com/yourusername/your-addon"
    }
}
```

### Field Descriptions:

- **version**: Your current version (use semantic versioning: `MAJOR.MINOR.PATCH`)
- **releaseDate**: Release date in `YYYY-MM-DD` format
- **downloadUrl**: 
  - Paid: `https://plexdevelopment.net/downloads/your-addon`
  - Free: GitHub releases, your website, etc.
- **breaking**: `true` if this version has breaking changes (users need to update config/code)
- **urgent**: `true` if users should update immediately (security fixes, critical bugs)
- **description**: Brief description of what changed in this version
- **external**: 
  - `false` = Paid addon (sold on PlexStore)
  - `true` = Free addon
- **author**: Your name or Discord username
- **homepage**: 
  - Paid: `https://plexdevelopment.net`
  - Free: Your GitHub repo, website, etc.

## 🔄 Updating Your Addon Version

When you release a new version:

1. **Edit `versions.json`:**
   ```json
   {
       "YourAddonName": {
           "version": "1.1.0",         // ← Update this
           "releaseDate": "2025-10-15", // ← Update this
           "description": "Added X feature, fixed Y bug", // ← Update this
           "breaking": false,           // ← Update if needed
           "urgent": false              // ← Update if needed
           // ... rest stays the same
       }
   }
   ```

2. **Update the main `lastUpdated` field** at the bottom of `versions.json`:
   ```json
   {
       "lastUpdated": "2025-10-15T12:00:00Z"
   }
   ```

3. **Submit a PR** with title: "Update [YourAddon] to v1.1.0"

## 🔢 Version Numbering Guide

Follow semantic versioning: `MAJOR.MINOR.PATCH`

### MAJOR version (1.0.0 → 2.0.0)
- Breaking changes (users must update their config/code)
- Set `"breaking": true`
- Example: Changed command structure, removed features, changed API

### MINOR version (1.0.0 → 1.1.0)
- New features, backwards compatible
- Set `"breaking": false`
- Example: Added new commands, new options

### PATCH version (1.0.0 → 1.0.1)
- Bug fixes only
- Set `"breaking": false`
- Example: Fixed crashes, corrected typos

### When to use `"urgent": true`
- Security vulnerabilities
- Data loss bugs
- Critical crashes affecting all users
- Discord API breaking changes

## 💡 Example: Complete Implementation

Here's a real example for a Discord bot addon:

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const VersionChecker = require('./VersionChecker');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds] 
});

// Your addon version
const ADDON_VERSION = '1.2.0';

client.once('ready', async () => {
    console.log(`✅ ${client.user.tag} is ready!`);
    
    // Check for updates
    const versionChecker = new VersionChecker('YourAddonName', ADDON_VERSION);
    const result = await versionChecker.checkForUpdates();
    
    console.log(versionChecker.formatVersionMessage(result));
    
    if (result.isOutdated) {
        console.log(versionChecker.getUpdateDetails(result));
        
        if (result.urgent) {
            console.error('\n⚠️  CRITICAL UPDATE AVAILABLE - Please update ASAP!\n');
        }
    }
});

client.login(process.env.TOKEN);
```

## 🎨 What Users Will See

### Up to date:
```
   [OK] Version Check: Up to date (v1.2.0)
```

### Update available:
```
   [UPDATE] Version Check: Outdated (v1.0.0 → v1.2.0)

📦 PlexAddons Update Available for YourAddon
   Current: v1.0.0
   Latest:  v1.2.0 (2025-10-08)
   Author:  YourName
   Changes: Added X feature, fixed Y bug
   Download: https://plexdevelopment.net/downloads/your-addon
   Homepage: https://plexdevelopment.net
   Repository: https://github.com/Bali0531-RC/PlexAddons
   Support: https://discord.gg/RFsfZmnaZV
```

### Urgent update:
```
   [UPDATE] Version Check: Outdated (v1.0.0 → v1.2.1) [URGENT]

📦 PlexAddons Update Available for YourAddon
   Current: v1.0.0
   Latest:  v1.2.1 (2025-10-08)
   Changes: Critical security fix
   ⚠️  URGENT UPDATE RECOMMENDED
   Download: https://plexdevelopment.net/downloads/your-addon
```

### Breaking changes:
```
   [UPDATE] Version Check: Outdated (v1.5.0 → v2.0.0) [BREAKING]

📦 PlexAddons Update Available for YourAddon
   Current: v1.5.0
   Latest:  v2.0.0 (2025-10-08)
   Changes: Complete rewrite with new config structure
   🔄 BREAKING CHANGES - Review before updating
   Download: https://plexdevelopment.net/downloads/your-addon
```

## ✅ Backward Compatibility

**Important:** Old addons will continue to work! The new fields are optional, so:
- Existing VersionChecker files work with the new `versions.json`
- New VersionChecker files work with old implementations
- No need to update existing code unless you want to

## 📋 Checklist for Adding Your Addon

- [ ] Decide on your addon name (should match your product)
- [ ] Get your download URL from plexdevelopment.net
- [ ] Prepare addon information (version, description)
- [ ] Fork the repository OR contact bali0531
- [ ] Add your entry to `versions.json`
- [ ] Update the `lastUpdated` timestamp
- [ ] Submit PR OR send details to bali0531
- [ ] Copy `VersionChecker.js` to your addon
- [ ] Install `node-fetch` dependency
- [ ] Add version check code to your addon
- [ ] Test it works!

## 🤝 Getting Help

- **Contact bali0531:** Via Discord or GitHub
- **GitHub Issues:** https://github.com/Bali0531-RC/PlexAddons/issues
- **Examples:** Check the `examples/` folder in this repo

## 📚 Additional Resources

- **Full Documentation:** See [README.md](README.md)
- **Contribution Guide:** See [CONTRIBUTING.md](CONTRIBUTING.md)
- **Quick Start:** See [QUICKSTART.md](QUICKSTART.md)
- **Code Examples:** Check `examples/` folder

---

**Questions?** Contact bali0531 on Discord! 💬

**For Paid Addons (PlexStore):** Contact bali0531 directly (https://discord.com/users/1141211789552537691)  
**For Free Addons:** Submit a PR or contact bali0531

---

**Note:** This is an **unofficial community project** by bali0531, not an official Plex Development product.

Made with ❤️ for the Plex Development community