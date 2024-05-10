var database = firebase.database();

var lightChart = [30, 25, 10, 25, 5];
var rainChart = [15, 10, 5, 25, 20];
var temptChart = [30, 20, 30, 45, 40, 20, 25, 35, 35, 40];
var humidChart = [80, 90, 80, 80, 90, 95, 70, 70, 80, 90];

// database.ref("/Humi").on("value", function(snapshot){
//   var humi = snapshot.val();
//   document.getElementById("humi").innerHTML = humi;

//   humidChart.unshift(humi);
//   humidChart.splice(10);

//   areaChart.updateSeries([{
//     name: 'Temperature',
//     data: temptChart
//   }, {
//     name: 'Humidity',
//     data: humidChart
//   }]);
// });

// database.ref("/Rain").on("value", function(snapshot){
//   var rain = snapshot.val();
//   document.getElementById("rain").innerHTML = rain;

//   // rainChart.unshift(rain);
//   // rainChart.splice(5);

//   // barChart.updateSeries([{
//   //   data: rainChart
//   // }]);

// });

database.ref("/Trạm 2/Nồng độ CO").on("value", function (snapshot) {
  var light = snapshot.val();
  document.getElementById("light").innerHTML = light;
});

// BAR CHART
const barChartOptions = {
  series: [
    {
      name: "Dust",
      data: rainChart,
    },
    {
      name: "CO",
      data: lightChart,
    },
  ],
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ["#0C2D57", "#f5b74f"], // Chỉ sử dụng hai màu trong mảng này
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: "50%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: true, // Hiển thị huy hiệu
  },
  xaxis: {
    categories: ["Today", "Yesterday", "2 day ago", "3 day ago", "4 day ago"],
  },
  yaxis: [
    {
      title: {
        text: " P2.5 (ug/m3)",
      },
      max: 30,
    },
    {
      opposite: true,
      title: {
        text: "CO gas (ppm)",
      },
      max: 50,
    },
  ],
};

var barChart = new ApexCharts(
  document.querySelector("#bar-chart"),
  barChartOptions
);
barChart.render();

