import Chart from 'chart.js/auto';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getFirstDayPrevMonth(day) {
  const date = new Date(day);
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

document.addEventListener("DOMContentLoaded", e => {
  const days = [];
  let day = new Date();
  while (days.length < 3) {
      days.unshift(day);
      day = getFirstDayPrevMonth(day);
  }

  const labels = [
      `${monthNames[days[0].getMonth()]}`,
      `${monthNames[days[1].getMonth()]}`,
      `${monthNames[days[2].getMonth()]}`
    ];

  const data = {
  labels: labels,
  datasets: [{
      label: 'Monthly Expense',
      data: [getLSM(days[0]), getLSM(days[1]), getLSM()],
      backgroundColor: [
        'rgba(255, 205, 86, 0.8)'
      ],
      barThickness: 8,
      borderRadius: 10
  }]
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
        display: false
        },
        title: {
          display: true,
          text: 'Expense',
          padding: {
            top: 10,
            bottom: 30
          }
        }
      },
    },
}; 
  
  const myChart = new Chart(
      document.getElementById('ms-chart'),
      config
  );
  document.getElementById('add-expense').addEventListener("submit", updateChart)

  let current = labels[labels.length - 1]

  function updateValue(val,label = current) {
    const index = labels.indexOf(label);
    myChart.config.data.datasets[0].data[index] = val;
    myChart.update();
  }

  function updateChart() {
    updateValue(getLSM());
    myChart.update();
  }

});

 