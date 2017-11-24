const path = require('path');
const Command = require('./Command.js');
const Spawn = require('./SpawnCommand.js')

class ServeCommand extends Command {
  run() {
    if (!this.args._[0]) {
      throw new Error('Serve command need a directory to serve.');
    }

    let server_path = path.join(__dirname, '../js/static_server.js');
    let serve_path = path.join(Command.basePath, this.args._[0]);

    new Spawn(`node ${server_path} ${serve_path}`, { sync: true }).run();
  }
}

module.exports = ServeCommand;
