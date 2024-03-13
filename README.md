
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

