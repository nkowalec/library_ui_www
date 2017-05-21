function includeAll(){
  var elems = document.getElementsByTagName('*');
  for (var i = 0; i < elems.length; i++) {
    var e = elems[i];
    let attr = e.getAttribute('data-include');
    if(attr){
      req = new XMLHttpRequest();
      req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          e.innerHTML = this.responseText;
          e.removeAttribute('data-include');
          includeAll();
          clickConvert();
        }
      }
      req.open("GET", attr, true);
      req.send();
      return;
    }
  }
}

function getBase(){
  var base = document.getElementsByTagName('base')[0];
  return base.getAttribute('href');
}

function clickConvert(){
  var elems = document.getElementsByTagName('*');
  for(var i = 0; i < elems.length; i++) {
    var e = elems[i];
    let attr = e.getAttribute('click-href');
    if(attr){
      if(!attr.startsWith('http')){
        attr = getBase() + attr;
      }
      e.onclick = function() { window.location.href = attr; };
      e.removeAttribute('click-href');
    }
  }
}

function searchToogle(){
  console.log("toogle");
  var e = document.getElementById('search');
  if(e.style.display == "none"){
    e.style.display = "block";
  }else{
    e.style.display = "none";
  }
}

function searchEnter(){
  alert("Wyszukiwanie: " + document.getElementById('search').getElementsByTagName('input')[0].value);
}


includeAll();
clickConvert();
