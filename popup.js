// document.addEventListener('DOMContentLoaded', function() {
//     chrome.runtime.sendMessage({ action: 'getSelection' }, function(response) {
//       if (response && response.selectionText) {
//         document.getElementById('selectedText').textContent = response.selectionText;
//       } else {
//         document.getElementById('selectedText').textContent = 'No text selected.';
//       }
//     });
//   });


document.addEventListener('DOMContentLoaded', function () {

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        // 检查当前标签页的 URL
        console.log("tabs", tabs);
        let currentTab = tabs[0];
        console.log("currentTab", currentTab);

        // 检查 URL 是否以 "chrome://extensions/" 开头
        // "chrome://extensions/"页面执行脚本会报错
        if (currentTab.url.startsWith("chrome://extensions/")) {
            // 这是 chrome://extensions/ 页面
            console.log("This is the chrome://extensions/ page.");
        } else {
            // 这是正常页面
            console.log("This is a normal page.");
            chrome.scripting.executeScript({
                target: { tabId: currentTab.id },
                function: getSelectedText,
            }).then(results => {
                console.log("results:", results)
                var selectedText = '没有选中内容'
                if (results.length > 0 && results[0].result) {
                    selectedText = results[0].result;
                }
                console.log("selectedText:", selectedText);
                document.getElementById('selectedText').textContent = selectedText;
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', getDatasFromIndexedDB);

// function getCurrentTab(callback) {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   chrome.tabs.query(queryOptions, ([tab]) => {
//     if (chrome.runtime.lastError){
//       console.error(chrome.runtime.lastError);
//     }
//     console.log("333");
//     // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     callback(tab);
//   });
// }

function getSelectedText() {
    const selection = window.getSelection();
    return selection.toString();
}

// 读取Local Storage中的内容
function getDatasFromStorage() {
    chrome.storage.local.get(all => {
        console.log(all)
        let idx = 0;
        for (const [key, val] of Object.entries(all)) {
            if (key == 'idx') {
                continue;
            }
            data = { "id": ++idx, "word": value };
            render(data)
        }
    });
}

// 读取IndexedDB中的内容
function getDatasFromIndexedDB() {

    getAllDatas((datas) => {
        console.log(datas);
        for (const data of datas) {
            console.log(data);
            render(data);
        };
    });
};

function render(data) {
    let hr = document.createElement("hr");
    hr.setAttribute('class', 'thinLine')
    document.getElementById('storageContent').append(hr);
    let storageContentDiv = document.createElement("div");
    storageContentDiv.append('[' + data.time + '] ' + data.id + ' : ' + data.word);
    document.getElementById('storageContent').append(storageContentDiv);
}