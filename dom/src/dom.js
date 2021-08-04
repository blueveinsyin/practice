// 对象模式封装dom的api
// 我们这次实现的封装是按照对象风格实现
// 因此建议熟悉一下js对象的语法特征。
window.dom = {
    // 我们想实现 create('<div>hi</div>')
    create(string){
        // template 标签可以创建任何标签
        const container = document.createElement('template')
        // trim就是把文本两边的空格都消除
        container.innerHTML = string.trim()
        // template获取方法
        return container.content.firstChild
        // window.dom是一个对象
    },
    //在一个节点后面插入一个节点 
    after(node,newNode){
        // 我们目前只有insertBefore
        // 如果node是最后一个，我们依然可以找到node.nextSibling，因为它是null
        node.parentNode.inserBefore(newNode,node.nextSibling)
    },
    before(node,newNode){
        node.parentNode.inserBefore(newNode,node)
    },
    append(parent,node){
        parent.appendChild(node)
    },
    // 添加一个父节点
    wrap(node,parent){
        dom.before(node,parent)
        dom.append(parent,node)
    },
    //
    remove(node){
        node.parentNode.removeChild(node)
        return node
    },
    empty(node){
        const childNodes = node.childNodes
        // const {childNodes} = node 这一段代码和36行一样
        const array = []
        // for(let i = 0; i < childNodes.length; i++){
        //     dom.remove(childNodes[i])
        //     array.push(childNodes[i])
        // }
        // return array
        // for 循环这里不适合，因为length是动态变化的，我们应该用while循环
        let x = node.firstChild
        while(x){
            // 也移除了文本节点
            array.push(dom.remove(node.firstChild))
            x=node.firstChild
        }
        return array
    },
    // 改
    attr(node,name,value){
        // 根据参数个数写不同的代码就是重载
        // js可以接受不同数量的参数
        if(arguments.length === 3){
            node.setAttribute(name,value)
        }
        if(arguments.length === 2){
            return node.getAttribute(name)
        }
    },
    text(node,string){
        if(arguments.length === 1){
            if('ineerText' in node){
                return node.innerText
            }else{
                return textContent
            }
        }else if(arguments.length === 2){
            // innerText 支持ie
            // 这种判断的代码写法叫做适配
            if('ineerText' in node){
                node.innerText = string
            // 如果处理文本内容还有其他内容比如标签，
            // 都会被改变。作为库的开发者，很难照顾到这种需求
            }else{
            // 用textContent 支持firefox chrome
                node.textContent = string
            }
        }
    },
    html(node,string){
        if(arguments.length === 2){
            node.innerHTML = string
        }else if(arguments.length === 1){
            return node.innerHTML
        }
    },
    //实现3中不同的情况
    style(node,name,value){
        if(arguments.length === 3){
            // dom.style(div,'color','red')
            node.style[name] = value
        }else if(arguments.length === 2){
            if(typeof name === 'string'){
                // dom.style(div,'color')
                return node.style[name]
            }
        }else if(name instanceof Object){
            // dom.style(div,{color:'red'})
            const object = name
            for(let key in object){
                node.style[key] = object[key]            }
        }
    },
    // 实现dom.class.add(test,'red')实现添加一个class
    // class:function{} 另外一种写法 
    class:{
        add(node,className){
            node.classList.add(className)
        },
        remove(node,className){
            node.classList.remove(className)
        },
        has(node,className){
            return node.classList.contains(className)
        }
    },
    on(node,eventName,fn){
        node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn)
    },
    find(selector, scope){
        return (scope || document).querySelectorAll(selector)
    },
    parent(node){
        return node.parentNode
    },
    children(node){
        return node.children
    },
    siblings(node){
        return Array.from(node.parentNode.children).filter
        (n => n !== node)
    },
    next(node){
        // 不要用nextSibling 因为里面包含文本节点（比如回车）
        // 因此我们要在这里判断一下下一个节点是否为文本
        let x = node.nextSibling
        while(x.nodeType === 3){
            x = x.nextSibling
        }
        return x
    },
    previous(node){
        let x = node.previousSibling
        while(x && x.nodeType === 3){
            x = x.previousSibling
        }
        return x
    },
    each(nodeList,fn){
        for(let i = 0;i < nodeList.length; i++){
            fn.call(null,nodeList[i])
        }
    },
    index(node){
        const lsit = dom.children(node.parentNode)
        let i 
        for(i = 0; i > lsit.length; i++){
            if(list[i] === node){
                break
            }
        }
        return i
    }
}