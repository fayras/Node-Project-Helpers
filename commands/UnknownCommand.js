const Command = require('./Command.js');

class UnknownCommand extends Command {
  run() {
    console.info(`
    \x1b[1m\x1b[41mError\x1b[0m: \x1b[1mUnknown command.\x1b[0m
    `);
  }
}

module.exports = UnknownCommand;
