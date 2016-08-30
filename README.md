# ITOC

itoc is a npm to help MarkDown file generated it's toc/sidebar !

itoc 是一个node项目，仅需一个命令就能能够帮助MarkDown生成带有目录/侧边栏的html.

生成侧边栏目录默认配置:

* 目录是否自动编号
* is_auto_number: true
* 是否展开所有节点
* is_expand_all: true
* 是否对选中行显示高亮效果
* is_highlight_selected_line: true
* 根节点名称
* header_nodes_name:'API'

根据自己需要在生成的config.js中配置

## Install (安装)


Should install NodeJs environment first.

安装NodeJs环境才可以使用npm命令。

local 本地安装

```
  npm install itoc
```

Global 全局安装

```
  sudo npm install -g itoc
```
	
## Usage (使用)

* Base 基本命令

可以直接生成文件 生成文件的目录会打印出来


```
  itoc -f README.md
```

* Base And Open 生成之后打开

```
  itoc -f README.md -o
```

* Base And Open With Log 生成之后打开且生成日志

```
  itoc -f README.md -o -d
```

* Other 其他

```
  itoc -h

    Usage: itoc  itoc is a npm to help MarkDown file generated it's toc/sidebar !

    Options:

      -h, --help             output usage information
      -V, --version          output the version number
      -f, --file [filename]  default is README.md
      -o, --open             open in browser
      -d, --debug            open debug mode
```

## Screenshot (截图)

命令

![image](https://github.com/itnik/itoc/blob/master/doc/code.png)

页面

![image](https://github.com/itnik/itoc/blob/master/doc/page.png)
