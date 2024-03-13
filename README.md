
1. 变量必须用let或const定义
1. 定义对象如果属性为变量必须用对象赋值的方式进行设置,而不能以{key:value}的方式进行设置
    ```JavaScript
    let key = 'name'
    let value = 'xxx'
    // 必须采用如下方式定义,才能data.name == 'xxx'
    let data={}, 
    data={}
    data[key] = value
    // 如果如下定义方式,则对象属性为key,而非key变量所对应的值,
    // 即data.key == 'xxx'
    let data = {key:value}

1. 解决在chrome://extensions/页面,点击插件按钮,弹出popup页面时,插件报错"Uncaught (in promise) Error: Cannot access a chrome:// URL"的问题
    
    - _报这个错误是因为,chrome://所对应页面的资源是chrome内核的,而chrome内核的页面插件不能不能访问,所导致_。
    - _因此在popup.js中增加代码,判断当前页面是否为chrome://,如果是,则直接return,不执行后续代码_.
    ```JavaScript
    // 检查 URL 是否以 "chrome://extensions/" 开头
    // "chrome://extensions/"页面执行脚本会报错
    if (currentTab.url.startsWith("chrome://extensions/")) {
        // 这是 chrome://extensions/ 页面
        console.log("This is the chrome://extensions/ page.");
    } else {
        // 这是正常页面
        console.log("This is a normal page.");
        // 执行业务逻辑
        // do some actions here
    }
