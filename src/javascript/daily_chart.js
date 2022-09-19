import Chart from 'chart.js/auto';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
  
    return previous;
}

let dailyTotal = 0;

document.addEventListener("DOMContentLoaded", e => {

    const days = [];
    let day = new Date();
    while (days.length < 7) {
        days.unshift(day);
        day = getPreviousDay(day);
    }

    let monthArray = [
        monthNames[days[0].getMonth()],
        monthNames[days[1].getMonth()],
        monthNames[days[2].getMonth()],
        monthNames[days[3].getMonth()],
        monthNames[days[4].getMonth()],
        monthNames[days[5].getMonth()],
        monthNames[days[6].getMonth()]
    ];

    let dayArray = [
        days[0].getDate(),
        days[1].getDate(),
        days[2].getDate(),
        days[3].getDate(),
        days[4].getDate(),
        days[5].getDate(),
        days[6].getDate()
    ];

    const labels = [
        `${monthArray[0]} ${dayArray[0]}`,
        `${monthArray[1]} ${dayArray[1]}`,
        `${monthArray[2]} ${dayArray[2]}`,
        `${monthArray[3]} ${dayArray[3]}`,
        `${monthArray[4]} ${dayArray[4]}`,
        `${monthArray[5]} ${dayArray[5]}`,
        `${monthArray[6]} ${dayArray[6]}`
    ];

    let today = `${monthArray[6]} ${dayArray[6]}`

    const data = {
    labels: labels,
    datasets: [{
        label: 'Daily Spending',
        data: [65, 59, 80, 81, 56, 55, dailyTotal],
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
    
    function insert_Row(i,c,a) {
        let row =document.getElementById('daily-table').insertRow(-1);
        let item = row.insertCell(-1);
        let category = row.insertCell(1);
        let amount = row.insertCell(2);
        item.innerHTML=i;
        item.classList.add("item-col");
        category.innerHTML=c;
        category.classList.add("category-col")
        amount.innerHTML=parseFloat(a).toFixed(2);
        amount.classList.add("amount-col");
    }

    document.getElementById('add-expense').addEventListener("submit", addExpense)

    function addExpense(e) { 
        e.preventDefault();
        const item = (document.getElementById('item').value);
        const category = (document.getElementById('category').value);
        let amount = (document.getElementById('amount').value);
        if (!item || category === 'none' || !amount) {
            let error = document.getElementById("error");
            error.style.display = 'block';
            error.innerHTML = 'Please fill out all fields.';
            setTimeout(() => {
                const error = document.getElementById('error');
                error.style.display = 'none';
              }, 3000); 
        } else {
        insert_Row(item,category,amount);

        parseFloat(dailyTotal);
        dailyTotal += (parseFloat(amount));
        console.log(dailyTotal)
        }

        updateValue(dailyTotal)
    };

    function updateValue(val,label = today) {
        const index = labels.indexOf(label);
        console.log(index);
        myChart.config.data.datasets[0].data[index] = val;
        myChart.update();
    }
});

 