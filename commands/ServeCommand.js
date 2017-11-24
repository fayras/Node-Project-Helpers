const Command = require('./Command.js');
const Spawn = require('./SpawnCommand.js')

class ServeCommand extends Command {
  run() {
    if (!this.args._[0]) {
      throw new Error('Serve command need a directory to serve.');
    }

    new Spawn(`node ../js/static_server.js ${this.args._[0]}`, { sync: true }).run();
  }
}

module.exports = ServeCommand;
