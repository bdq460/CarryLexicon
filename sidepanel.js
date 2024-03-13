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

function getDatasFromIndexedDB(){

    getAllDatas((datas) => {
        console.log(datas);
        for (const data of datas) {
            console.log(data);
            render(data)
        }
    });
};

function render(data){
    let hr = document.createElement("hr");
    hr.setAttribute('class','thinLine')
    document.getElementById('storageContent').append(hr);
    let storageContentDiv = document.createElement("div");
    storageContentDiv.append('['+data.time+'] '+ data.id+' : '+  data.word);
    document.getElementById('storageContent').append(storageContentDiv);
}