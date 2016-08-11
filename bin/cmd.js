#!/usr/bin/env node

/**
 * 依赖
 */
function isDefined(x) { return x !== null && x !== undefined; } 
Array.prototype.contain = function(obj) {
  return this.indexOf(obj) !== -1;
}

var program = require('commander');
var version = require("../package.json").version;

/**
 * 命令
 */
program
	.version(version)
	.usage("itoc is a npm to help Mou generated it's sidebar")
	.option('-f, --file', 'default is README.md ')
	.option('-o, --open', 'open in browser')
	.option('-v, --verbose', 'print log in the console')
	.parse(process.argv);
	
var pwd = process.cwd()  
var filename = "README.md";
var is_open = false;

if (program.file) {
	filename = program.file;
}

if (program.open) {
	is_open = program.open;
}

var verbose = false;
if (program.verbose) {
	verbose = program.verbose;
}

var _verbose = verbose;
function log(str){
	if(_verbose == true){
		console.log(str);
	}
}

log('filename = ' + filename); 
log('verbose = ' + verbose);

var source_file = filename;

var markd_config = {
	debug: false
}

/**
 * 打印生成文件的路径
 */
var pwd = process.cwd()  
var source_file_name = pwd + '/' + source_file
var file_name = source_file_name.split('/').pop();;
var _file_name = file_name.split('.')[0];
var dest_file_path = pwd + '/preview/' + _file_name + '.html';
console.log('pwd=' + pwd);
console.log('source_file_name=' + source_file_name);
console.log('dest_file_path=' + dest_file_path);
require('../index')(pwd, source_file_name, dest_file_path, is_open, markd_config);