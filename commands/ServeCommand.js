const path = require('path');
const Command = require('./Command.js');
const Spawn = require('./SpawnCommand.js')

class ServeCommand extends Command {
  run() {
    if (!this.args._[0]) {
      throw new Error('Serve command need a directory to serve.');
    }

    let serve_path = path.join(Command.basePath, this.args._[0]);

    new Spawn(`node js/static_server.js ${serve_path}`, { sync: true }).run();
  }
}

module.exports = ServeCommand;
