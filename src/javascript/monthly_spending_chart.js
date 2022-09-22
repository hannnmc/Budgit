import Chart from 'chart.js/auto';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getFirstDayPrevMonth(day) {
  const date = new Date(day);
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

document.addEventListener("DOMContentLoaded", e => {
  const months = [];
  let month = new Date();
  while (months.length < 3) {
      months.unshift(month);
      month = getFirstDayPrevMonth(month);
  }

  const labels = [
      `${monthNames[months[0].getMonth()]}`,
      `${monthNames[months[1].getMonth()]}`,
      `${monthNames[months[2].getMonth()]}`
    ];

  const data = {
  labels: labels,
  datasets: [{
      label: 'Monthly Expense',
      data: [
        // getLSM(months[0]), 
        // getLSM(months[1]),
        3500,
        3850,
        // getLSM()
        2450
        ],
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
  document.getElementById('add-expense').addEventListener("submit", updateValue)

  function updateValue() {
    months.forEach(month => {
        let index = months.indexOf(month);
        myChart.config.data.datasets[0].data[index] = getLSM(month);
    })
    myChart.update();
  }

  window.updateMonthlyS = updateValue;
});

 