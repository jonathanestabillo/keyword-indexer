'use strict';
const indexIpcRenderer = require('electron').ipcRenderer;
const btnSearch = document.getElementById('btn_search');
const txtDocument = document.getElementById('txt_document');
const tblResult = document.getElementById('tbl_tags_occurence_indexes');
const tblTopResult = document.getElementById('tbl_top');
//const tbodyIndexList = document.getElementById('tbl_IndexList');
const divIndexList = document.getElementById('div_index_list');
const keywordList = document.getElementById('accordionKeywordList');

//modal buttons
const btnAddIndex = document.getElementById('btn_add_index');
const btnUpdateIndex = document.getElementById('btn_update_index');
const btnRemoveIndex = document.getElementById('btn_remove_index');
const btnAddTag = document.getElementById('btn_add_tag');
const btnUpdateTag = document.getElementById('btn_update_tag');
const btnRemoveTag = document.getElementById('btn_remove_tag');

//modal input box
const inputAddIndex = document.getElementById('input_add_index');
const inputUpdateIndex = document.getElementById('input_update_index');
const inputAddTag = document.getElementById('input_add_tag');
const inputUpdateTag = document.getElementById('input_update_tag');

//hidden paragraph
const pIndexID = document.getElementById('index_id');
const pTagName = document.getElementById('tag_name');
const pDocumentResult = document.getElementById('p_con_content');

$( document ).ready(function() {
  indexIpcRenderer.send('req-parse-keywordlist', ' ');

  // comment by elmer
  // $('.tree').treegrid({
  //   expanderExpandedClass: 'glyphicon glyphicon-minus',
  //   expanderCollapsedClass: 'glyphicon glyphicon-plus'
  // });

});

btnSearch.addEventListener('click', (event) => {
  indexIpcRenderer.send('req-parse-document',txtDocument.value);
});

btnAddIndex.addEventListener('click', (event) => {

  indexIpcRenderer.send('req-add-index',inputAddIndex.value);
});

btnUpdateIndex.addEventListener('click', (event) => {

  let obj = {
    _pIndexID: pIndexID.innerHTML,
    _inputUpdateIndex: inputUpdateIndex.value
  }

  indexIpcRenderer.send('req-update-index',obj);
});

btnRemoveIndex.addEventListener('click', (event) => {
  indexIpcRenderer.send('req-remove-index',pIndexID.innerHTML);
});

btnAddTag.addEventListener('click', (event) => {

  let obj = {
    _pIndexID: pIndexID.innerHTML,
    _inputAddTag: inputAddTag.value
  }

  indexIpcRenderer.send('req-add-tag',obj);
});

btnUpdateTag.addEventListener('click', (event) => {

  let obj = {
    _pIndexID: pIndexID.innerHTML,
    _pTagName: pTagName.innerHTML,
    __inputUpdateTag: inputUpdateTag.value
  }

  indexIpcRenderer.send('req-update-tag',obj);
});

btnRemoveTag.addEventListener('click', (event) => {

  let obj = {
    _pIndexID: pIndexID.innerHTML,
    _pTagName: pTagName.innerHTML

  }

  indexIpcRenderer.send('req-remove-tag',obj);
});

