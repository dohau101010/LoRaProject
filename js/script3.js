const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  for (let i = 1; i <= endDate; i++) {
    let className =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? ' class="today"'
        : "";
    datesHtml += `<li${className}>${i}</li>`;
  }

  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;
}

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
  });
});

renderCalendar();

// Tạo tham chiếu đến thư mục 'frequency' trên Firebase
const frequencyRef = firebase.database().ref("Frequency");

// Lắng nghe sự kiện value trên tham chiếu này để lấy dữ liệu
frequencyRef.on("value", function (snapshot) {
  // Lấy dữ liệu từ snapshot
  const frequencyData = snapshot.val();

  // Lấy giá trị từ các thư mục con và đặt vào mảng frequencyValue
  const frequencyValue = [
    frequencyData.Lamp || 0,
    frequencyData.Fan || 0,
    frequencyData.Vacuum || 0,
    frequencyData.Air || 0,
  ];
  // Cập nhật dữ liệu của biểu đồ
  barChart.updateSeries([{ data: frequencyValue }]);

  const pieChartOptions = {
    series: frequencyValue,
    chart: {
      type: "pie",
      height: 250,
    },
    labels: ["Lamp", "Fan", "Vacuum", "Air-Conditioner"],
    colors: ["#0C2D57", "#cc3c43", "#367952", "#f5b74f"],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1); // Làm tròn giá trị với một chữ số sau dấu phẩy
      },
    },
    plotOptions: {
      pie: {
        customScale: 1,
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 20,
            },
            value: {
              show: true,
              offsetY: -20,
            },
          },
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
      formatter: function (seriesName, opts) {
        return (
          seriesName + ": " + opts.w.globals.series[opts.seriesIndex].toFixed(1)
        );
      },
      offsetX: 0,
      offsetY: 5,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return val; // Loại bỏ "mm"
        },
      },
    },
  };

  var pieChart = new ApexCharts(
    document.querySelector("#pie-chart"),
    pieChartOptions
  );
  pieChart.render();
});

var frequencyValue = [0, 0, 0, 0];
// BAR CHART
const barChartOptions = {
  series: [
    {
      data: frequencyValue,
    },
  ],
  chart: {
    type: "bar",
    height: 250,
    toolbar: {
      show: false,
    },
  },
  colors: ["#0C2D57", "#cc3c43", "#367952", "#f5b74f"],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: "40%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: ["Lamp", "Fan", "Vacuum", "Air-Conditioner"],
  },
  yaxis: {
    title: {
      text: "Rainfall (mm)",
    },
  },
};
var barChart = new ApexCharts(
  document.querySelector("#bar-chart"),
  barChartOptions
);
barChart.render();

//
// Tạo tham chiếu đến thư mục 'History' trên Firebase
const historyRef = firebase.database().ref("History");

// Lắng nghe sự kiện value trên tham chiếu này để lấy dữ liệu
historyRef.on("value", function (snapshot) {
  // Lấy dữ liệu từ snapshot
  const historyData = snapshot.val();

  // Lấy thẻ tbody của bảng
  const tbody = document.querySelector("#data-table tbody");

  // Xóa nội dung cũ của tbody (nếu có)
  tbody.innerHTML = "";

  // Duyệt qua các item trong historyData
  for (let key in historyData) {
    // Lấy thông tin từng item
    const item = historyData[key];
    const time = item.time;
    const alarm = item.mess;
    const value = item.value;

    // Tạo một hàng mới trong tbody
    const row = document.createElement("tr");

    // Tạo các ô dữ liệu
    const timeCell = document.createElement("td");
    const alarmCell = document.createElement("td");
    const valueCell = document.createElement("td");

    // Đặt nội dung cho các ô dữ liệu
    timeCell.textContent = time;
    alarmCell.textContent = alarm;
    valueCell.textContent = value;

    // Thêm các ô dữ liệu vào hàng
    row.appendChild(timeCell);
    row.appendChild(alarmCell);
    row.appendChild(valueCell);

    // Thêm hàng vào tbody
    tbody.appendChild(row);
  }
});
