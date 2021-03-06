
var path = require('path');
var chalk = require('chalk');    //不同颜色的info
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');    //yeoman弹出框
var path = require('path');
var zktest = yeoman.Base.extend({
  info: function() {
    this.log(chalk.green(
      'I am going to build your app!'
    ));
  },
  generateBasic: function() {  //按照自己的templates目录自定义
    this.directory('src', 'src');    //拷贝目录
    this.directory('public', 'public');
    this.copy('vue.config.js', 'vue.config.js');   //拷贝文件
    this.copy('babel.config.js', 'babel.config.js');
    this.copy('README.md', 'README.md');
  },
  generateClient: function() {
    this.sourceRoot(path.join(__dirname, 'templates'));
    this.destinationPath('./');
  },
  install: function() {      //安装依赖
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  },
  end: function() {
    this.log(yosay(
      'Your app has been created successfully!'
    ));
  }
});
module.exports = zktest;
