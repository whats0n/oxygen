var fps = { 
  startTime : 0, 
  frameNumber : 0, 
  getFPS : function() { 
    this.frameNumber++; 
    var d = new Date().getTime(), 
      currentTime = ( d - this.startTime ) / 1000, 
      result = Math.floor( ( this.frameNumber / currentTime ) ); 
    if( currentTime > 1 ) { 
      this.startTime = new Date().getTime(); this.frameNumber = 0; 
    } return result; 
  } 
};

let bbb = 0;
let timeOut;
function gameLoop() { 
  timeOut = setTimeout( gameLoop,1000 / 60 ); 
  bbb = fps.getFPS();
}
window.onload = gameLoop;
$(document).ready(function() {

  setTimeout(function() {
    alert(bbb);
    if (bbb<60) {
      clearTimeout(timeOut);
    }
  }, 3000);
});

import common from './_common';
import { DOC } from './_constants';

DOC.ready(common);


