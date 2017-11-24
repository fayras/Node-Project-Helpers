const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const arp = require('app-root-path');

class Command {
  constructor(args = '', options = null) {
    if(typeof args === 'string') {
      args = args.split(' ');
    }

    this.args = minimist(args, options);
  }

  static get basePath() {
    return arp.toString();
  }

  static getFullPath(path) {
    if(!path) {
      return process.cwd();
    }

    return path.resolve(Command.basePath, path);
  }

  run() {
    throw new Error('Command is an abstract class. You have to override the run method.');
  }
}

module.exports = Command;
