window.dom = {
    // const div = dom.find('#test>.red')[0] // 获取对应的元素
    // dom.style(div, 'color', 'red') // 设置 div.style.color
    // 形参aim 要是string输入
    find(aim){
        return document.querySelectorAll(aim)
    },
    // dom.style(div, 'color', 'red') 设置 div.style.color
    style(node,property,para){
        if(arguments.length === 3){
            // dom.style(div,'color','red')
            node.style[property] = para
        }else if(arguments.length === 2){
            if(typeof property === 'string'){
                // dom.style(div,'color')
                return node.style[property]
            }
        }else if(property instanceof Object){
            // dom.style(div,{color:'red'})
            const object = property
            for(let key in object){
                node.style[key] = object[key] 
            }       
        }
    },
    each(arr,fn){
        for(let i = 0; i < arr.length; i++){
            fn.call(null,arr[i])
        }
    }
}

