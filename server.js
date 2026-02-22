// Hostinger Passenger custom entry point for Next.js Standalone
const path = require('path');

// When output: 'standalone' is enabled, Next.js generates its own optimized server
// inside the standalone directory. We just need to load it.
process.env.NODE_ENV = 'production';
process.chdir(__dirname);

// Use the bundled Next.js server directly
require(path.join(__dirname, '.next', 'standalone', 'server.js'));
