/**
 * Basic Usage Example
 * 
 * This example shows the simplest way to use the VersionChecker
 * for Plex Development addons.
 */

const VersionChecker = require('../VersionChecker');

// Initialize version checker for a Plex addon
const versionChecker = new VersionChecker('AiModeration', '1.3.0');

async function checkVersion() {
    console.log('Checking for updates...\n');
    
    // Perform version check
    const result = await versionChecker.checkForUpdates();
    
    // Display formatted message
    console.log(versionChecker.formatVersionMessage(result));
    
    // Show detailed update info if outdated
    if (result.isOutdated) {
        console.log(versionChecker.getUpdateDetails(result));
    }
    
    // Handle specific cases
    if (result.success) {
        if (result.isCurrent) {
            console.log('\n✅ Your addon is up to date!');
        } else if (result.isNewer) {
            console.log('\n🚀 You are running a development version!');
        }
    } else {
        console.error('\n❌ Version check failed:', result.error);
    }
}

// Run the check
checkVersion();
