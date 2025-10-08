# Contributing to PlexAddons

Thank you for your interest in contributing to PlexAddons! This registry is specifically for **Plex Development Discord bot addons** - both paid addons (sold on PlexStore) and free community addons.

**Note:** All addons are community-made. The difference is whether they're sold on PlexStore or free.

## Table of Contents

- [Contributing to PlexAddons](#contributing-to-plexaddons)
  - [Table of Contents](#table-of-contents)
  - [Ways to Contribute](#ways-to-contribute)
  - [Adding Paid Addons](#adding-official-plexstore-addons)
    - [Quick Process](#quick-process)
    - [Updating Your Addon](#updating-your-addon)
  - [Adding Community/Free Addons](#adding-communityfree-addons)
    - [Prerequisites](#prerequisites)
    - [Step-by-Step Guide](#step-by-step-guide)
  - [Updating Version Information](#updating-version-information)
  - [Version Number Guidelines](#version-number-guidelines)
    - [When to Use `urgent: true`](#when-to-use-urgent-true)
  - [Code Contributions](#code-contributions)
    - [Improving VersionChecker](#improving-versionchecker)
    - [Documentation Improvements](#documentation-improvements)
  - [Reporting Issues](#reporting-issues)
    - [Bug Reports](#bug-reports)
    - [Feature Requests](#feature-requests)
  - [Code of Conduct](#code-of-conduct)
  - [Questions?](#questions)
  - [License](#license)

## Ways to Contribute

1. **Paid addon developers:** Add your PlexStore addons to the registry
2. **Free addon developers:** Add your free Plex Development addons with `external: true`
3. **Update version information** for your existing addon
4. **Improve documentation** or examples
5. **Report bugs** or suggest features
6. **Submit code improvements** to VersionChecker

## Adding Paid Addons (PlexStore)

If your community-made addon has been accepted to sell on PlexStore:

### Quick Process

1. **Contact bali0531** via Discord (https://discord.com/users/1141211789552537691)
2. **Provide addon information**:
   - Addon name
   - Current version
   - Download URL (usually https://plexdevelopment.net/downloads/your-addon)
   - Brief description

3. **Your addon will be added** with these settings:
   ```json
   {
       "YourAddon": {
           "version": "1.0.0",
           "releaseDate": "2025-10-08",
           "downloadUrl": "https://plexdevelopment.net/downloads/your-addon",
           "breaking": false,
           "urgent": false,
           "description": "Your description",
           "external": false,
           "author": "Your name",
           "homepage": "https://plexdevelopment.net"
       }
   }
   ```

4. **Use in your addon**:
   ```javascript
   const VersionChecker = require('./VersionChecker');
   const checker = new VersionChecker('YourAddon', '1.0.0');
   ```

### Updating Your Addon

When you release a new version:
- Submit a PR updating your addon's entry in `versions.json`
- Update the `version`, `releaseDate`, and `description` fields
- Set `breaking: true` if you have breaking changes
- Set `urgent: true` if it's a critical update

**Note:** Paid addons have `external: false` to distinguish them from free addons.

## Adding Free Addons

Plex Development community members are welcome to add their **free addons** to this registry! This allows users of your addon to benefit from automatic version checking.

### Prerequisites

- Your addon must be for **PlexDevelopment Discord bots**
- Your addon must be **free** (not sold on PlexStore)
- Your addon must have a public download URL
- You must use semantic versioning (e.g., `1.2.3`)
- You should maintain regular updates

### Step-by-Step Guide

1. **Fork the Repository**
   ```bash
   git clone https://github.com/Bali0531-RC/PlexAddons.git
   cd PlexAddons
   ```

2. **Edit `versions.json`**

   Add your addon to the `addons` object:

   ```json
   {
       "addons": {
           "YourAddonName": {
               "version": "1.0.0",
               "releaseDate": "2025-10-08",
               "downloadUrl": "https://github.com/yourusername/your-addon/releases",
               "breaking": false,
               "urgent": false,
               "description": "Brief description of this version's changes",
               "external": true,
               "author": "Your Discord Username",
               "homepage": "https://github.com/yourusername/your-addon",
               "changelog": "https://github.com/yourusername/your-addon/blob/main/CHANGELOG.md (optional)"
           }
       }
   }
   ```

3. **Required Fields**

   - `version`: Semantic version (e.g., `1.2.3`)
   - `releaseDate`: ISO date format (YYYY-MM-DD)
   - `downloadUrl`: Public URL where users can download your addon (GitHub releases, etc.)
   - `description`: Brief description of the release
   - `external`: Must be `true` for free addons
   - `author`: Your Discord username or real name

4. **Optional Fields**

   - `breaking`: Set to `true` if this version has breaking changes
   - `urgent`: Set to `true` if users should update immediately
   - `homepage`: URL to your project's homepage
   - `changelog`: URL to detailed changelog

5. **Update `lastUpdated`**

   Update the root-level `lastUpdated` field with current timestamp:

   ```json
   {
       "lastUpdated": "2025-10-08T12:00:00Z"
   }
   ```

6. **Submit Pull Request**

   - Commit your changes with a clear message:
     ```bash
     git add versions.json
     git commit -m "Add [YourAddonName] v1.0.0 to registry"
     git push origin main
     ```
   
   - Create a pull request on GitHub with:
     - Title: "Add [YourAddonName] to registry"
     - Description including:
       - Brief description of your addon
       - Link to your project
       - Confirmation that you'll maintain version updates

7. **Review Process**

   Your PR will be reviewed for:
   - Valid JSON syntax
   - Proper field usage
   - Working download URL
   - Appropriate version information

## Updating Version Information

Already have your addon in the registry? Update it when you release new versions:

1. Fork/pull latest changes
2. Update your addon's entry in `versions.json`:
   ```json
   "YourAddonName": {
       "version": "1.1.0",  // Update version
       "releaseDate": "2025-10-15",  // Update date
       "description": "New features and bug fixes",  // Update description
       "breaking": false,  // Update if needed
       "urgent": false  // Update if needed
   }
   ```
3. Update the root `lastUpdated` timestamp
4. Submit PR with title: "Update [YourAddonName] to v1.1.0"

## Version Number Guidelines

Follow semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
  - Set `"breaking": true`
  - Document migration steps
  
- **MINOR** (1.0.0 → 1.1.0): New features, backwards compatible
  - Set `"breaking": false`
  
- **PATCH** (1.0.0 → 1.0.1): Bug fixes only
  - Set `"breaking": false`

### When to Use `urgent: true`

Use the urgent flag when:
- Critical security vulnerabilities are fixed
- Data loss bugs are patched
- Service-breaking issues are resolved
- Discord API changes require immediate update

## Code Contributions

### Improving VersionChecker

If you'd like to improve the VersionChecker code:

1. **Fork and create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Maintain backward compatibility

3. **Test your changes**
   - Test with various scenarios
   - Ensure existing functionality still works
   - Test error handling

4. **Submit PR**
   - Clear description of changes
   - Explanation of why the change is needed
   - Examples of usage if applicable

### Documentation Improvements

Help improve documentation by:
- Fixing typos or unclear sections
- Adding more examples
- Improving code comments
- Translating documentation

## Reporting Issues

### Bug Reports

When reporting bugs, include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**:
   - Node.js version
   - VersionChecker version
   - Operating system
6. **Code Sample**: Minimal code that reproduces the issue

### Feature Requests

For feature requests, include:

1. **Use Case**: Describe the problem you're trying to solve
2. **Proposed Solution**: How you envision the feature working
3. **Alternatives**: Other solutions you've considered
4. **Examples**: Code examples of how it would be used

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards others

## Questions?

## Questions?

- Contact bali0531: https://discord.com/users/1141211789552537691
- Open a discussion on GitHub
- Check existing issues for similar questions

## License

By contributing, you agree that your contributions will be licensed under the GNU General Public License v3.0.

---

Thank you for contributing to PlexAddons! 🎉
