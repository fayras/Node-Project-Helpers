const fs = require('fs');
const path = require('path');

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

class CommandDispatcher {
  constructor(args) {
    const commandName = capitalize(args[0]);

    let commandPath = path.join(__dirname, `${commandName}Command.js`);
    if(!fs.existsSync(commandPath)) {
      commandPath = path.join(__dirname, `UnknownCommand.js`);
    }

    const Command = require(commandPath);
    new Command(args.slice(1)).run();
  }
}

module.exports = CommandDispatcher;
