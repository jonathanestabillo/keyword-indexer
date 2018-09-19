'use strict';

// Parse the embedded text
module.exports.exec = (data, db) => {
    let indexes = {};
    let contents = db.keywords.find();
    let summary = {};
    let top5 = {};
    let limit = 5;
    let count = 0;

    // Return the full List of DB.
    summary.contents = contents;

    // Find instances of tags in the keyword store in the document.
    contents.forEach(content => {
        content.tags.forEach(tag => {
            let result = null;

            if(tag === 'IT' || tag === 'it'){
                result = (data.match(new RegExp(`\\bIT\\b`, 'g')) || []);
            }else{
                result = (data.match(new RegExp(`\\b${tag}\\b`, 'gi')) || []);
            }
            
            if (result.length != 0) {
                indexes[tag] = result.length;
            }
        });
    });


    // Get the top 5 tags in descending order.
    let entries = Object.entries(indexes);
    let sorted = entries.sort((a, b) => b[1] - a[1]);
    
    summary.keywords = [];

    sorted.forEach(sort =>{
        if(count < limit){
            count ++;
            top5[sort[0]] = sort[1];
        }
    });

    summary.top5 = top5;

    // Find the indexes of the tags that were found and their occurences.
    entries.find(key => {
      let index = [];

      contents.find(obj => {
        obj.tags.find(tag => {
          if(tag === key[0]){
            index.push(obj.index);
          }
        });
      });

      let keyword = {
        tag: key[0],
        occurance: key[1],
        indexes: index
      };

      summary.keywords.push(keyword);


    });

    return summary;
};