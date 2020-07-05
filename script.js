window.addEventListener('load', function(){
    document.getElementById('sampleeditor').setAttribute('contenteditable', 'true');
});

var saveTextEditor = [];
var redoTextEditor = "";
var divToolBar = document.getElementById('toolbar');
var linkBold = document.getElementById('bold');
var controlLinkBold = false;

var linkItalic = document.getElementById('italic');
var controlLinkItalic = false;

var linkUnderline = document.getElementById('underline');
var controlLinkUnderline = false;

var linkLink = document.getElementById('link');
var controlLinkLink = false;

var linkList = document.getElementById('list');
var controlLinkList = false;

var undoComponent = document.getElementById('undo');
var redoComponent = document.getElementById('redo');

var divUrlElement = document.createElement('div');
var inputUrlElement = document.createElement('input');
var inputButElement = document.createElement('input');    
UrlDefaultStyles();
divUrlElement.appendChild(inputUrlElement);
divUrlElement.appendChild(inputButElement);
divToolBar.appendChild(divUrlElement);


linkList.addEventListener('click', function() {
    controlLinkList = controlColor(linkList, controlLinkList);
});

linkBold.addEventListener('click', function() {
    controlLinkBold = controlColor(linkBold, controlLinkBold);
});

linkLink.addEventListener('click', function() {
    controlLinkLink = controlColor(linkLink, controlLinkLink);
    if(controlLinkLink)
    {
        divUrlElement.style.paddingTop = "5px";
        divUrlElement.style.paddingBottom = "5px";
        
        inputButElement.setAttribute('type', 'button');
        inputButElement.setAttribute('onclick','setUrl()');
        inputButElement.style.height = "18px";
        inputButElement.style.width = "50px";

        
        inputUrlElement.setAttribute('type', 'text');
        inputUrlElement.style.height = "16px";
    }
    else
    {
        UrlDefaultStyles();        
    }    
});


linkUnderline.addEventListener('click', function() {
    controlLinkUnderline = controlColor(linkUnderline, controlLinkUnderline);
});

linkItalic.addEventListener('click', function() {
    controlLinkItalic = controlColor(linkItalic, controlLinkItalic);
});

function controlColor (param, control){
    if(!control)
    {
        param.style.color = "red";
        control = true;   
    }
    else
    {
        param.style.color = "black";   
        control = false;
    }
    return control;
}

function format(command, value) {
    document.execCommand(command, false, value);
}

//visibilidade da barra de embed url
function UrlDefaultStyles (){
    divUrlElement.style.padding = "0px";
    inputUrlElement.style.height = "0px";
    inputUrlElement.style.width = "500px"
    inputUrlElement.setAttribute('id', 'txtUrl');
    inputButElement.style.marginLeft = "5px";
    inputButElement.style.height = "0px";
    inputUrlElement.setAttribute('type', 'hidden')
    inputUrlElement.setAttribute('placeholder', 'Enter Url');
    inputButElement.setAttribute('type', 'hidden');
    inputButElement.setAttribute('value', 'Link');    
};

function setUrl() {
    var url = document.getElementById('txtUrl').value;
    var sText = document.getSelection();

    document.execCommand('insertHTML', false, '<a href="' + url + '" target="_blank">' + sText + '</a>');
    url.value = "";
    linkLink.style.color = "black";
    UrlDefaultStyles();
};

function saveText(event){
    if(event.keyCode == 8)
    {
        var TextEditor = document.getElementById('sampleeditor').innerHTML;
        saveTextEditor.push(TextEditor);
        undoComponent.style.color = "red";
        redoComponent.style.color = "black";
    }
    else if(event.keyCode == 13)
    {
        if(saveTextEditor.length != 0)
        {
            while(saveTextEditor.length)
                saveTextEditor.pop();
        }
        undoComponent.style.color = "black";
    }
};

function undo(){
    if(saveTextEditor.length)
    {
        document.getElementById('sampleeditor').innerHTML = saveTextEditor[0];
        console.log(saveTextEditor);
        redoTextEditor = saveTextEditor[saveTextEditor.length - 1];
        while(saveTextEditor.length)
            saveTextEditor.pop();
        if(!saveTextEditor.length)
        {
            undoComponent.style.color = "black";
            redoComponent.style.color = "red";
        }
            
    }
};

function redo(){
    document.getElementById('sampleeditor').innerHTML = redoTextEditor;
    redoComponent.style.color = "black";
    redoTextEditor = "";
}