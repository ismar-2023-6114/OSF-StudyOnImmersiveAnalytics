function RemoveElements(timeout){
    setTimeout(function() {
        // do something 1000ms later here.
        var el_facetby = document.querySelector("#app > section > div > div.sanddance-main.pinned > div.sanddance-sidebar.calculator.pinned > div > div.scrollable-container > div > div > div > div:nth-child(2) > div.group-body > div > div:nth-child(6)")
        var el_facetlayout = document.querySelector("#app > section > div > div.sanddance-main.pinned > div.sanddance-sidebar.calculator.pinned > div > div.scrollable-container > div > div > div > div:nth-child(2) > div.group-body > div > div:nth-child(7)")
        var el_zgrounded = document.querySelector("#app > section > div > div.sanddance-main.pinned > div.sanddance-sidebar.calculator.pinned > div > div.scrollable-container > div > div > div > div:nth-child(3) > div.group-body > div:nth-child(2)")
        
        if (el_facetby != null)
            el_facetby.remove();
        
        if (el_facetlayout != null)
            el_facetlayout.remove();

        if (el_zgrounded != null)
            el_zgrounded.remove();

    }, timeout); 
}

RemoveElements(2000)

var filtered = document.querySelector("#app > section > div > div.sanddance-main.pinned > div.sanddance-sidebar.calculator.pinned > div > div.sanddance-datascope.extended > div > div.datascope-buttons > button:nth-child(2) > span > span > div > div")
var selected = document.querySelector("#app > section > div > div.sanddance-main.pinned > div.sanddance-sidebar.calculator.pinned > div > div.sanddance-datascope.extended > div > div.datascope-buttons > button:nth-child(3) > span > span > div > div")

var prev_filtered = 0
var prev_selected = 0

function UpdatePrevious(curr_filtered, curr_selected){
    prev_filtered = curr_filtered
    prev_selected = curr_selected
}

function EventHandler(){
    curr_filtered = parseInt(filtered.textContent)
    curr_selected = parseInt(selected.textContent)

    if(prev_filtered == curr_filtered && prev_selected != curr_selected && curr_selected == 0)
        console.log("dalu," + Date.now() + ",Filtering,StopSelecting")

    UpdatePrevious(curr_filtered, curr_selected)
}

var observer = new MutationObserver(
    function (mutations) {
        EventHandler()
    }
);

var config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
};

setTimeout(function() {
    observer.observe(filtered, config);
    observer.observe(selected, config);
}, 2000); 



setTimeout(function() {

    var point_size_div = document.querySelector("#app > section > div > div.sanddance-main.pinned > div.sanddance-sidebar.calculator.pinned > div > div.scrollable-container > div > div > div > div:nth-child(3) > div.group-body > div:nth-child(1) > div > div > label")

    var observer_point_scale = new MutationObserver(
        function (mutations) {
            console.log("dalu," + Date.now() + ",PointScaleChange," + point_size_div.textContent)
        }
    );

    observer_point_scale.observe(point_size_div, config);
}, 2000); 


var chart_button = document.querySelector("#app > section > div > div.sanddance-main.pinned > div.sanddance-sidebar.calculator.pinned > div > div.vbuttons > div.sidebar-dialogs > div.vbutton.selected > button")
chart_button.setAttribute("onclick","RemoveElements(0)");

document.body.setAttribute("oncontextmenu", "return false")




var el_topbar = document.querySelector("#app > section > div > div.sanddance-explorer-topbar > div.sanddance-explorer-commandbar > div > div > div > div > div.ms-OverflowSet.ms-CommandBar-primaryCommand.primarySet-44");
        
let lbl = document.createElement("label");
lbl.style.backgroundColor = "white";
lbl.style.display = "flex";
lbl.style.alignItems = "center";
lbl.style.padding = "0px 10px 0px 20px"
let txt = document.createElement("input");
let btn1 = document.createElement("button");
let btn2 = document.createElement("button");
let btn3 = document.createElement("button");
let btn4 = document.createElement("button");
let btn5 = document.createElement("button");

lbl.innerHTML = "Id:";
btn1.innerHTML = "Save Task 1";
btn2.innerHTML = "Save Task 2";
btn3.innerHTML = "Save Task 3";
btn4.innerHTML = "Save Task 4";
btn5.innerHTML = "Save Task 5";



el_topbar.appendChild(lbl);
el_topbar.appendChild(txt);
el_topbar.appendChild(btn1);
el_topbar.appendChild(btn2);
el_topbar.appendChild(btn3);
el_topbar.appendChild(btn4);
el_topbar.appendChild(btn5);


var oldLog = console.log;
var messages = [];

console.log = function(msg) {
    messages.push(msg);
    oldLog.apply(null, arguments);
}

function saveToFile(data, filename){

    if(!data) {
        console.error('Console.save: No data')
        return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
 }

function savelog(n){
    //console.log(messages)
    var text_log = "";
    messages.forEach(function(element) {
        if(element.includes("dalu")) 
            text_log = text_log + element + "\n";
    });
    saveToFile(text_log, txt.value + "-" + n + ".log")
    messages = [];
}

btn1.setAttribute("onClick", "savelog(1)");
btn2.setAttribute("onClick", "savelog(2)");
btn3.setAttribute("onClick", "savelog(3)");
btn4.setAttribute("onClick", "savelog(4)");
btn5.setAttribute("onClick", "savelog(5)");