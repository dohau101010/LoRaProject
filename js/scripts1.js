const rangeInput = document.querySelector(".lamp_roll");

var btnFan = document.getElementById("fan_but");
var btnClean = document.getElementById("clean_but");
var btnAir = document.getElementById("air_but");

rangeInput.addEventListener("change", function () {
  var value_Led = parseInt(this.value, 10);
  firebase.database().ref("/Led").set(value_Led);
  if (value_Led == 1) document.getElementById("lam").src = "./img/lam_1.png";
  else if (value_Led == 2)
    document.getElementById("lam").src = "./img/lam_2.png";
  else if (value_Led == 3)
    document.getElementById("lam").src = "./img/lam_3.png";
  else if (value_Led == 4)
    document.getElementById("lam").src = "./img/lam_4.png";
  else if (value_Led == 5)
    document.getElementById("lam").src = "./img/lam_5.png";

  firebase
    .database()
    .ref("/Frequency/Lamp")
    .once("value", function (snapshot) {
      var oldLedValue = snapshot.val();
      if (value_Led != 1) {
        firebase
          .database()
          .ref("/Frequency/Lamp")
          .set(oldLedValue + 1)
          .then(() => {
            // Loại bỏ sự kiện "value" sau khi đã cập nhật giá trị thành công
            firebase.database().ref("/Frequency/Lamp").off("value");
          });
      }
    });
});

var countFan = 1;
btnFan.onclick = function () {
  countFan = countFan + 1;
  if (countFan > 5) countFan = 1;
  firebase.database().ref("/Fan").set(countFan);

  if (countFan == 1) {
    document.getElementById("fan").src = "./img/fan_off.png";
    document.getElementById("fan_but").src = "./img/fanb1.png";
  } else if (countFan == 2) {
    document.getElementById("fan").src = "./img/fan_on.png";
    document.getElementById("fan_but").src = "./img/fanb2.png";
  } else if (countFan == 3) {
    document.getElementById("fan").src = "./img/fan_on.png";
    document.getElementById("fan_but").src = "./img/fanb3.png";
  } else if (countFan == 4) {
    document.getElementById("fan").src = "./img/fan_on.png";
    document.getElementById("fan_but").src = "./img/fanb4.png";
  } else if (countFan == 5) {
    document.getElementById("fan").src = "./img/fan_on.png";
    document.getElementById("fan_but").src = "./img/fanb5.png";
  }
  firebase
    .database()
    .ref("/Frequency/Fan")
    .once("value", function (snapshot) {
      var oldFanValue = snapshot.val();
      if (countFan != 1) {
        firebase
          .database()
          .ref("/Frequency/Fan")
          .set(oldFanValue + 1)
          .then(() => {
            // Loại bỏ sự kiện "value" sau khi đã cập nhật giá trị thành công
            firebase.database().ref("/Frequency/Fan").off("value");
          });
      }
    });
};
var clean_stt = 0;
btnClean.onclick = function () {
  clean_stt = clean_stt + 1;
  if (clean_stt > 1) clean_stt = 0;
  firebase.database().ref("/Clean").set(clean_stt);

  if (clean_stt == 0) {
    document.getElementById("clean").src = "./img/clean_off.png";
    document.getElementById("clean_but").src = "./img/btn_on.png";
  } else {
    document.getElementById("clean").src = "./img/clean_on.png";
    document.getElementById("clean_but").src = "./img/btn_off.png";
  }

  firebase
    .database()
    .ref("/Frequency/Vacuum")
    .once("value", function (snapshot) {
      var oldVacuumValue = snapshot.val();
      if (clean_stt != 0) {
        firebase
          .database()
          .ref("/Frequency/Vacuum")
          .set(oldVacuumValue + 1)
          .then(() => {
            // Loại bỏ sự kiện "value" sau khi đã cập nhật giá trị thành công
            firebase.database().ref("/Frequency/Vacuum").off("value");
          });
      }
    });
};

var air_stt = 0;
btnAir.onclick = function () {
  air_stt = air_stt + 1;
  if (air_stt > 1) air_stt = 0;
  firebase.database().ref("/Air").set(air_stt);

  if (air_stt == 0) {
    document.getElementById("air").src = "./img/air_off.png";
    document.getElementById("air_but").src = "./img/air_boff.png";
  } else {
    document.getElementById("air").src = "./img/air_on.png";
    document.getElementById("air_but").src = "./img/air_bon.png";
  }

  firebase
    .database()
    .ref("/Frequency/Air")
    .once("value", function (snapshot) {
      var oldAirValue = snapshot.val();
      if (air_stt != 0) {
        firebase
          .database()
          .ref("/Frequency/Air")
          .set(oldAirValue + 1)
          .then(() => {
            // Loại bỏ sự kiện "value" sau khi đã cập nhật giá trị thành công
            firebase.database().ref("/Frequency/Air").off("value");
          });
      }
    });
};

