'use strict';

window.onload = function() {
    loadLinks();
}

// loads all keys and makes them links
function loadLinks() {
    chrome.storage.sync.get(null, function(items) {
        for (let item in items) {
            makeLink(items[item]);
        }
    });
}

function clearLinks() {
    var myNode = document.getElementById("stuff");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

// takes key and makes link and adds to list
function makeLink(data) {
    let link = document.createElement("p");
    let name = data[0];
    link.innerText = name + ": " + "Chapter " + data[1] + " Page " + data[2];
    link.setAttribute("class", "options");
    link.onclick = function() {
      chrome.storage.sync.remove([name], function() {
         alert("Removed " + name);
         clearLinks();
         loadLinks();
      });
    }
    document.getElementById("stuff").appendChild(link);
}

// shows nipple
document.getElementById('show').onclick = function() {
    document.getElementById('nipple').style.display = "inline";
}