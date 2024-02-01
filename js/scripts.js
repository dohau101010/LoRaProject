var database = firebase.database();

var rainChart = [0, 0, 0, 0, 0];
var temptChart = [10, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var humidChart = [10, 0, 0, 0, 0, 0, 0, 0, 0, 0];


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

database.ref("/Light").on("value", function(snapshot){
  var light = snapshot.val();
  document.getElementById("light").innerHTML = light;
});

// BAR CHART
const barChartOptions = {
  series: [
    {
      data: rainChart
    },
  ],
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ['#0C2D57', '#cc3c43', '#367952', '#f5b74f', '#4f35a1'],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: ['Today', 'Yesterday', '2 day ago', '3 day ago', '4 day ago'],
  },
  yaxis: {
    title: {
      text: 'Rainfall (mm)',
    },
  },
};
var barChart = new ApexCharts(
  document.querySelector('#bar-chart'),
  barChartOptions
);
barChart.render();

// AREA CHART
const areaChartOptions = {
  series: [
    {
      name: 'Temperature',
      data: temptChart,
    },
    {
      name: 'Humidity',
      data: [12, 15, 26, 32, 14, 78, 85, 12, 13, 14],
    },
  ],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  colors: ['#4f35a1', '#246dec'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  labels: ['Live', '1h', '2h', '3h', '4h', '5h', '6h', '7h' ,'8h', '9h'],
  markers: {
    size: 0,
  },
  yaxis: [
    {
      title: {
        text: 'Temperature (°C)',
      },
      max: 90,
    },
    {
      opposite: true,
      title: {
        text: 'Humidity (%)',
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
  document.querySelector('#area-chart'),
  areaChartOptions
);
areaChart.render();

//-----------------------------------RAIN PROCESSING--------------------------------------
function updateRainChart() {
  // Lấy giá trị mới từ Firebase cho rain
  database.ref("/Rain").once("value").then(function(snapshot){
    var rain = snapshot.val();
    document.getElementById("rain").innerHTML = rain;

    // Thêm giá trị mới vào mảng
    rainChart.unshift(rain);

    // Giữ số lượng phần tử trong mảng rainChart không vượt quá 5
    if (rainChart.length > 5) {
      rainChart.splice(5);
    }

    // Cập nhật giá trị cho biểu đồ Rainfall
    barChart.updateSeries([{
      data: rainChart
    }]);
  });
}
// Lắng nghe sự kiện từ Firebase cho rain liên tục
database.ref("/Rain").on("value", function(snapshot){
  var rain = snapshot.val();
  document.getElementById("rain").innerHTML = rain;
});

//----------------------------------------------------------------------------------------

//-----------------------------------TEMPT%HUMI PROCESSING--------------------------------------
function updateTemptHumiChart() {
  // Lấy giá trị mới từ Firebase cho rain
  database.ref("/Tempt").once("value").then(function(snapshot){
    var tempt = snapshot.val();
    document.getElementById("tempt").innerHTML = tempt;

    // Thêm giá trị mới vào mảng
    temptChart.unshift(tempt);

    // Giữ số lượng phần tử trong mảng temptChart không vượt quá 5
    if (temptChart.length > 10) {
      temptChart.splice(10);
    }
    // Cập nhật giá trị cho biểu đồ Rainfall
    areaChart.updateSeries([{
      name: 'Temperature',
      data: temptChart
    }, {
      name: 'Humidity',
      data: humidChart
    }]);
  });
 
  database.ref("/Humi").once("value").then(function(snapshot){
    var humi = snapshot.val();
    document.getElementById("humi").innerHTML = humi;

    // Thêm giá trị mới vào mảng
    humidChart.unshift(humi);

    // Giữ số lượng phần tử trong mảng temptChart không vượt quá 5
    if (humidChart.length > 10) {
      humidChart.splice(10);
    }
    // Cập nhật giá trị cho biểu đồ Rainfall
    areaChart.updateSeries([{
      name: 'Temperature',
      data: temptChart
    }, {
      name: 'Humidity',
      data: humidChart
    }]);
  });
}


// Lắng nghe sự kiện từ Firebase cho rain liên tục
database.ref("/Rain").on("value", function(snapshot){
  var rain = snapshot.val();
  document.getElementById("rain").innerHTML = rain;
});

database.ref("/Tempt").on("value", function(snapshot){
  var tempt = snapshot.val();
  document.getElementById("tempt").innerHTML = tempt;
});
database.ref("/Humi").on("value", function(snapshot){
  var humi = snapshot.val();
  document.getElementById("humi").innerHTML = humi;
});
//----------------------------------------------------------------------------------------

// Cài đặt lặp cập nhật mỗi 5 giây
setInterval(function () {
  updateRainChart();
}, 60*60*1000);

setInterval(function () {
  updateTemptHumiChart();
}, 1000);

updateRainChart();
updateTemptHumiChart();

// -------------------------------------------------------------