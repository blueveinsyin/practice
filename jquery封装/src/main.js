// jquery是一个不需要加new的构造函数
// jquery对象指的是jquery函数构造出来的对象
jQuery('.test').find.call(jQuery('.test'),'.child').parent().print()
// 类似于bash alias
window.$ = window.jQuery

// 命名风格的问题
// 如果是普通的div元素 用el开头命名
// 如果是jQuery的元素 用$开头命名