indexIpcRenderer.on('res-parse-keywordlist', (event, arg) => {
  let indexContent = '';
  let tagContent = '';
  let parent_id = 1;
  let child_id = 1;
  let tableBody = '';

  //added by elmer
  let indexCardContent = '';
  let tagCardContent = '';
  let indexCollapseId = 1;
  let tagCollapseChild = 1;

  arg.contents.forEach(content => {
    indexCardContent += '<div class="card">';
    indexCardContent += '<div class="keyword-card-header" id="heading' + indexCollapseId + '">';
    indexCardContent += '<div class="col-lg-12"><div class="row">';
    indexCardContent += '<div class="col-lg-6"><h6 class="mb-0">';
    indexCardContent += '<a class="text-dark" data-toggle="collapse" href="#collapse' + indexCollapseId + '" aria-expanded="true" aria-controls="collapse' + indexCollapseId + '">';
    indexCardContent += '<i class="fas fa-caret-down"></i> ';
    indexCardContent += content.index + '</a></h6></div>';
    indexCardContent += '<div class="col-lg-6">';
    indexCardContent += '<button onclick="getIndex(\'' + content._id  + '\',\'\')" type="button" class="btn btn-custom float-right" data-toggle="modal" data-target="#deleteIndexModal"><i class="fas fa-trash"></i></button> ';
    indexCardContent += '<button onclick="getIndex(\'' + content._id  + '\',\'' + content.index + '\')" type="button" class="btn btn-custom float-right" data-toggle="modal" data-target="#updateIndexModal"><i class="fas fa-edit"></i></button> ';
    indexCardContent += '<button onclick="getTagIndex(\'' + content._id + '\',\'\',\'\')" id="btn_add_tag" type="button" class="btn btn-custom float-right" data-toggle="modal" data-target="#addTagModal"><i class="fas fa-plus"></i></button>';
    indexCardContent += '</div></div></div></div>';

    tagCardContent += '<div id="collapse' + indexCollapseId + '" class="collapse multi-collapse" aria-labelledby="heading' + indexCollapseId + '" >';
    tagCardContent += '<div class="card-body">';
    tagCardContent += '<div class="col-lg-12">';
    tagCardContent += '<table class="table table-sm table-borderless">';
    tagCardContent += '<thead class="thead-dark"><tr><tr></thead>';
    tagCardContent += '<tbody>';

    content.tags.forEach(tag => {
      tagCardContent += '<tr><td>';
      tagCardContent += '<label class="align-middle"><i class="fas fa-tag"></i> ' + tag + '</label>';
      tagCardContent += '<button onclick="getTagIndex(\'' + content._id + '\',\'' + tag + '\',\'\')" id="btn_delete_tag" type="button" class="btn btn-custom float-right" data-toggle="modal" data-target="#deleteTagModal"><i class="fas fa-trash"></i></button>';
      tagCardContent += '<button onclick="getTagIndex(\'' + content._id + '\',\'' + tag + '\',\'' + tag + '\')" id="btn_edit_tag" type="button" class="btn btn-custom float-right" data-toggle="modal" data-target="#updateTagModal"><i class="fas fa-edit"></i></button>';
      tagCardContent += '</td></tr>';
    });
    
    tagCardContent += '</tbody></table></div></div></div>';
    indexCardContent += tagCardContent;
    indexCardContent += '</div>';
    indexCollapseId += 1;
    tagCardContent = '';
  });

  keywordList.innerHTML = indexCardContent;
});

btnSearch.addEventListener('click', (event) => {
  indexIpcRenderer.send('req-parse-document', txtDocument.value);

});

indexIpcRenderer.on('res-get-index',(event,indexname) => {
  pIndexID.innerHTML = indexname;
})

indexIpcRenderer.on('res-set-index',(event,inputvalue) => {
  inputAddIndex.value = inputvalue;
  inputUpdateIndex.value = inputvalue;
})

indexIpcRenderer.on('res-get-tag',(event,tagname) => {
  pTagName.innerHTML = tagname;
})

indexIpcRenderer.on('res-set-tag',(event,inputvalue) => {
  inputAddTag.value =inputvalue;
  inputUpdateTag.value = inputvalue;
})


indexIpcRenderer.on('res-add-index',(event) => {
  indexIpcRenderer.send('req-parse-keywordlist', ' ')
})

indexIpcRenderer.on('res-update-index',(event) => {
  indexIpcRenderer.send('req-parse-keywordlist', ' ')
})

indexIpcRenderer.on('res-remove-index',(event) => {
  indexIpcRenderer.send('req-parse-keywordlist', ' ')
})

indexIpcRenderer.on('res-add-tag',(event) => {
  indexIpcRenderer.send('req-parse-keywordlist', ' ')
})

indexIpcRenderer.on('res-update-tag',(event) => {
  indexIpcRenderer.send('req-parse-keywordlist', ' ')
})

indexIpcRenderer.on('res-remove-tag',(event) => {
  indexIpcRenderer.send('req-parse-keywordlist', ' ')
})


indexIpcRenderer.on('res-parse-document', (event, arg) => {
  let tagsContent = '';
  let topContent = '';
  let tags = [];

  arg.keywords.forEach(key => {
    tagsContent += "<tr>";
    tagsContent += `<td>${key.tag}</td><td>${key.occurance}</td>`;
    tagsContent += '<td>';
    
    key.indexes.forEach(index => {
      tagsContent += `${index}<br/>`
    });
    
    tagsContent += '</td></tr>';

    tags.push(key.tag.toLowerCase());
  });

  if(tags.length > 0) {
    $("#txt_document").hide();
    $("#p_con_content_parent").show();
    pDocumentResult.innerText = txtDocument.value;
 
    tags.forEach(tag => {
      $('#p_con_content').highlight(tag,{
        wholeWord: true, // or false
        ignoreCase: true, // or false
        background: "#ffff00",
        color: "#000",
        bold: false
      });
    });
  }

  let topArr = Object.entries(arg.top5);
  
  topArr.forEach(key => {
    topContent += "<tr>";
    topContent += `<td>${key[0]}</td><td>${key[1]}</td>`;
    topContent += '</td></tr>';
  });

  tblResult.innerHTML = tagsContent;
  tblTopResult.innerHTML = topContent;
});

let ifWindowOpen = (win) => {
  if (win != null) {
    return true;
  } else {
    return false;
  }
}
