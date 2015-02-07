var myid = chrome.runtime.id;
var myimg = "chrome-extension://" + myid + "/resources/img/test1.jpeg";
var images = document.getElementsByTagName('img');
console.log(myimg);
for (var i = 0; i < images.length; i++) {
  images[i].src = myimg;
}

