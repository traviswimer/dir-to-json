var requireDir = require('require-dir');

// Load all gulp tasks
requireDir('./gulp/tasks', { recurse: true });
