# 简介

itoc 生成器，仅需一个命令就能能够帮助MarkDown文件生成带有左侧边栏导航目录的html文件.

支持:

* 绝对路径/相对路径<sup><font color=res>NEW</font></sup>
* 导航目录自动编号
* 选中导航目录显示高亮
* 代码自动识别高亮
* 代码自动行号
* 生成文件压缩
* 灵活配置

根据自己需要在生成的config.js中定制配置html的显示效果


## 安装


首先你需要有一个Node环境可以使用npm命令

安装

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

### 用户登录

**接口说明:**`用户登录`

**调用地址:**`http://host/User/login`

**参数名称:**`param`

**参数示例:**

```
{
    "data": {
        "user": {
            "account": "itnik",
            "pwd": "111111"
        },
        "session_id": "e10ac973d7dd9e5628f3e1b1",
        "user_id": "0",
        "city_id": "4",
        "version": "3.0.6"
    }
}
```

参数          |  类型  | 必填 | 描述
------------:|:------:|:---:|:-----------
user         | object | Y   | 用户信息
user.account | string | Y   | 账号
user.pwd     | string | Y   | 密码
session_id   | string | Y   | SessionId
user_id      | string | N   | 用户ID 默认0
city_id      | string | Y   | 城市ID 默认0
version      | string | Y   | 版本号


**调用方式:**`POST|GET`

**返回示例:**

```
{
  "data": {
    "id": "xx",
    "email": "xx",
    "name": "xx"
  },
  "info": "xx",
  "status": "200"
}
```

参数        | 类型    | 描述
----------:|:------:|:------------
id         | string | 用户ID
email      | string | 用户邮箱
name       | string | 用户名

### 效果

命令

![image](https://github.com/itnik/itoc/blob/master/doc/code.png)

页面1

![image](https://github.com/itnik/itoc/blob/master/doc/page1.png)

页面2

![image](https://github.com/itnik/itoc/blob/master/doc/page2.png)


