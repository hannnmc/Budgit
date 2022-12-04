import Chart from 'chart.js/auto';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getFirstDayPrevMonth(day) {
  const date = new Date(day);
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

document.addEventListener("DOMContentLoaded", e => {

  let TMonthlyIncome = JSON.parse(localStorage.getItem('MonthlyIncome'))

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
      label: 'Monthly Income',
      data: [
        getLSM(months[0],true) + TMonthlyIncome,
        getLSM(months[1],true) + TMonthlyIncome,
        getLSM(month[2],true) + TMonthlyIncome
      ],
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)'
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
            text: 'Income',
            padding: {
              top: 10,
              bottom: 30
            }
          }
        },
      },
  };  

  const myChart = new Chart(
      document.getElementById('mi-chart'),
      config
  );


  document.getElementById('add-income').addEventListener('click', toggleBar)
  document.getElementById('set-income').addEventListener('click', setMonthlyIncome)
  document.getElementById('add-expense').addEventListener("submit", updateValue)

  function updateValue() {
    months.forEach(month => {
        let index = months.indexOf(month);
        let totalMonthly = getLSM(months[index],true) + TMonthlyIncome;
        myChart.config.data.datasets[0].data[index] = totalMonthly;
    })
    myChart.update();
  }

  function setMonthlyIncome() {
    let monthlyIncome = parseFloat(document.getElementById('income-input').value)
    localStorage.setItem('MonthlyIncome' , JSON.stringify(monthlyIncome))
    TMonthlyIncome = monthlyIncome;
    updateValue();
    toggleBar();
  }

  function toggleBar() {
    let iBar = document.getElementById("income-bar");
    
    if (iBar.style.display === "none") {
      iBar.style.display = "flex";
    } else {
      iBar.style.display = "none";
    }
  }
  
  window.updateMonthlyI = updateValue;
});

 