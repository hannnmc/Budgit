import Chart from 'chart.js/auto';

const labels = [
    'Food',
    'Entertainment',
    'Merchandise',
    'Transportation',
    'Housing',
    'Bills',
    'Other'
]

document.addEventListener("DOMContentLoaded", e => {
    document.getElementById('add-expense').addEventListener("submit", updateValue)
    const data = {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: [
                getCatTotal(labels[0]),
                getCatTotal(labels[1]),
                getCatTotal(labels[2]),
                getCatTotal(labels[3]),
                getCatTotal(labels[4]),
                getCatTotal(labels[5]),
                getCatTotal(labels[6]),
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(201, 203, 207, 0.8)'
            ],
            hoverOffset: 4
        }]
    };
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            cutout: '50%',
            radius: '85%',
            plugins: {
                legend: {
                    labels: {
                        padding : 10
                    },
                    title: {
                        display: true,
                        text: "Current Month"
                    }
                }
            }
        }
    };
    const myChart = new Chart(
      document.getElementById('category-chart'),
      config
    );

    function updateValue(val,label = current) {
      const index = labels.indexOf(label);
      myChart.config.data.datasets[0].data[index] = val;
      myChart.update();
    }
  
    function updateChart() {
      updateValue(getLSM());
      myChart.update();
    }

    function getCatTotal (cat){
        let list = getLSMList();
        let sum = 0;
        if (list) {
            list.forEach( obj => {
                if (obj.category === cat) {
                    sum += parseFloat(obj.amount);
                }
            })
            return sum;            
        }
    }

    function updateValue() {
        labels.forEach(label => {
            let index = labels.indexOf(label);
            myChart.config.data.datasets[0].data[index] = getCatTotal (label);
        })
        myChart.update();
    }
    
    window.categorySpending = myChart;
    window.updateCategory = updateValue;
});

 