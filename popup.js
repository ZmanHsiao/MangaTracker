'use strict';

let url;
let rightDomain = false;
let activeurl;

window.onload = function() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        url = tabs[0].url;
        activeurl = new URL(url);
        if (activeurl.hostname === "www.mangareader.net") {
            rightDomain = true;
        }
    });
    loadLinks();
}

// shows nipple
document.getElementById('show').onclick = function() {
    document.getElementById('nipple').style.display = "inline";
}

// saves URL to storage and adds to display lits
document.getElementById('save').onclick = function() {
    if (rightDomain === true) {
        let path = activeurl.pathname.split("/");
        if (path.length > 2) {
            let name = path[1].toUpperCase();
            let data = [name, path[2], 1, url]; // name, chapter, page, url
            if (path.length > 3) {
                data[2] = path[3]; // if not on first page of chapter
            }
            chrome.storage.sync.set({[name]: data}, function() { // stores web page on load
                console.log("stored url: " + url);
                clearLinks();
                loadLinks();
            });
        } else {
            alert("Must be on a Manga Page");
        }
    } else {
        alert("Only works on MangaReader");
    }
}

// loads all keys and makes them links
function loadLinks() {
    chrome.storage.sync.get(null, function(items) {
        // let keys = Object.keys(items);
        // keys.forEach(function(key) {
        //     makeLink(key);
        // });
        for (let item in items) {
            makeLink(items[item]);
        }
    });
}

// takes key and makes link and adds to list
function makeLink(data) {
    let link = document.createElement("a");
    link.href = data[3];
    link.innerText = data[0] + ": " + "Chapter " + data[1] + " Page " + data[2];
    link.setAttribute("target", "_blank");
    document.getElementById("stuff").appendChild(link);
}

// clears all stored info
document.getElementById('clear').onclick = function() { // clears all stored information
    chrome.storage.sync.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
        clearLinks();
    });
}

function clearLinks() {
    var myNode = document.getElementById("stuff");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}