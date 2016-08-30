'use strict';
//载入依赖
require('shelljs/global');
var assign = require('object-assign');
var fs = require('fs');
var BufferHelper = require('bufferhelper');
var Handlebars = require('handlebars');
var open = require("open");

//定义自动生成方法
function generator(pwd, source_file_path, dist_file_path, options) {
    //获取文件名称 不含后缀
    var file_name = source_file_path.split('/').pop().split('.')[0];
    //生成目录
    var api_path = pwd + '/api';
    //模板路径
    var template_path = __dirname + '/vendor/template.html';
    log('ApiPath');
    log('==> ' + api_path);
    log('CurModulePath');
    log('==> ' + __dirname);
    log('HtmlTemplatePath');
    log('==> ' + template_path);

    //检查生成目录是否存在 不存即创建
    if (test('-d', api_path)) {
        mkdir('-p', api_path);
    } else {
        log('==> ApiPath is exist');
    }
    //复制模板
    _cp_template_dir(__dirname, api_path);
    _toc_config(__dirname, api_path);

    /**
     * 打印日志
     * @param str 字符串
     */
    function log(str) {
        if (options.debug)
            console.log(str);
    }

    /**
     * 复制模板
     * @param cur_dir 当前目录
     * @param dist_dir 打包目录
     * @private 私有函数
     */
    function _cp_template_dir(cur_dir, dist_dir) {
        cp('-R', cur_dir + '/vendor/toc', dist_dir + '/');
    }

    /**
     * 目录配置
     * @param cur_dir 当前目录
     * @param dist_dir 打包目录
     * @private 私有函数
     */
    function _toc_config(cur_dir, dist_dir) {
        if (test('-d', dist_dir + "/config.js")) {
            log('==> config file exist')
        } else {
            cp('-R', cur_dir + '/vendor/config.js', dist_dir + '/');
        }
    }

    /**
     * 读取md文件
     */
    fs.readFile(source_file_path, function (error, data) {
        //打印错误
        if (error) {
            log('==> read md file error ' + error);
            return;
        } else {
            log('==> read md file success');
        }
        //创建可读取的流对象
        var rs = fs.createReadStream(template_path, {bufferSize: 11});
        //创建buffer对象
        var bufferHelper = new BufferHelper();
        //读取数据事件
        rs.on("data", function (trunk) {
            bufferHelper.concat(trunk);
        });
        //读取结束事件
        rs.on("end", function () {
            //转成字符串
            var source = bufferHelper.toBuffer().toString('utf8');
            //编译模板
            var template = Handlebars.compile(source);
            //marked解析对象
            var marked = require('marked');
            //解析md文件
            marked(data.toString(), options, function (error, data) {
                //打印错误
                if (error) {
                    log('==> parse md file error ' + error);
                    return;
                } else {
                    log('==> parse md file success');
                }
                //定义数据内容
                var content = {
                    "title": file_name,
                    "parse_markdown": data
                };
                //数据渲染至模板
                var final_html_content = new Buffer(template(content));
                //保存文件
                fs.writeFile(dist_file_path, final_html_content, function (error) {
                    //打印错误
                    if (error) {
                        log('==> save html file error ' + error);
                        return;
                    } else {
                        log('==> save html file success');
                    }
                    //是否在浏览器中打开
                    if (options.is_open == true) {
                        open(dist_file_path);
                    }
                });
            });
        });
    });
};
//公开自动生成接口
module.exports = generator;