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
      label: 'Monthly Income',
      data: [4570, 4570, 4875],
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

  function setMonthlyIncome(data) {
    let old =  JSON.parse(localStorage.getItem('bData'));
    localStorage.setItem('bData', JSON.stringify([...old, data]));
}
  
});

 