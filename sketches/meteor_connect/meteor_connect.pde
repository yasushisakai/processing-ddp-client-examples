/**
* meteor_connect.pde
*
* Meteor App Connection
* written using processing 2.2.1
* 1/1/16
* 
* The MIT License (MIT)
*
* Copyright (c) 2016 Yasushi Sakai
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
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

