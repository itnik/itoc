
//遍历子节点重新编号
function encode_id_with_array(opts, arr) {
    var result = 0;
    for (var z = 0; z < arr.length; z++) {
        result += factor(opts, arr.length - z, arr[z]);
    }
    return result;
}
//遍历父节点重新编号
function get_parent_id_with_array(opts, arr) {
    var result_arr = [];
    for (var z = 0; z < arr.length; z++) {
        result_arr.push(arr[z]);
    }
    result_arr.pop();
    var result = 0;
    for (var z = 0; z < result_arr.length; z++) {
        result += factor(opts, result_arr.length - z, result_arr[z]);
    }
    return result;
}

//编号
function factor(opts, count, current) {
    if (1 == count) {
        return current;
    }

    var str = '';
    for (var i = count - 1; i > 0; i--) {
        str += current * opts.step + '*';
    }

    return eval(str + '1');
}
$(function ($) {

    /*
     * 根据header创建目录
     */
    function create_toc(opts) {
        $(opts.documment_selector).find(':header').each(function () {
            var level = parseInt(this.nodeName.substring(1), 10);
            _rename_header_content(opts, this, level);
            _add_header_node(opts, $(this));
        });
    }

    /*
     * 渲染ztree
     */
    function render_with_ztree(opts) {
        var t = $(opts._zTree);
        $.fn.zTree.init(t, opts.ztreeSetting, opts._header_nodes).expandAll(opts.is_expand_all);
        $(opts._zTree).css(opts.ztreeStyle);
    }

    /*
     * 对header编号 并重命名
     */
    function _rename_header_content(opts, header_obj, level) {
        if (opts._headers.length == level) {
            opts._headers[level - 1]++;
        } else if (opts._headers.length > level) {
            opts._headers = opts._headers.slice(0, level);
            opts._headers[level - 1]++;
        } else if (opts._headers.length < level) {
            for (var i = 0; i < (level - opts._headers.length); i++) {
                opts._headers.push(1);
            }
        }
        if (opts.is_auto_number == true) {
            if ($(header_obj).html().indexOf(opts._headers.join('.')) != -1) {
            } else {
                $(header_obj).html(opts._headers.join('.') + '. ' + $(header_obj).html());
            }
        }
    }

    /*
     * node设置锚点
     */
    function _add_header_node(opts, header_obj) {
        var id = encode_id_with_array(opts, opts._headers);
        var pid = get_parent_id_with_array(opts, opts._headers);
        $(header_obj).attr('id', id);
        //获取标题
        var text=$.trim($(header_obj).text());
        //如果已编号则去除编号
        if(text.indexOf(' ')!=-1){
            text=$.trim(text.substring(text.indexOf(' ')+1,text.length));
        }
        //循环页面内指向该锚点的链接然后把链接的href修改成该锚点的id
        $("[href='#"+text+"']").each(function(){
            $(this).attr('href','#'+id);
        });
        opts._header_offsets.push($(header_obj).offset().top - opts.highlight_offset);
        opts._header_nodes.push({
            id: id,
            pId: pid,
            name: $(header_obj).html() || 'null',
            open: true,
            url: '#' + id,
            target: '_self'
        });
    }

    /*
     * 根据滚动确定当前位置，并更新ZTree
     */
    function bind_scroll_event_and_update_postion(opts) {
        var timeout;
        var highlight_on_scroll = function (e) {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
                var top = $(window).scrollTop();
                for (var i = 0, c = opts._header_offsets.length; i < c; i++) {
                    // fixed: top+5防止点击ztree的时候，出现向上抖动的情况
                    if (opts._header_offsets[i] >= (top + 5)) {
                        $('a').removeClass('curSelectedNode');
                        // 由于存在root节点，所以从1开始
                        $('#tree_' + (i + 1) + '_a').addClass('curSelectedNode');
                        break;
                    }
                }
            }, opts.refresh_scroll_time);
        };
        if (opts.highlight_on_scroll) {
            $(window).bind('scroll', highlight_on_scroll);
            highlight_on_scroll();
        }
    }

    /*
     * 初始化
     */
    function init_with_config(opts) {
        opts.highlight_offset = $(opts.documment_selector).offset().top;
    }

    $.fn.ztree_toc = function (options) {
        //defaults & options 参数合并
        var opts = $.extend({}, $.fn.ztree_toc.defaults, options);
        return this.each(function () {
            opts._zTree = $(this);
            opts._header_nodes = [{id: 1, pId: 0, name: opts.header_nodes_name, open: true}];
            // 初始化
            init_with_config(opts);
            // 创建ztree根节点，获取元数据_headers
            create_toc(opts);
            // 根据_headers生成ztree
            render_with_ztree(opts);
            // 根据滚动确定当前位置，并更新ztree
            bind_scroll_event_and_update_postion(opts);
        });
    };

    //定义默认属性
    $.fn.ztree_toc.defaults = {
        _zTree: null,
        _headers: [],
        _header_offsets: [],
        //定义ZTree根节点
        _header_nodes: null,
        //节点高亮的开始位置
        highlight_offset: 0,
        //滚动的时候是否节点也跟着高亮
        highlight_on_scroll: true,
        //计算滚动判断当前位置的时间，默认是50毫秒
        refresh_scroll_time: 50,
        //默认header的dom根节点
        documment_selector: 'body',
        is_posion_top: false,
        //是否显示header编号
        is_auto_number: false,
        //是否展开节点
        is_expand_all: true,
        //是否对选中行，显示高亮效果
        is_highlight_selected_line: true,
        step: 100,
        ztreeStyle: {
            width: '260px',
            overflow: 'auto',
            position: 'fixed',
            'z-index': 2147483647,
            border: '0px none',
            left: '0px',
            bottom: '0px'
        },
        ztreeSetting: {
            view: {
                dblClickExpand: false,
                showLine: true,
                showIcon: false,
                selectedMulti: false,
                nameIsHTML: true//节点名称支持html
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "pId"
                }
            },
            callback: {
                beforeClick: function (treeId, treeNode) {
                    //TODO: 单击根节点
                    $('a').removeClass('curSelectedNode');
                    if ($.fn.ztree_toc.defaults.is_highlight_selected_line) {
                        $('#' + treeNode.id).css('color', 'red').fadeOut("slow", function () {
                            $(this).show().css('color', 'black');
                        });
                    }
                },
                onRightClick: function (event, treeId, treeNode) {
                    // TODO: 右击根节点
                }
            }
        }
    };
});