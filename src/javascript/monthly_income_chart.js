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

  console.log(getFirstDayPrevMonth(days[0]))

  const labels = [
      `${monthNames[days[0].getMonth()]}`,
      `${monthNames[days[1].getMonth()]}`,
      `${monthNames[days[2].getMonth()]}`
    ];

  const data = {
  labels: labels,
  datasets: [{
      label: 'My First Dataset',
      data: [56, 55, 40],
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1,
      barThickness: 8,
      borderRadius: 10
  }]
  };
  const config = {
      type: 'bar',
      data: data,
      options: {
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
  
});

 