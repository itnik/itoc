# 简介

itoc 生成器，仅需一个命令就能能够帮助MarkDown文件生成带有左侧边栏导航目录的html文件.

特点:

* 自动锚点<sup><font color=#b92500>NEW</font></sup>   
> 只需按md的标准书写链接`[链接名](#锚点名称)`
> itoc就会根据`锚点名称`自动匹配`#`修饰的`header`并关联.

* 支持绝对路径/相对路径<sup><font color=#b92500>NEW</font></sup>  
> 生成的命令支持相对路径和绝对路径.
> 例：`itoc -f ./Documents/README.md`
> 或：`itoc -f Users/itnikc/Documents/README.md`.

* 导航目录自动编号  
> 生成左侧导航会根据`#`修饰的`header`的层级关系自动编号.

* 选中导航目录显示高亮  
> 点击左侧生成的某一个导航，右侧就会跳转至该导航指向的`header`位置且`header`红色亮一下示意.

* 代码自动识别高亮  
> 代码块修饰的内容itoc会自动识别编程语言并且高亮

* 代码自动行号  
> 代码块修饰的内容itoc会自动生成行号

* 生成文件压缩  
> itoc 生成的文件支持压缩，命令中仅需加`-a`即可.
> 例:`itoc -f README.md -a`.

* 灵活配置  
> 生成的文件夹根目录中的`config.js`含有配置项，可以配置`是否自动编号`，`是否展开所有节点`，`根节点名称`等.
> 根据自己需要在生成的config.js中定制配置html的显示效果.


## 安装


首先你需要有一个Node环境可以使用npm命令

> 下面举例均使用了全局安装,所以`-g`您也可以本地安装不加`-g`.

全局安装

```
  sudo npm install -g itoc
```
更新

```
  sudo npm update -g itoc
```

卸载

```
  sudo npm uninstall -g itoc
```
	
## 使用

* 生成文件

```
  itoc -f README.md
```

* 生成之后浏览器打开

```
  itoc -f README.md -o
```

* DEBUG模式生成文件

```
  itoc -f README.md -d
```

* 生成文件且压缩

```
  itoc -f README.md -d -a
```

* 帮助

```
  itoc -h

    Usage: itoc  itoc is a npm to help MarkDown file generated it's toc/sidebar !

    Options:

      -h, --help             output usage information
      -V, --version          output the version number
      -f, --file [filename]  default is README.md
      -o, --open             open in browser
      -d, --debug            open debug mode
      -a, --archive          archive file
```

## 示例

**该文档**用于测试

[更新日志](#更新日志)

* 2017-08-19 更新至v1.0.3<sup><font color=#458B00>NEW</font><sup>

### Auth

#### 获取Token

**接口描述:**`我是描述`

**调用地址:**`https://host/Auth/getToken`

**调用方式:**`POST`

**参数示例:**

```
{
    "appid": "",
    "appsecret": "",
    "key": ""
}
```

参数		| 类型	  | 必填 | 描述
---------:|:------:|:---:|:----
appid     | string |  Y  | 开发者Id
appsecret | string |  Y  | 开发者密码
key       | string |  Y  | 机器码/unionId

**返回示例:**

```
{
    "data": "token",
    "message": "OK",
    "status": 0
}
```

参数       | 类型   | 描述
---------:|:------:|:--------
token	   | string | Token

**Tip**

* 该接口返回的Token在调用其他的接口的时需在请求的<mark>header</mark>中加入`Authorization:token`
### 帮助

#### 更新日志

2017-08-16（v1.0.3)<sup><font color=#458B00>NEW</font><sup>

1.  `A` 新增 用户编辑资料接口
2.  `F` 修复 获取轮转图片列表接口url中多个小写字母`c`的问题
3.  `U` 优化 用户登录接口参数`pwd`改为`password`且`cityId`修改为非必填
4.  `R` 删除 用户登录接口返回参数中 `email`、`tel`、`name`、`points`

> 说明：本例比较完整的演示了md在书写API时候的一些格式和写法.也演示了itoc的自动锚点功能.顶部的`[更新日志](#更新日志)`该链接会被自动锚点至下面`#### 更新日志`
## 效果

![image](https://github.com/itnik/itoc/blob/master/doc/readme.png)


