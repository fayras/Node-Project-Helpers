const { spawn, spawnSync } = require('child_process');
const Command = require('./Command.js');

class SpawnCommand extends Command {
  constructor(args, options = {}) {
    super(args, {
      stopEarly: true
    });

    this.options = {
      cwd: options.cwd || null,
      sync: options.sync || false
    }
  }

  run() {
    let sp = this.options.sync ? spawnSync : spawn;

    sp(this.args._[0], this.args._.splice(1), {
      cwd: this.options.cwd,
      shell: true,
      stdio: 'inherit'
    });
  }
}

module.exports = SpawnCommand;
