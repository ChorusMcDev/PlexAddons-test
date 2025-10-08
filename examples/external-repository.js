/**
 * Self-Hosted Registry Example
 * 
 * This example demonstrates how to use the VersionChecker with
 * your own self-hosted version registry (optional).
 * 
 * Most Plex Development addons should use the default registry.
 */

const VersionChecker = require('../VersionChecker');

// Initialize version checker with a custom repository URL
const versionChecker = new VersionChecker('MyCustomBot', '2.1.5', {
    // Point to your own versions.json file
    repositoryUrl: 'https://raw.githubusercontent.com/yourusername/your-repo/main/versions.json',
    
    // Optional: Configure timeout (in milliseconds)
    timeout: 10000,
    
    // Optional: Configure retry attempts
    retries: 3,
    
    // Optional: Disable automatic check on startup
    checkOnStartup: true
});

async function performVersionCheck() {
    console.log('Checking version against custom repository...\n');
    
    try {
        const result = await versionChecker.checkForUpdates();
        
        if (!result.success) {
            console.warn('⚠️  Version check failed:', result.error);
            console.warn('Continuing without update check...\n');
            return;
        }
        
        // Display formatted output
        console.log(versionChecker.formatVersionMessage(result));
        
        // Show details if update is available
        if (result.isOutdated) {
            console.log(versionChecker.getUpdateDetails(result));
            
            // Take action based on update flags
            if (result.urgent) {
                console.error('\n🚨 CRITICAL: This is an urgent update!');
                console.error('Please update as soon as possible.\n');
            }
            
            if (result.breaking) {
                console.warn('\n⚠️  WARNING: This update contains breaking changes!');
                console.warn('Please review the changelog before updating.\n');
            }
        } else if (result.isCurrent) {
            console.log('\n✅ You are running the latest version!\n');
        } else if (result.isNewer) {
            console.log('\n🔧 You are running a development/unreleased version!\n');
        }
        
        // Access additional information
        console.log('Additional Info:');
        console.log(`  - Repository: ${result.repository || 'N/A'}`);
        console.log(`  - Support: ${result.supportServer || 'N/A'}`);
        console.log(`  - Last Registry Update: ${result.lastUpdated || 'N/A'}`);
        
    } catch (error) {
        console.error('Unexpected error during version check:', error.message);
    }
}

// Run the version check
performVersionCheck();
