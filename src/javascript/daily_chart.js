import Chart from 'chart.js/auto';

const monthNames = ["jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
  
    return previous;
}

const days = [];
let day = new Date();
while (days.length < 7) {
    days.unshift(day);
    day = getPreviousDay(day);
}

document.addEventListener("DOMContentLoaded", e => {

    const today = new Date();
    const labels = [
        `${monthNames[today.getMonth()]} ${days[0].getDate()}`,
        `${monthNames[today.getMonth()]} ${days[1].getDate()}`,
        `${monthNames[today.getMonth()]} ${days[2].getDate()}`,
        `${monthNames[today.getMonth()]} ${days[3].getDate()}`,
        `${monthNames[today.getMonth()]} ${days[4].getDate()}`,
        `${monthNames[today.getMonth()]} ${days[5].getDate()}`,
        `${monthNames[today.getMonth()]} ${days[6].getDate()}`
      ];
    const data = {
    labels: labels,
    datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 205, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(201, 203, 207, 0.5)'
        ],
        borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
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
                }
            }
        },
    };  
    const myChart = new Chart(
        document.getElementById('daily-spending-chart'),
        config
    );

});

 