var btnDef = document.getElementById("def_but");
var btnAllOn = document.getElementById("all_on");
var btnAllOff = document.getElementById("all_off");
btnDef.onclick = function () {
  firebase.database().ref("/Led").set(1);
  firebase.database().ref("/Fan").set(1);
  firebase.database().ref("/Clean").set(0);
  firebase.database().ref("/Air").set(0);

  document.getElementById("air").src = "./img/air_off.png";
  document.getElementById("air_but").src = "./img/air_boff.png";

  document.getElementById("clean").src = "./img/clean_off.png";
  document.getElementById("clean_but").src = "./img/btn_on.png";

  document.getElementById("fan").src = "./img/fan_off.png";
  document.getElementById("fan_but").src = "./img/fanb1.png";

  document.getElementById("lam").src = "./img/lam_1.png";
};

btnAllOn.onclick = function () {
  firebase.database().ref("/Led").set(5);
  firebase.database().ref("/Fan").set(5);
  firebase.database().ref("/Clean").set(1);
  firebase.database().ref("/Air").set(1);

  document.getElementById("air").src = "./img/air_on.png";
  document.getElementById("air_but").src = "./img/air_bon.png";

  document.getElementById("clean").src = "./img/clean_on.png";
  document.getElementById("clean_but").src = "./img/btn_off.png";

  document.getElementById("fan").src = "./img/fan_on.png";
  document.getElementById("fan_but").src = "./img/fanb5.png";

  document.getElementById("lam").src = "./img/lam_5.png";
};

//------------------------------------------lam 1 lan khi load lai-------------------
var hasExecuted = false;
if (!hasExecuted) {
  firebase
    .database()
    .ref("/Led")
    .on("value", function (snapshot) {
      var value_Led = snapshot.val();
      if (value_Led == 1)
        document.getElementById("lam").src = "./img/lam_1.png";
      else if (value_Led == 2)
        document.getElementById("lam").src = "./img/lam_2.png";
      else if (value_Led == 3)
        document.getElementById("lam").src = "./img/lam_3.png";
      else if (value_Led == 4)
        document.getElementById("lam").src = "./img/lam_4.png";
      else if (value_Led == 5)
        document.getElementById("lam").src = "./img/lam_5.png";

      rangeInput.value = value_Led;
      rangeInput.dispatchEvent(new Event("input")); // Kích hoạt sự kiện input để cập nhật giao diện của thanh slider
    });

  firebase
    .database()
    .ref("/Fan")
    .on("value", function (snapshot) {
      var countFan = snapshot.val();
      if (countFan == 1) {
        document.getElementById("fan").src = "./img/fan_off.png";
        document.getElementById("fan_but").src = "./img/fanb1.png";
      } else if (countFan == 2) {
        document.getElementById("fan").src = "./img/fan_on.png";
        document.getElementById("fan_but").src = "./img/fanb2.png";
      } else if (countFan == 3) {
        document.getElementById("fan").src = "./img/fan_on.png";
        document.getElementById("fan_but").src = "./img/fanb3.png";
      } else if (countFan == 4) {
        document.getElementById("fan").src = "./img/fan_on.png";
        document.getElementById("fan_but").src = "./img/fanb4.png";
      } else if (countFan == 5) {
        document.getElementById("fan").src = "./img/fan_on.png";
        document.getElementById("fan_but").src = "./img/fanb5.png";
      }
    });

  firebase
    .database()
    .ref("/Clean")
    .on("value", function (snapshot) {
      var clean_stt = snapshot.val();
      if (clean_stt == 0) {
        document.getElementById("clean").src = "./img/clean_off.png";
        document.getElementById("clean_but").src = "./img/btn_on.png";
      } else {
        document.getElementById("clean").src = "./img/clean_on.png";
        document.getElementById("clean_but").src = "./img/btn_off.png";
      }
    });
  firebase
    .database()
    .ref("/Air")
    .on("value", function (snapshot) {
      var air_stt = snapshot.val();
      if (air_stt == 0) {
        document.getElementById("air").src = "./img/air_off.png";
        document.getElementById("air_but").src = "./img/air_boff.png";
      } else {
        document.getElementById("air").src = "./img/air_on.png";
        document.getElementById("air_but").src = "./img/air_bon.png";
      }
    });
  hasExecuted = true;
}

// ............................................................................
const rangeInputx = document.querySelector(".scrollable-range");
// const valueDisplay = document.querySelector('.scroll-value');

const rangeInput1 = document.querySelector(".scrollable-range1");
// const valueDisplay1 = document.querySelector('.scroll-value1');

const rangeInput2 = document.querySelector(".scrollable-range2");
// const valueDisplay2 = document.querySelector('.scroll-value2');

