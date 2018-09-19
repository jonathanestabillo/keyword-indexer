'use strict';
const indexIpcMain = require('electron').ipcMain;


indexIpcMain.on('req-parse-document', (event, arg) => {
  event.sender.send('res-parse-document', parser.exec(arg, db));
});

indexIpcMain.on('req-parse-keywordlist', (event, arg) => {
  let contents =  db.keywords.find();
  let summary = {};

  summary.contents = contents;

  event.sender.send('res-parse-keywordlist',summary);
  
});

indexIpcMain.on('req-get-index', (event, indexid) => {
  event.sender.send('res-get-index',indexid);
});

indexIpcMain.on('req-set-index', (event, obj) => {
  event.sender.send('res-set-index',obj);
});

indexIpcMain.on('req-get-tag', (event,obj) => {
  event.sender.send('res-get-tag',obj);
});

indexIpcMain.on('req-set-tag', (event,obj) => {
  event.sender.send('res-set-tag',obj);
});

indexIpcMain.on('req-parse-keywordlist', (event, arg) => {
  event.sender.send('res-parse-keywordlist', parser.exec(arg, db));
});

indexIpcMain.on('req-add-index', (event,arg) => {

  var obj={
    index: arg,
    tags:[]
  }

  db.keywords.save(obj);

  event.sender.send('res-add-index');
});

indexIpcMain.on('req-update-index', (event,arg) => {

  var query = {
    _id: arg._pIndexID
  }

  var newdata = {
      index: arg._inputUpdateIndex
  }

  var option = {
      multi: false,
      upsert: false
  }

  //assuming this is new data
  db.keywords.update(query,newdata,option);

  event.sender.send('res-update-index');
});

indexIpcMain.on('req-remove-index', (event,arg) => {

  db.keywords.remove({_id:arg},true);

  event.sender.send('res-remove-index');
});

indexIpcMain.on('req-add-tag', (event,arg) => {

  let insertTag = db.keywords.find({_id:arg._pIndexID});
  let tagList = [];

  insertTag.forEach(content => {
    content.tags.forEach(tag => {
      tagList.push(tag);
    });
    content.tags.push(arg._inputAddTag);
    tagList.push(arg._inputAddTag);
  });
  
  var query = {
    _id: arg._pIndexID
  }

  var updatequery = {
    tags: tagList
  }

  var option = {
      multi: false,
      upsert: false
  }

  var res =  db.keywords.update(query,updatequery,option);
  event.sender.send('res-add-tag');
});

indexIpcMain.on('req-update-tag', (event,arg) => {

  let result = db.keywords.find({_id: arg._pIndexID});
  let tagList = [];

  result.forEach(content => {
    content.tags.forEach(tag => {
      tagList.push(tag);
    })
  })

  var i;
  for (i = 0; i < tagList.length; i++){
    if (tagList[i] === arg._pTagName)
    {
      tagList[i] = arg.__inputUpdateTag;
    }
  }

  var query = {
    _id: arg._pIndexID
  }

  var updatequery = {
    tags: tagList
  }

  var option = {
      multi: false,
      upsert: false
  }

  //assuming this is new data
  db.keywords.update(query,updatequery,option);
  
  event.sender.send('res-update-tag');
});

indexIpcMain.on('req-remove-tag', (event,arg) => {

  let result = db.keywords.find({_id: arg._pIndexID});  
  let tagList = [];

  result.forEach(content => {
    content.tags.forEach(tag => {
      tagList.push(tag);
    });
  });

  var i;

  for (i = 0; i < tagList.length; i++){
    if (tagList[i] === arg._pTagName)
    {
      tagList.splice(i,1);
    }
  }

  var query = {
    _id: arg._pIndexID
  }

  var updatequery = {
    tags: tagList
  }

  var option = {
      multi: false,
      upsert: false
  }

  //assuming this is new data
  db.keywords.update(query,updatequery,option);
  
  event.sender.send('res-remove-tag');
});

