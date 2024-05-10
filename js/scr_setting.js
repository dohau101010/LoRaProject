// ............................................................................
const rangeInputx = document.querySelector(".scrollable-rangen");
// const valueDisplay = document.querySelector('.scroll-value');

const rangeInput1 = document.querySelector(".scrollable-range1n");
// const valueDisplay1 = document.querySelector('.scroll-value1');

const rangeInput2 = document.querySelector(".scrollable-range2n");
// const valueDisplay2 = document.querySelector('.scroll-value2');

const rangeInput3 = document.querySelector(".scrollable-range3n");
// const valueDisplay3 = document.querySelector('.scroll-value3');

// Cập nhật giá trị hiển thị khi giá trị của thanh cuộn thay đổi
rangeInputx.addEventListener("input", function () {
  var value_Tempt = parseInt(this.value, 10);
  firebase.database().ref("/Ngưỡng 1/Nhiệt độ").set(value_Tempt);
  document.getElementById("scroll-value").innerHTML = this.value;

  // Kích hoạt sự kiện input để cập nhật giao diện của thanh slider
});

rangeInput1.addEventListener("input", function () {
  var value_Humi = parseInt(this.value, 10);
  firebase.database().ref("/Ngưỡng 1/Độ ẩm không khí").set(value_Humi);
  document.getElementById("scroll-value1").innerHTML = this.value;
});

rangeInput2.addEventListener("input", function () {
  var value_Dust = parseInt(this.value, 10);
  firebase.database().ref("/Ngưỡng 1/Bụi").set(value_Dust);
  document.getElementById("scroll-value2").innerHTML = this.value;
});

rangeInput3.addEventListener("input", function () {
  var value_Bat = parseInt(this.value, 10);
  firebase.database().ref("/Ngưỡng 1/Nồng độ CO").set(value_Bat);
  document.getElementById("scroll-value3").innerHTML = this.value;
});

// Cap nhat lan dau
var hasExecutedx = false;
if (!hasExecutedx) {
  firebase
    .database()
    .ref("/Ngưỡng 1/Nhiệt độ")
    .on("value", function (snapshot) {
      var tempt_th = snapshot.val();
      document.getElementById("scroll-value").innerHTML = tempt_th;

      rangeInputx.value = tempt_th;
      rangeInputx.dispatchEvent(new Event("input"));
    });
  firebase
    .database()
    .ref("/Ngưỡng 1/Độ ẩm không khí")
    .on("value", function (snapshot) {
      var humi_th = snapshot.val();
      document.getElementById("scroll-value1").innerHTML = humi_th;

      rangeInput1.value = humi_th;
      rangeInput1.dispatchEvent(new Event("input"));
    });
  firebase
    .database()
    .ref("/Ngưỡng 1/Bụi")
    .on("value", function (snapshot) {
      var dust_th = snapshot.val();
      document.getElementById("scroll-value2").innerHTML = dust_th;

      rangeInput2.value = dust_th;
      rangeInput2.dispatchEvent(new Event("input"));
    });
  firebase
    .database()
    .ref("/Ngưỡng 1/Nồng độ CO")
    .on("value", function (snapshot) {
      var bat_th = snapshot.val();
      document.getElementById("scroll-value3").innerHTML = bat_th;

      rangeInput3.value = bat_th;
      rangeInput3.dispatchEvent(new Event("input"));
    });

  hasExecutedx = true;
}

//
// ............................................................................
const rangeInputxy = document.querySelector(".scrollable-range");
// const valueDisplay = document.querySelector('.scroll-value');

const rangeInput1y = document.querySelector(".scrollable-range1");
// const valueDisplay1 = document.querySelector('.scroll-value1');

const rangeInput2y = document.querySelector(".scrollable-range2");
// const valueDisplay2 = document.querySelector('.scroll-value2');

const rangeInput3y = document.querySelector(".scrollable-range3");
// const valueDisplay3 = document.querySelector('.scroll-value3');

// Cập nhật giá trị hiển thị khi giá trị của thanh cuộn thay đổi
rangeInputxy.addEventListener("input", function () {
  var value_Tempt = parseInt(this.value, 10);
  firebase.database().ref("/Ngưỡng 2/Nhiệt độ").set(value_Tempt);
  document.getElementById("scroll-valuen").innerHTML = this.value;

  // Kích hoạt sự kiện input để cập nhật giao diện của thanh slider
});

rangeInput1y.addEventListener("input", function () {
  var value_Humi = parseInt(this.value, 10);
  firebase.database().ref("/Ngưỡng 2/Độ ẩm không khí").set(value_Humi);
  document.getElementById("scroll-value1n").innerHTML = this.value;
});

rangeInput2y.addEventListener("input", function () {
  var value_Dust = parseInt(this.value, 10);
  firebase.database().ref("/Ngưỡng 2/Bụi").set(value_Dust);
  document.getElementById("scroll-value2n").innerHTML = this.value;
});

rangeInput3y.addEventListener("input", function () {
  var value_Bat = parseInt(this.value, 10);
  firebase.database().ref("/Ngưỡng 2/Nồng độ CO").set(value_Bat);
  document.getElementById("scroll-value3n").innerHTML = this.value;
});

// Cap nhat lan dau
var hasExecutedxy = false;
if (!hasExecutedxy) {
  firebase
    .database()
    .ref("/Ngưỡng 2/Nhiệt độ")
    .on("value", function (snapshot) {
      var tempt_th = snapshot.val();
      document.getElementById("scroll-valuen").innerHTML = tempt_th;

      rangeInputxy.value = tempt_th;
      rangeInputxy.dispatchEvent(new Event("input"));
    });
  firebase
    .database()
    .ref("/Ngưỡng 2/Độ ẩm không khí")
    .on("value", function (snapshot) {
      var humi_th = snapshot.val();
      document.getElementById("scroll-value1n").innerHTML = humi_th;

      rangeInput1y.value = humi_th;
      rangeInput1y.dispatchEvent(new Event("input"));
    });
  firebase
    .database()
    .ref("/Ngưỡng 2/Bụi")
    .on("value", function (snapshot) {
      var dust_th = snapshot.val();
      document.getElementById("scroll-value2n").innerHTML = dust_th;

      rangeInput2y.value = dust_th;
      rangeInput2y.dispatchEvent(new Event("input"));
    });
  firebase
    .database()
    .ref("/Ngưỡng 2/Nồng độ CO")
    .on("value", function (snapshot) {
      var bat_th = snapshot.val();
      document.getElementById("scroll-value3n").innerHTML = bat_th;

      rangeInput3y.value = bat_th;
      rangeInput3y.dispatchEvent(new Event("input"));
    });

  hasExecutedxy = true;
}

