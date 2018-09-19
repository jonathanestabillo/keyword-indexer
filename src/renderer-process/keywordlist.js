'use strict';
const indexIpcRenderer = require('electron').ipcRenderer;
const tbodyIndexList = document.getElementById('tbl_indexlist');

$( document ).ready(function() {
    indexIpcRenderer.send('req-parse-keywordlist', ' ')
});

indexIpcRenderer.on('res-parse-keywordlist', (event, arg) => {
    let topContent = '';
    let indexContent = '';
    let botContent = '';
    let IndexId = 0;

    topContent += '<tr> ';
    topContent += '<td> ';
    topContent += '<button type=\"button\" class=\"btn btn-outline-info mb-2 mt-2\" data-toggle=\"collapse\" ';


    let indexContent = '';
    let tagContent = '';
    let parent_id = 1;

    arg.contents.forEach(content => {
        indexContent += '<tr class="treegrid-' + parent_id.toString + '"> ';
        indexContent += '<td class="align-middle"><b>' + content.index + '</b></td> ';
        indexContent += '<td> ';
        indexContent += '<button id="btn_add_tag" onclick="getIndex(\'' + context._id  + '\')" type="button" class="btn btn-custom float-right" data-toggle="modal" data-target="#addTagModal"><i class="fas fa-plus"></i></button>  ';
        indexContent += '<button id="btn_delete_tag" onclick="getIndex(\'' + context._id  + '\')" type="button" class="btn btn-custom float-right" data-toggle="modal" data-target="#deleteIndexModal"><i class="fas fa-trash"></i></button> ';
        indexContent += '<button id="btn_edit_tag" onclick="getIndex(\'' + context._id  + '\')" type="button" class="btn btn-custom float-right" data-toggle="modal" data-target="#updateIndexModal"><i class="fas fa-edit"></i></button> ';
        indexContent += '</td></tr> ';

        tagContent = '';

        content.tags.forEach(tag => {
            tagContent +='<tr class="treegrid-parent-' + parent_id + '"> ';
            tagContent += '<td> ';
            tagContent += '<label class="align-middle"><i class="fas fa-tag"></i>' + tag + '</label> ';
            tagContent += '<button id="btn_delete_tag" onclick="getTagIndex(\'' + content._id + '\',\'' + tag + '\')" type="button" class="btn btn-custom float-right" data-toggle="modal" data-target="#deleteTagModal"><i class="fas fa-trash"></i></button>  ';
            tagContent += '<button id="btn_edit_tag" onclick="getTagIndex(\'' + content._id + '\',\'' + tag + '\')" type="button" class="btn btn-custom float-right" data-toggle="modal" data-target="#updateTagModal"><i class="fas fa-edit"></i></button> ';
            tagContent += '</td> ';
            tagContent += '</tr> ';
        })

        indexContent += tagContent;
        parent_id +=1;

    })


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
        botContent += '<a href=\"editkeyword.html/?id=' + content._id + '" class=\"btn btn-outline-primary mt-2\">Edit</a> ';
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