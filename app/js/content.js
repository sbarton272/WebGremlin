function doThing(timeout) {
  changeImages(timeout, 0)
}

var ourimages = ['test1.jpeg','test2.jpeg','icon.png']
function changeImages(timeout, i) {
  var myid = chrome.runtime.id;
  var images = document.getElementsByTagName('img');
  var changeIdx = Math.floor(Math.random() * images.length);
  var useIdx = Math.floor(Math.random() * ourimages.length);
  var myimg = chrome.extension.getURL('res/img/' + ourimages[useIdx]);
  images[changeIdx].src = myimg;

  if (i < 3*images.length) {
    setTimeout( function() { changeImages((9*timeout/10)+1, i+1); }, timeout);
  }
}

var timeout = Math.floor(Math.random() * 5000 + 2500);
jQuery("#tem_forma").hide();
setTimeout( function() { doThing(timeout); }, timeout);
