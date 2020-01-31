"use strict";

import { tempdir } from "shelljs";

export const mapper = {

  parseIncomingData(data) {
    var parsedData = {};
    var todos = [];
    var inProgress = [];
    var done = [];

    data.forEach(e => {        
      if (e.type.toUpperCase() === "TODO") {
        todos.push({ id: e._id, text: e.text });
      } else if (e.type.toUpperCase() === "DONE") {
        done.push({ id: e._id, text: e.text });
      } else if (e.type.toUpperCase() === "INPROGRESS") {
        inProgress.push({ id: e._id, text: e.text });
      }
    });

    parsedData.todo = todos;
    parsedData.inProgress = inProgress;
    parsedData.done = done;

    return parsedData;
  },

  parseNewItem(item) {      
      var newItem = { id: item._id, text: item.text };      

      return newItem;      
  }
};
