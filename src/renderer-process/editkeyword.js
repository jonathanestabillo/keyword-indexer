'use strict';
const indexIpcRenderer = require('electron').ipcRenderer;
const tbodyIndexList = document.getElementById('tbl_indexlist');

$( document ).ready(function() {
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    indexIpcRenderer.send('req-parse-indexinfo', id);
});

indexIpcRenderer.on('res-parse-indexinfo', (event, arg) => {

    let topTitleContent = '';
    let titleContent = '';
    let botTitleContentContent = '';
    let topTagContent = '';
    let tagContent = '';
    let botTagContentContent = '';

    let IndexId = 0;

    topContent += '<tr> ';
    topContent += '<td> ';
    topContent += '<button type=\"button\" class=\"btn btn-outline-info mb-2 mt-2\" data-toggle=\"collapse\" ';

    topTitleContent = '<div class="input-group-prepend">';




    arg.contents.forEach(content => {
        indexContent += topContent;
        indexContent += 'data-target=\"#IndexList' + IndexId.toString() + '\" ';
        indexContent += 'aria-expanded=\"false\" aria-controls=\"IndexList' + IndexId.toString() + '\">';
        indexContent += content.index;
        indexContent += '</button>';

        // now for its tags

        indexContent += '<div class=\"collapse\" id=\"IndexList' +  IndexId.toString() + '\"> ';
        indexContent += '<div class=\"card card-body\"> ' ;
        indexContent += '<ul class="list-group"> ';
                
        content.tags.forEach(tag => {
            indexContent += '<li class=\"list-group-item\">' + tag + '</li> ';
        })

        botContent = '<td> ';
        botContent += '<p class=\"float-right\"> ';
        botContent += '<a href=\"editkeyword.html\" class=\"btn btn-outline-primary mt-2\">Edit</a> ';
        botContent += '<a href="keywordlist.html" onclick="deleteIndex(\'' + content.index + '\')" class=\"btn btn-primary mt-2\">Delete</a> ';
        botContent += '</p> </td> </tr> ';

        indexContent += botContent;

        IndexId += 1;
    })

    tbodyIndexList.innerHTML = indexContent;
});

let ifWindowOpen = (win) => {
  if (win != null) {
    return true;
  } else {
    return false;
  }
}