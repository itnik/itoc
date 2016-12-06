'use strict';
//载入依赖
require('shelljs/global');
var assign = require('object-assign');
var fs = require('fs');
var BufferHelper = require('bufferhelper');
var Handlebars = require('handlebars');
var open = require("open");
var archiver = require('archiver');

//定义自动生成方法
function generator(pwd, source_file_path, dist_file_path, options) {
    //获取文件名称 不含后缀
    var file_name = source_file_path.split('/').pop().split('.')[0];
    //生成目录
    var api_path = pwd + '/' + file_name;
    //模板路径
    var template_path = __dirname + '/vendor/template.html';
    log('api path');
    log('==> ' + api_path);
    log('cur module path');
    log('==> ' + __dirname);
    log('html template path');
    log('==> ' + template_path);
    //检查生成目录是否存在 不存即创建
    if (test('-d', api_path)) {
        mkdir('-p', api_path);
    } else {
        log('==> api path is exist');
    }
    //复制模板
    _cp_static(__dirname, api_path);
    _cp_config(__dirname, api_path);
    _cp_highlight(__dirname, api_path);

    /**
     * 打印日志
     * @param str 字符串
     */
    function log(str) {
        if (options.debug)
            console.log(str);
    }

    /**
     * 复制静态文件
     * @param cur_dir 当前目录
     * @param dist_dir 打包目录
     * @private 私有函数
     */
    function _cp_static(cur_dir, dist_dir) {
        cp('-R', cur_dir + '/vendor/toc', dist_dir + '/');
    }

    /**
     * 复制配置文件
     * @param cur_dir 当前目录
     * @param dist_dir 打包目录
     * @private 私有函数
     */
    function _cp_config(cur_dir, dist_dir) {
        cp('-R', cur_dir + '/vendor/config.js', dist_dir + '/');
    }

    /**
     * 复制代码高亮文件
     * @param cur_dir 当前目录
     * @param dist_dir 打包目录
     * @private 私有函数
     */
    function _cp_highlight(cur_dir, dist_dir) {
        cp('-R', cur_dir + '/vendor/highlight', dist_dir + '/');
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
            marked.setOptions({
                //关闭只解析标准md
                pedantic: false,
                //启动Github样式
                gfm: true,
                //支持Github换行符
                breaks: true,
                //支持Github表格
                tables: true,
                //原始输出
                sanitize: false,
                //优化列表输出
                smartLists: true,
                smartypants: false

            });
            //解析md文件
            marked(data.toString(), function (error, data) {
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
                        //是否压缩
                        if (options.archive) {
                            // 创建一个流归档数据的文件
                            var output = fs.createWriteStream(options.archive_path + '.zip');
                            var archive = archiver('zip', {
                                store: true //设置压缩方法
                            });
                            // 监听要写入的所有归档数据
                            output.on('close', function () {
                                log('==> '+archive.pointer() + ' total bytes');
                                log('==> archive has been finalized and the output file descriptor has closed.');
                            });
                            // 捕获错误
                            archive.on('error', function (error) {
                                log('==> archive file error ' + error);
                                return;
                            });
                            // 通过管道把数据归档到文件中
                            archive.pipe(output);
                            //批量添加文件
                            archive.bulk([
                                {
                                    expand: true,
                                    cwd: options.archive_path + '/',
                                    src: ['**'],
                                    dest: file_name + '/'
                                }
                            ]);
                            // 完成档案（关闭流）
                            archive.finalize();
                            log('==> archive file success ');
                        }
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