function getBase(){
  return "/testy_js/";
}

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
          handleLogin();
        }
      }
      req.open("GET", attr, true);
      req.send();
      return;
    }
  }
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

function onLoginSubmit() {
  let item = document.getElementsByName('login')[0].value;
  window.sessionStorage.login = item;
}

function handleLogin() {
  let login = window.sessionStorage.login;
  if(login){
    var elemLoggedIn = document.getElementById('loggedin');
    var elemLoginName = document.getElementById('loginname');
    var elemLoginName2 = document.getElementById('login-name');
    var elemLogin = document.getElementById('login');
    var elemDash = document.getElementById('dashboard');

    elemLoginName.innerText = login;
    elemLoggedIn.style.display = "inline-block";
    elemLogin.style.display = "none";
    if(elemDash) elemDash.style.display = "flex";
    if(elemLoginName2) elemLoginName2.innerText = login;
  }
}

function logout() {
  window.sessionStorage.removeItem('login');
  window.location.href = getBase() + "index.html";
}

function changePassword() {
   document.getElementById('chg-password').style.display = "block";
}

function changePasswordClose() {
  document.getElementById('chg-password').style.display = "none";
}

function yearPickerOptionsCreate() {
  var elems = document.getElementsByClassName('year-pick');
  for(let i = 0; i < elems.length; i++) {
    let e = elems[i];
    if(e.tagName === "SELECT"){
      let year = new Date().getFullYear();
      var optionEmpty = document.createElement("option");
      optionEmpty.text = "";
      e.add(optionEmpty);
      for(let y = 1900; y <= year; y++) {
        let option = document.createElement("option");
        option.text = y;
        e.add(option);
      }
    }
  }
}

includeAll();
clickConvert();
yearPickerOptionsCreate();
