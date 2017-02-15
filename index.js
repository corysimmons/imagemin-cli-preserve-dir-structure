#!/usr/bin/env node
'use strict';

var _meow = require('meow');

var _meow2 = _interopRequireDefault(_meow);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _isImage = require('is-image');

var _isImage2 = _interopRequireDefault(_isImage);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cli = (0, _meow2.default)('\n  Usage\n    $ imagemin-dir <input-dir> <output-dir>\n\n  Examples\n    $ imagemin-dir src/img dist/img\n', {
  alias: {
    h: 'help'
  }
});

if (cli.input.length === 2) {
  (function () {
    var n = cli.input[0];
    var o = cli.input[1];

    _fsExtra2.default.walk(n).on('data', function (item) {
      if ((0, _isImage2.default)(item.path)) {
        var inPath = _path2.default.resolve(item.path);
        var outPath = _path2.default.resolve(item.path.replace(n, o));

        _shelljs2.default.echo(_chalk2.default.green('Minifying') + '\n' + inPath + ' to...\n' + outPath + '\n');
        _shelljs2.default.mkdir('-p', '' + _path2.default.dirname(outPath));
        _shelljs2.default.exec('node_modules/.bin/imagemin ' + inPath + ' > ' + outPath);
      }
    });
  })();
} else {
  cli.showHelp();
}
