function doThing(timeout, i) {
  console.log("Doing Thing.");
  var myid = chrome.runtime.id;
  var myimg = chrome.extension.getURL('resources/img/test1.jpeg');
  var images = document.getElementsByTagName('img');
  var changeIdx = Math.floor(Math.random() * images.length);
  images[changeIdx].src = myimg;

  if (i < 3*images.length) {
    setTimeout( function() { doThing((9*timeout/10)+1, i+1); }, timeout);
  }
}

var timeout = Math.floor(Math.random() * 5000);
jQuery("#tem_forma").hide();
setTimeout( function() { doThing(timeout, 0); }, timeout);
