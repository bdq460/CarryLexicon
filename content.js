// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.action === "getSelection") {
//       var selectedText = window.getSelection().toString().trim();
//       if (selectedText) {
//         chrome.runtime.sendMessage({ action: "selectedText", text: selectedText });
//       }
//     }
//   });