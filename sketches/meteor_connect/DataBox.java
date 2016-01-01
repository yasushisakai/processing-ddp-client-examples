/*
* DataBox.java
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
*
* Target Meteor App can be obtained at
* https://github.com/yasushisakai/Sample-Meteor-Processing
*/
import processing.core.*;

public class DataBox {

  public final static int SIZE = 8;
  public final static int MARGIN = 10;
  public final static int PADDING = 2;
  private static int row = 0;
  public static int box_num = 0;

  private static PApplet parent;  
  public static void setParent(PApplet _parent){
    parent = _parent;
    
    // set row fron parent PApplet
    row = (parent.width-(MARGIN*2))/(SIZE+PADDING);
  }

  public static int getRow() {
    return row;
  }
  
  public enum BoxType {
    SERVER, BROWSER, SKETCH, UNKNOWN,
  };
  
  private BoxType type;
  private String uid; // Mongo id's are UIDs
  private int id;
  private String text;
  public boolean isFocus;

  public DataBox(String _uid, String _type, String _text) {
    //parent = _parent;
    uid = _uid;
    id = box_num;

    if (_type.equals("server")) type=BoxType.SERVER;
    else if (_type.equals("browser")) type=BoxType.BROWSER;
    else if (_type.equals("processing")) type=BoxType.SKETCH;
    else type=BoxType.UNKNOWN;

    text = _text;
    isFocus = false;

    box_num ++;
  }

  public boolean checkUID(String _uid) {
    return uid.equals(_uid);
  }

  public void draw() {
    parent.noStroke();

    if (isFocus) parent.stroke(255);
    switch(type) {
    case SERVER:
      parent.fill(255, 0, 0);
      break;
    case BROWSER:
      parent.fill(0, 0, 255);
      break;
    case SKETCH:
      parent.fill(0, 255, 0);
      break;
    case UNKNOWN:
      parent.fill(120);
      break;
    }
    parent.rect(0, 0, SIZE, SIZE);
  }

  public String toString() {
    return "<DataBox id: "+uid+", text: "+text+">";
  }
  
}

