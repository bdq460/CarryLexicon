
import {createDB,saveData} from './indexed_db_module.js'

// Allows users to open the side panel by clicking on the action toolbar icon
// chrome.sidePanel
//   .setPanelBehavior({ openPanelOnActionClick: true })
//   .catch((error) => console.error(error));

// 菜单添加打开侧边栏功能
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenus.create({
//     id: 'openSidePanel',
//     title: 'Open side panel',
//     contexts: ['all']
//   });
// });

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === 'openSidePanel') {
//     // This will open the panel in all the pages on the current window.
//     chrome.sidePanel.open({ windowId: tab.windowId });
//     chrome.sidePanel.setOptions({"path":"sidepanel_dynamic.html"});
//   }
// });

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "markIt",
    title: "记录选中内容",
    contexts: ["selection"]
  });
  createDB();
  // chrome.contextMenus.create({
  //   id: "markAsEnglish",
  //   parentId: "markIt",
  //   title: "英文",
  //   contexts: ["selection"]
  // });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "markIt") {
    console.log("Selected text:", info.selectionText);
    // saveToLocalStorage(info.selectionText)
    saveToIndexedDB(info.selectionText)
  }
});

// chrome.contextMenus.onClicked.addListener(function(info, tab) {
//   if (info.menuItemId === "markAsEnglish") {
//     console.log("Selected English text:", info.selectionText);
//   }
// });


function saveToLocalStorage(data) {

  chrome.storage.local.get(['idx'], result => {
    console.log('aaaaa')
    console.log(result)
    console.log('bbbbbb')
    let idx = 0;
    if( result != null && Object.entries(result).length > 0) {
      console.log('xxxx');
      const [key, val] = Object.entries(result)[0];
      console.log('c',key);
      console.log('d',val);
      console.log('e', typeof val);
      // if( val != undefined ){
      idx = val + 1;
      console.log('idx_1', idx)
      // }
    }
    
    console.log('idx_2', idx)
    chrome.storage.local.set({ 'idx': idx }, () => {
      let storageKey = "selected_text_" + idx;
      console.log('storageKey', storageKey);
      //这里必须使用这种方式进行定义,不能使用{storageKey:data}的方式定义对象
      //使用{storageKey:data}的方式定义对象,则对象的属性固定为storageKey,而非变量值
      const items = {}
      items[storageKey] = data
      chrome.storage.local.set(items, () => {
        if (chrome.runtime.lastError) {
          console.error("Error saving data: " + chrome.runtime.lastError.message);
        } else {
          console.log("Data saved successfully.");
        }
      });
    });
  });
}

function saveToIndexedDB(word) {

  let data = {};
  data['type'] = 'word';
  data['word'] = word;
  let date = new Date();
  let formattedDateTime = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}:${date.getMilliseconds().toString().padStart(3, '0')}`;
  data['time'] = formattedDateTime;

  saveData(data)
}
