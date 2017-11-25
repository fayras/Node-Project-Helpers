const fs = require('fs');
const path = require('path');
const Command = require('./Command.js');
const commandDir = require(path.join(Command.basePath, 'package.json')).nphCustomCommands;

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

class CommandDispatcher {
  static execute(args) {
    const commandName = capitalize(args[0]);
    const commandPath = CommandDispatcher.getCommandPath(commandName);
    const CommandCostructor = require(commandPath);
    new CommandCostructor(args.slice(1)).run();
  }

  static getCommandPath(commandName) {
    let commandPath;

    if(commandDir) {
      commandPath = path.join(commandDir, `${commandName}Command.js`);
      if(fs.existsSync(commandPath)) {
        return commandPath;
      }
    }

    commandPath = path.join(__dirname, `${commandName}Command.js`);
    if(fs.existsSync(commandPath)) {
      return commandPath;
    }

    return path.join(__dirname, `UnknownCommand.js`);
  }
}

module.exports = CommandDispatcher;
