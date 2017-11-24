const fs = require('fs');
const path = require('path');
const moment = require('moment');
const inquirer = require('inquirer');
const Command = require('./Command.js');
const SpawnCommand = require('./SpawnCommand.js');
const Template = require('./../Template.js');

class VersionCommand extends Command {
  constructor(args) {
    super(args);
  }

  static get changePrompt() {
    return [{
      name: 'change',
      message: '-'
    }];
  }

  async askForChange(pAnswer = null) {
    let answers = [];

    if(pAnswer) {
      if (!pAnswer.change) {
        return [];
      }

      answers.push(pAnswer.change);
    }

    let answer = await inquirer.prompt(VersionCommand.changePrompt);
    let rec = await this.askForChange(answer);
    return answers.concat(rec);
  }

  writeChangelog(changes) {
    let template = new Template(`
      <!-- CHANGES -->

      ## {{ version }} _- {{ date }}_
      {{if changes.added}}#### Added
      {{changes.added}}- {{ . | eol }}{{/changes.added}}
      {{/if}}{{if changes.changed}}#### Changed
      {{changes.changed}}- {{ . | eol }}{{/changes.changed}}
      {{/if}}{{if changes.fixed}}#### Fixed
      {{changes.fixed}}- {{ . | eol }}{{/changes.fixed}}{{/if}}
    `);

    let file = path.join(Command.basePath, 'CHANGELOG.md');
    let data = fs.readFileSync(file).toString();

    let newChanges = template.render({
      version: require(path.join(Command.basePath, 'package.json')).version,
      date: moment().format('DD.MM.YYYY'),
      changes: changes
    });

    data = data.replace('<!-- CHANGES -->', newChanges);

    fs.writeFileSync(file, data);
  }

  printInfo(message) {
    console.info(`\x1b[1m\n${message}\n\x1b[0m`);
  }

  async run() {
    if(this.args._.length < 1 && this.args.changelog) {
      this.printInfo('Bitte Änderungen eingeben... \nJede Änderung mit Enter bestätigen, leere Eingabe beendet den Prompt.');

      let changes = {
        added: [],
        changed: [],
        fixed: []
      };

      this.printInfo('## Added');
      changes.added = await this.askForChange();

      this.printInfo('## Changed');
      changes.changed = await this.askForChange();

      this.printInfo('## Fixed');
      changes.fixed = await this.askForChange();

      this.writeChangelog(changes);
    } else {
      let version = this.args._[0];
      new SpawnCommand(`npm version ${version} -m "Upgrade to version %s"`, {
        cwd: Command.basePath
      }).run();
    }
  }
}

module.exports = VersionCommand;
