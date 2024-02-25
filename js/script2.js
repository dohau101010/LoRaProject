const rangeInput = document.querySelector('.scrollable-range');
// const valueDisplay = document.querySelector('.scroll-value');

const rangeInput1 = document.querySelector('.scrollable-range1');
// const valueDisplay1 = document.querySelector('.scroll-value1');

const rangeInput2 = document.querySelector('.scrollable-range2');
// const valueDisplay2 = document.querySelector('.scroll-value2');

const rangeInput3 = document.querySelector('.scrollable-range3');
// const valueDisplay3 = document.querySelector('.scroll-value3');

// Cập nhật giá trị hiển thị khi giá trị của thanh cuộn thay đổi
rangeInput.addEventListener('input', function() {
  firebase.database().ref('/Threshold/Tempt_th').set(this.value);
  document.getElementById("scroll-value").innerHTML = this.value;
});

rangeInput1.addEventListener('input', function() {
    firebase.database().ref('/Threshold/Humi_th').set(this.value);
    document.getElementById("scroll-value1").innerHTML = this.value;
  });
  
rangeInput2.addEventListener('input', function() {
    firebase.database().ref('/Threshold/Dust_th').set(this.value);
    document.getElementById("scroll-value2").innerHTML = this.value;
  });
  
rangeInput3.addEventListener('input', function() {
      firebase.database().ref('/Threshold/Bat_th').set(this.value);
      document.getElementById("scroll-value3").innerHTML = this.value;
    });

//-----------------cap nhat 1 lan khi load lai------------------------------
var hasExecuted = false;
if (!hasExecuted) {

  firebase.database().ref("/Threshold/Tempt_th").on("value", function(snapshot){
    var tempt_th = snapshot.val();
    document.getElementById("scroll-value").innerHTML = tempt_th;
  });
  firebase.database().ref("/Threshold/Humi_th").on("value", function(snapshot){
    var humi_th = snapshot.val();
    document.getElementById("scroll-value1").innerHTML = humi_th;
  });
  firebase.database().ref("/Threshold/Dust_th").on("value", function(snapshot){
    var dust_th = snapshot.val();
    document.getElementById("scroll-value2").innerHTML = dust_th;
  });
  firebase.database().ref("/Threshold/Bat_th").on("value", function(snapshot){
    var bat_th = snapshot.val();
    document.getElementById("scroll-value3").innerHTML = bat_th;
  });

  hasExecuted = true;
}
