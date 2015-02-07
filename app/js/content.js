function doThing() {
  var myid = chrome.runtime.id;
  var myimg = "chrome-extension://" + myid + "/resources/img/test1.jpeg";
  var images = document.getElementsByTagName('img');
  var changeIdx = Math.floor(Math.random() * images.length);
  images[changeIdx].src = myimg;
}

var timeout = Math.floor(Math.random() * 3000);
jQuery("#tem_forma").hide();
setTimeout( function() { doThing(); }, timeout);
