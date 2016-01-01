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