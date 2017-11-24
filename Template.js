const slug = require('slug');
let Mark = require('markup-js');

Mark.pipes.slug = function (str) {
    return slug(str);
};

Mark.pipes.eol = function (str) {
    return str + '\n';
};

class Template {
  constructor(data, options = {}) {
    this.options = Object.assign({
      stripLeadingWhitespaces: true,
      oneLine: false
    }, options);

    this.data = this.prepare(data);
  }

  render(context) {
    return Mark.up(this.data, context);
  }

  prepare(data) {
    data = this.stripLeadingWhitespaces(data);
    data = this.convertToOneLine(data);
    return data;
  }

  stripLeadingWhitespaces(data) {
    if(!this.options.stripLeadingWhitespaces) {
      return data;
    }

    let tokens = data.split('\n');

    let minSpacesCount = tokens.reduce((min, val) => {
      if(val.trim() === '') {
        return min;
      }

      let count = val.indexOf(val.trim());
      return Math.min(count, min);
    }, Number.MAX_VALUE);

    return tokens.map(item => {
      return item.substr(minSpacesCount);
    }).join('\n').trim();
  }

  convertToOneLine(data) {
    if(!this.options.oneLine) {
      return data;
    }

    return data.split('\n').join(' ').trim();
  }
}

module.exports = Template;
