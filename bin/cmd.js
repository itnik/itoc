#!/usr/bin/env node

function isDefined(x) {
    return x !== null && x !== undefined;
}
Array.prototype.contain = function (obj) {
    return this.indexOf(obj) !== -1;
};

//加载命令行依赖
var program = require('commander');
//读取版本号
var version = require("../package.json").version;

//定义命令
program
    .version(version)
    .usage(" itoc is a npm to help MarkDown file generated it's toc/sidebar !")
    .option('-f, --file [filename]', 'default is README.md')
    .option('-o, --open', 'open in browser')
    .option('-d, --debug', 'open debug mode')
    .option('-a, --archive', 'archive file')
    .parse(process.argv);

//获取脚本的工作目录
var pwd = process.cwd();
//Md文件名称
var filename = "README.md";
//是否在浏览器中打开
var is_open = false;
//是否开启DEBUG
var debug = false;
//是否压缩
var archive = false;

//-f命令
if (program.file) {
    filename = program.file;
}

//-o命令
if (program.open) {
    is_open = program.open;
}

//-d命令
if (program.debug) {
    debug = program.debug;
}
//-a命令
if (program.archive) {
    archive = program.archive;
}

//源文件目录 带后缀(默认是相对路径)
var source_file_path = pwd + '/' + filename;
//根据首字母判断相对路径和绝对路径
var first_char=filename.substr(0,1);
if(first_char=='.'){
    source_file_path = pwd + '/' + filename;
}else if(first_char=='/'){
    source_file_path=filename;
}

//源文件名称 带后缀
var file_name = source_file_path.split('/').pop();
//打包文件目录 带后缀
var dist_file_path = (pwd + '/'+(file_name.split('.')[0])+'/' + (file_name.split('.')[0]) + '.html');
//默认配置
var default_config = {
    debug: debug,
    is_open: is_open,
    archive: archive,
    archive_path: (pwd + '/'+(file_name.split('.')[0]))
};

//控制台打印
console.log('upload file path');
console.log('==> ' + filename);
console.log('current path');
console.log('==> ' + pwd);
console.log('source file path');
console.log('==> ' + source_file_path);
console.log('dist file path');
console.log('==> ' + dist_file_path);
//调用主程序
require('../index')(pwd, source_file_path, dist_file_path, default_config);