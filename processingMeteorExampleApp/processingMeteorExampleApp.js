/*

 processingMeteorExampleApp.js
 Meteor App Communicating with processing

 The MIT License (MIT)

 Copyright (c) 2016 Yasushi Sakai

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/

DBCollection = new Mongo.Collection("data");

//
// Client side (browser)
//
if (Meteor.isClient) {
  Meteor.subscribe("data");

  Meteor.startup(function(){
    Meteor.call("addDatum","browser","startup");
  });

  Template.body.helpers({

    title:function(){
      return 'Processing-Meteor Sample App';
    },

    data: function(){
      return DBCollection.find({},{sort:{createdAt:-1}});
    }
  });

  Template.body.events({
    "submit .new-data":function(event){
      event.preventDefault();
      var text = event.target.text.value;
      Meteor.call("addDatum","browser",text);
      event.target.text.value = "";
    },

    "click .delete-button":function(){
      Meteor.call("deleteAllBrowser");
    }
  });
}


//
// Server side
//
if (Meteor.isServer) {

  Meteor.startup(function(){
    // clean up everthing
    Meteor.call("deleteAllServer");
    Meteor.call("addDatum","server","startup");
  });

  Meteor.publish("data",function(){
    return DBCollection.find();
  });

}


//
// Methods
//
Meteor.methods({
  addDatum: function (origin,text) {
    DBCollection.insert({
      origin:origin,
      text:text,
      createdAt: new Date()
    });
  },

  deleteAllBrowser:function(){
    DBCollection.remove({origin:"browser"});
  },

  deleteAllServer:function(){
    DBCollection.remove({origin:"server"});
  },

  deleteAllProcessing:function(){
    DBCollection.remove({origin:"processing"});
  },
  deleteOne:function(id){
    DBCollection.remove({_id:id});
  }
});