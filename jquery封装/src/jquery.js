// jquery风格（链式风格）封装dom
// jquery(选择器)用于获取对应的元素，但它不返回这些元素
// 相反，它返回一个对象，这个对象可以操作对应的元素

// selectorOrArray 既可以是选择器也可以是数组
window.jQuery = function(selectorOrArray){
    // elements是个object,伪数组
    let elements
    if(typeof selectorOrArray === 'string'){
        elements = document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }
    const api = {
        // 在api这里定一个oldApi，以便于end()里面使用
        oldApi: selectorOrArray.oldApi,
        // addClass这个函数是一个闭包，函数访问外部变量
        addClass(className){
            for(let i = 0; i<elements.length;i++){
                elements[i].classList.add(className)
            }
            // 用api调用函数，被调用的api返回api
            // 这种叫做链式操作
            return this
            // return this 可是return api
            // obj.fn(para) 函数里的this就是obj
            // obj.fn.call(obj,para) obj是this
        } ,
        // 遍历当前的所有元素
        each(fn){
            for(let i = 0; i < elements.length; i++){
                fn.call(null,elements[i],i)

            }
            return this
        },
        // 获取每个元素的parent
        parent(){
            const arr = []
            this.each((node)=>{
                // 如果arr里面没有node.parentNode 我们才push否则不push
                if(arr.indexOf(node.parentNode) === -1){
                    arr.push(node.parentNode)
                }
            })
            return jQuery(arr)
        },
        children(){
            const arr = []
            this.each((node)=>{
                arr.push(...node.children)
                // 与arr.push(node.children)不一样
            })
        return jQuery(arr)
        },
        print(){
            console.log(elements)
        },
        find(selector){
            let arr = []
            for(let i = 0; i < elements.length; i++){
                // 只有node才能用querySelectorAll
                arr = arr.concat(Array.from(elements[i].querySelectorAll
                (selector)))
            }
            // 我们给arr里面添加一个属性以便end()里面使用
            // this 就是 当前的api
            arr.oldApi = this 
            // 如果 return arr,就没有链式操作了，不符合jquery的设计理念
            // 因此我们要return newApi
            const newApi = jQuery(arr)
            return newApi
        },
        // 回到上一层api
        end(){
            return this.oldApi 
        }
    }
    // 在这里我们return api（可以操作elements的一个对象），不return elements 
    return api
    // 也可以直接:
    // return
    // {
    //     addClass(className){
    //         for(let i = 0; i<elements.length;i++){
    //             elements[i].classList.add(className)
    //         }
    //         return this
    //     } 
    // }
}