// AREA CHART
const areaChartOptions = {
  series: [
    {
      name: "Temperature",
      data: temptChart,
    },
    {
      name: "Humidity",
      data: [12, 15, 26, 32, 14, 78, 85, 12, 13, 14],
    },
  ],
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  colors: ["#4f35a1", "#246dec"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  labels: ["Live", "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h"],
  markers: {
    size: 0,
  },
  yaxis: [
    {
      title: {
        text: "Temperature (°C)",
      },
      max: 50,
    },
    {
      opposite: true,
      title: {
        text: "Humidity (%)",
      },
      max: 100,
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  },
};

const areaChart = new ApexCharts(
  document.querySelector("#area-chart"),
  areaChartOptions
);
areaChart.render();

//-----------------------------------RAIN PROCESSING--------------------------------------
function updateRainChart() {
  // Lấy giá trị mới từ Firebase cho rain
  database
    .ref("/Trạm 2/Bụi")
    .once("value")
    .then(function (snapshot) {
      var rain = snapshot.val();
      document.getElementById("rain").innerHTML = rain;

      // Thêm giá trị mới vào mảng
      rainChart.unshift(rain);

      // Giữ số lượng phần tử trong mảng rainChart không vượt quá 5
      if (rainChart.length > 5) {
        rainChart.splice(5);
      }

      // Cập nhật giá trị cho biểu đồ Rainfall
      barChart.updateSeries([
        {
          data: rainChart,
        },
        {
          data: lightChart,
        },
      ]);
    });

  database
    .ref("/Trạm 2/Nồng độ CO")
    .once("value")
    .then(function (snapshot) {
      var light = snapshot.val();
      document.getElementById("light").innerHTML = light;

      // Thêm giá trị mới vào mảng
      lightChart.unshift(light);

      // Giữ số lượng phần tử trong mảng rainChart không vượt quá 5
      if (lightChart.length > 5) {
        lightChart.splice(5);
      }

      // Cập nhật giá trị cho biểu đồ Rainfall
      barChart.updateSeries([
        {
          data: rainChart,
        },
        {
          data: lightChart,
        },
      ]);
    });
}
// Lắng nghe sự kiện từ Firebase cho rain liên tục
database.ref("/Trạm 2/Bụi").on("value", function (snapshot) {
  var rain = snapshot.val();
  document.getElementById("rain").innerHTML = rain;
});

//----------------------------------------------------------------------------------------

//-----------------------------------TEMPT%HUMI PROCESSING--------------------------------------
function updateTemptHumiChart() {
  // Lấy giá trị mới từ Firebase cho rain
  database
    .ref("/Trạm 2/Nhiệt độ")
    .once("value")
    .then(function (snapshot) {
      var tempt = snapshot.val();
      document.getElementById("tempt").innerHTML = tempt;

      // Thêm giá trị mới vào mảng
      temptChart.unshift(tempt);

      // Giữ số lượng phần tử trong mảng temptChart không vượt quá 5
      if (temptChart.length > 10) {
        temptChart.splice(10);
      }
      // Cập nhật giá trị cho biểu đồ Rainfall
      areaChart.updateSeries([
        {
          name: "Temperature",
          data: temptChart,
        },
        {
          name: "Humidity",
          data: humidChart,
        },
      ]);
    });

  database
    .ref("/Trạm 2/Độ ẩm không khí")
    .once("value")
    .then(function (snapshot) {
      var humi = snapshot.val();
      document.getElementById("humi").innerHTML = humi;

      // Thêm giá trị mới vào mảng
      humidChart.unshift(humi);

      // Giữ số lượng phần tử trong mảng temptChart không vượt quá 5
      if (humidChart.length > 10) {
        humidChart.splice(10);
      }
      // Cập nhật giá trị cho biểu đồ Rainfall
      areaChart.updateSeries([
        {
          name: "Temperature",
          data: temptChart,
        },
        {
          name: "Humidity",
          data: humidChart,
        },
      ]);
    });
}

// Lắng nghe sự kiện từ Firebase cho rain liên tục
database.ref("/Trạm 2/Bụi").on("value", function (snapshot) {
  var rain = snapshot.val();
  document.getElementById("rain").innerHTML = rain;
});

var audio = new Audio("mp3/warn.mp3");
var hasPushedToHistory1 = false;

database.ref("/Trạm 2/Nhiệt độ").on("value", function (snapshot) {
  var tempt = snapshot.val();
  document.getElementById("tempt").innerHTML = tempt;
  database.ref("/Ngưỡng 2/Nhiệt độ").on("value", function (snapshot) {
    var tempt_th = snapshot.val();

    if (tempt > tempt_th && !hasPushedToHistory) {
      document.getElementById("tempt").style.color = "red";
      document.getElementById("tempt").style.fontSize = "25px";
      document.getElementById("tempt").style.animation = "blink 1s infinite";
      audio.play();

      const now = new Date();
      const time =
        now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

      // Push dữ liệu vào thư mục 'History' trên Firebase
      firebase.database().ref("/History 2").set({
        mess: "Nhiệt độ cao!",
      });

      // Đặt cờ đã push lên Firebase
      hasPushedToHistory1 = true;
    } else {
      document.getElementById("tempt").style.color = "#47474a";
      document.getElementById("tempt").style.fontSize = "22px";
      document.getElementById("tempt").style.animation = "none";
    }
  });
});

var audio = new Audio("mp3/warn.mp3");
var hasPushedToHistory = false;

database.ref("/Trạm 2/Độ ẩm không khí").on("value", function (snapshot) {
  var humi = snapshot.val();
  document.getElementById("humi").innerHTML = humi;
  database.ref("/Ngưỡng 2/Độ ẩm không khí").on("value", function (snapshot) {
    var humi_th = snapshot.val();

    if (humi < humi_th && !hasPushedToHistory) {
      document.getElementById("humi").style.color = "red";
      document.getElementById("humi").style.fontSize = "25px";
      document.getElementById("humi").style.animation = "blink 1s infinite";
      audio.play();

      const now = new Date();
      const time =
        now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

      // Push dữ liệu vào thư mục 'History' trên Firebase
      firebase.database().ref("/History 2").set({
        mess: "Độ ẩm thấp!",
      });

      // Đặt cờ đã push lên Firebase
      hasPushedToHistory = true;
    } else {
      document.getElementById("humi").style.color = "#47474a";
      document.getElementById("humi").style.fontSize = "22px";
      document.getElementById("humi").style.animation = "none";
    }
  });
});

//----------------------------------------------------------------------------------------

// Cài đặt lặp cập nhật mỗi 5 giây

setInterval(function () {
  updateRainChart();
}, 60 * 60 * 1000);

setInterval(function () {
  updateTemptHumiChart();
}, 60 * 60 * 1000);

updateRainChart();
updateTemptHumiChart();

// -------------------------------------------------------------
