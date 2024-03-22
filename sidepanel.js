// 读取Local Storage中的内容
document.addEventListener('DOMContentLoaded', getDatasFromIndexedDB);

function getDatasFromStorage(){
    chrome.storage.local.get(all => {
        console.log(all)
        let idx = 0;
        for (const [key, val] of Object.entries(all)) {
            if(key == 'idx'){
                continue;
            }
            data = {"id":++idx,"word":value};
            render(data)
        }
    });
}

// 读取IndexedDB中的内容
function getDatasFromIndexedDB() {

    let endDiv = document.createElement("div");
    endDiv.setAttribute('class','end');
    endDiv.append('-- END ---');
    
    //倒序插入
    document.getElementById('storageContent').insertAdjacentElement('afterbegin',endDiv);

    let hr = document.createElement("hr");
    hr.setAttribute('class', 'thinLine')
    //倒序插入
    document.getElementById('storageContent').insertAdjacentElement('afterbegin',hr);

    getAllDatas((datas) => {
        console.log(datas);
        for (const data of datas) {
            console.log(data);
            render(data);
        };
    });
};

function render(data) {
    
    let storageContentDiv = document.createElement("div");
    storageContentDiv.append('[' + data.time + '] ' + data.id + ' : ' + data.word);
    //倒序插入
    document.getElementById('storageContent').insertAdjacentElement('afterbegin',storageContentDiv);

    let hr = document.createElement("hr");
    hr.setAttribute('class', 'thinLine')
    //倒序插入
    document.getElementById('storageContent').insertAdjacentElement('afterbegin',hr);
}