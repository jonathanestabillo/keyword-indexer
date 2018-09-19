'use strict';
const indexIpcRenderer = require('electron').ipcRenderer;

function addIndex()
{

    indexIpcRenderer.send('req-add-index', indexname);
}

function updateIndexTag(indexname,tagname,Newtagname)
{
    indexIpcRenderer.send('req-update-keywordlist', indexname);
}

function deleteIndex(indexname)
{
    indexIpcRenderer.send('req-remove-keywordlist', indexname);
}

function getIndex(indexid,inputvalue)
{
    indexIpcRenderer.send('req-get-index', indexid);
    indexIpcRenderer.send('req-set-index', inputvalue);
}

function getTagIndex(indexid,tagname,inputvalue)
{
    indexIpcRenderer.send('req-get-tag', tagname);
    indexIpcRenderer.send('req-set-tag', inputvalue);
    indexIpcRenderer.send('req-get-index', indexid);
}

let ifWindowOpen = (win) => {
  if (win != null) {
    return true;
  } else {
    return false;
  }
}