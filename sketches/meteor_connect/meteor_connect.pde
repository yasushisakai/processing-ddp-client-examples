/*
* meteor_connect.pde
* 
* Meteor Application Connection
*
* Yasushi Sakai 12/31/15
* (c) Massachusetts Institute of Technology 2015
*
* This work may be reproduced, modified, distributed,
* performed, and displayed for any purpose. Copyright is
* retained and must be preserved. The work is provided
* as is; no warranty is provided, and users accept all 
* liability.
*
* Processing 2.2.1
*
* Target Meteor App can be obtained at
* https://github.com/yasushisakai/Sample-Meteor-Processing
*/

import ddpclient.*;
import org.java_websocket.client.WebSocketClient;
import com.google.gson.Gson;

import java.net.URISyntaxException;

DDPClient client;
DDPObserver observer;

void setup() {

  size(640, 480);

  try {
    client = new DDPClient(this, "localhost", 3000);

    observer = new DDPObserver(this);
    client.addObserver(observer);
    //client.toggleDebug();
    
  }catch(URISyntaxException e) {
    println(e.getReason());
  }

  client.subscribe("data", new Object[] {}, observer);
  client.call("addDatum", new Object[] {"processing", "startup"}, observer);

  noLoop();
}

// empty draw necessary even if we "noLoop()"
void draw() {
}

void mousePressed() {
  client.call("deleteAllProcessing", new Object[] {}, observer);
}

