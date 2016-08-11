## Install 

	sudo npm install -g itoc
	
## Usage

```
  itoc -h

  Usage: itoc is a npm to help Mou generated it's sidebar

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -f, --file [filename]  default is README.md 
	-o, --open             open in browser
    -v, --verbose          print the log
```

这个版本的命令比较简单，只有一个`-f`参数，如果没有填写，默认使用`README.md`，常见用法

	itoc -f sample.md