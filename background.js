// background.js


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            let url = tabs[0].url;
            let activeurl = new URL(url);
            if (activeurl.hostname === "www.mangareader.net") {
                saveManga(url,activeurl);
            }
        });
    }
});

function saveManga(url, activeurl) {
    let path = activeurl.pathname.split("/");
    if (path.length > 2) {
        let name = path[1].toUpperCase().replace(/-/g, " ");
        let data = [name, path[2], 1, url]; // name, chapter, page, url
        if (path.length > 3) {
            data[2] = path[3]; // if not on first page of chapter
        }
        chrome.storage.sync.get([name], function(check) {
            if (typeof check[name] != 'undefined') {
                chrome.storage.sync.set({[name]: data}, function() { // stores web page on load
                    console.log("saved page");
                });
            }
        });

    }
}