const rangeInput3 = document.querySelector(".scrollable-range3");
// const valueDisplay3 = document.querySelector('.scroll-value3');

// Cập nhật giá trị hiển thị khi giá trị của thanh cuộn thay đổi
rangeInputx.addEventListener("input", function () {
  var value_Tempt = parseInt(this.value, 10);
  firebase.database().ref("/Threshold/Tempt_th").set(value_Tempt);
  document.getElementById("scroll-value").innerHTML = this.value;

  // Kích hoạt sự kiện input để cập nhật giao diện của thanh slider
});

rangeInput1.addEventListener("input", function () {
  var value_Humi = parseInt(this.value, 10);
  firebase.database().ref("/Threshold/Humi_th").set(value_Humi);
  document.getElementById("scroll-value1").innerHTML = this.value;
});

rangeInput2.addEventListener("input", function () {
  var value_Dust = parseInt(this.value, 10);
  firebase.database().ref("/Threshold/Dust_th").set(value_Dust);
  document.getElementById("scroll-value2").innerHTML = this.value;
});

rangeInput3.addEventListener("input", function () {
  var value_Bat = parseInt(this.value, 10);
  firebase.database().ref("/Threshold/Bat_th").set(value_Bat);
  document.getElementById("scroll-value3").innerHTML = this.value;
});

// Cap nhat lan dau
var hasExecutedx = false;
if (!hasExecutedx) {
  firebase
    .database()
    .ref("/Threshold/Tempt_th")
    .on("value", function (snapshot) {
      var tempt_th = snapshot.val();
      document.getElementById("scroll-value").innerHTML = tempt_th;

      rangeInputx.value = tempt_th;
      rangeInputx.dispatchEvent(new Event("input"));
    });
  firebase
    .database()
    .ref("/Threshold/Humi_th")
    .on("value", function (snapshot) {
      var humi_th = snapshot.val();
      document.getElementById("scroll-value1").innerHTML = humi_th;

      rangeInput1.value = humi_th;
      rangeInput1.dispatchEvent(new Event("input"));
    });
  firebase
    .database()
    .ref("/Threshold/Dust_th")
    .on("value", function (snapshot) {
      var dust_th = snapshot.val();
      document.getElementById("scroll-value2").innerHTML = dust_th;

      rangeInput2.value = dust_th;
      rangeInput2.dispatchEvent(new Event("input"));
    });
  firebase
    .database()
    .ref("/Threshold/Bat_th")
    .on("value", function (snapshot) {
      var bat_th = snapshot.val();
      document.getElementById("scroll-value3").innerHTML = bat_th;

      rangeInput3.value = bat_th;
      rangeInput3.dispatchEvent(new Event("input"));
    });

  hasExecutedx = true;
}
isAutoMode = false;

// Hop thoai hen gio..............................................................
// Lấy modal
var modal = document.getElementById("myModal");

// Lấy nút để mở modal
var btn = document.getElementById("all_off");
var confirmBtn = document.getElementById("confirmTimer");
// Lấy phần tử <span> để đóng modal

// Khi người dùng nhấn vào nút AUTO, hiển thị modal
btn.onclick = function () {
  modal.style.pointerEvents = "auto";
  document.getElementById("stt_img").src = "./img/auto.png";
  document.getElementById("mode").innerHTML = "AUTO MODE";
  document.getElementById("mode").style.marginLeft = "30px";
};

// ............................XU LY HEN GIO..........................
// Lấy giá trị thời gian bật và thời gian tắt từ người dùng
confirmBtn.onclick = function () {
  modal.style.pointerEvents = "none";

  document.getElementById("stt_img").src = "./img/manual.png";
  document.getElementById("mode").innerHTML = "MANUAL MODE";
  document.getElementById("mode").style.marginLeft = "5px";

  isAutoMode = true;
  
  var lampTurnOnTime = document.getElementById("lampTurnOnTime").value;
  var lampTurnOffTime = document.getElementById("lampTurnOffTime").value;

  // Lấy ngày hiện tại
  var currentDate = new Date();

  // Tạo đối tượng Date cho thời gian bật và tắt với múi giờ của Việt Nam (GMT+7)
  var startTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    lampTurnOnTime.split(":")[0],
    lampTurnOnTime.split(":")[1],
    0
  );
  var endTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    lampTurnOffTime.split(":")[0],
    lampTurnOffTime.split(":")[1],
    0
  );

  var delayStart = startTime - currentDate;
  var delayEnd = endTime - currentDate;

  console.log(delayStart / 1000);
  console.log(delayEnd / 1000);

  setTimeout(function () {
    firebase.database().ref("/Led").set(1);
    document.getElementById("lam").src = "./img/lam_1.png";
  }, delayEnd);

  setTimeout(function () {
    firebase.database().ref("/Led").set(5);
    document.getElementById("lam").src = "./img/lam_5.png";
  }, delayStart);
};
