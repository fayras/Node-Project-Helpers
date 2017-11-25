#! /usr/bin/env node

require('pretty-error').start().skipNodeFiles().skipPath('bootstrap_node.js');
const CommandDispatcher = require('./commands/CommandDispatcher.js');

const userArgs = process.argv.slice(2);
CommandDispatcher.execute(userArgs);
