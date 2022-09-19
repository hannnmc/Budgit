import Chart from 'chart.js/auto';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
  
    return previous;
}

document.addEventListener("DOMContentLoaded", e => {

    const days = [];
    let day = new Date();
    while (days.length < 7) {
        days.unshift(day);
        day = getPreviousDay(day);
    }
    const labels = [
        `${monthNames[days[0].getMonth()]} ${days[0].getDate()}`,
        `${monthNames[days[1].getMonth()]} ${days[1].getDate()}`,
        `${monthNames[days[2].getMonth()]} ${days[2].getDate()}`,
        `${monthNames[days[3].getMonth()]} ${days[3].getDate()}`,
        `${monthNames[days[4].getMonth()]} ${days[4].getDate()}`,
        `${monthNames[days[5].getMonth()]} ${days[5].getDate()}`,
        `${monthNames[days[6].getMonth()]} ${days[6].getDate()}`
      ];
    const data = {
    labels: labels,
    datasets: [{
        label: 'Daily Spending',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
        'rgba(255, 99, 132, .9)',
        'rgba(255, 159, 64, .9)',
        'rgba(255, 205, 86, .9)',
        'rgba(75, 192, 192, .9)',
        'rgba(54, 162, 235, .9)',
        'rgba(153, 102, 255, .9)',
        'rgba(201, 203, 207, .9)'
        ],
        borderRadius: 10
    }]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            // maintainAspectRatio: false,
            plugins: {
                legend: {
                display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display:false
                    }
                },
                y: {
                    grid: {
                        display:false
                    }   
                }
            }
        },
    };  
    const myChart = new Chart(
        document.getElementById('daily-spending-chart'),
        config
    );

});

 