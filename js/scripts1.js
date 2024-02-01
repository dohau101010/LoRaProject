var btnOn1 = document.getElementById("btnon_01");
var btnOff1 = document.getElementById("btnoff_01");
var btnOn2 = document.getElementById("btnon_02");
var btnOff2 = document.getElementById("btnoff_02");
var btnOn3 = document.getElementById("btnon_03");
var btnOff3 = document.getElementById("btnoff_03");

btnOn1.onclick = function () {
  document.getElementById("led_01").src = "/img/ledon.jpg";
  firebase.database().ref("/Led").update({
    Led: 1,
  });
};

btnOff1.onclick = function () {
  document.getElementById("led_01").src = "/img/ledoff.jpg";
  firebase.database().ref("/Led").update({
    Led: 0,
  });
};
btnOn2.onclick = function () {
  document.getElementById("fan_01").src = "/img/fanon.jpg";
  firebase.database().ref("/Fan").update({
    Fan: 1,
  });
};

btnOff2.onclick = function () {
  document.getElementById("fan_01").src = "/img/fanoff.jpg";
  firebase.database().ref("/Fan").update({
    Fan: 0,
  });
};
btnOn3.onclick = function () {
  document.getElementById("air_01").src = "/img/air-on.jpg";
  firebase.database().ref("/Air").update({
    Air: 1,
  });
};

btnOff3.onclick = function () {
  document.getElementById("air_01").src = "/img/air-off.jpg";
  firebase.database().ref("/Air").update({
    Air: 0,
  });
};
