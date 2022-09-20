import Chart from 'chart.js/auto';

document.addEventListener("DOMContentLoaded", e => {
    const data = {
        labels: [
            'Food',
            'Entertainment',
            'Merchandise',
            'Transportation',
            'Housing',
            'Bills',
            'Other'
            
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(201, 203, 207, 0.8)',
            'rgba(54, 162, 235, 0.8)'
            ]
        }]
    };
    const config = {
        type: 'polarArea',
        data: data,
        options: {}
    };
    const myChart = new Chart(
      document.getElementById('category-chart'),
      config
    );
    
});

 