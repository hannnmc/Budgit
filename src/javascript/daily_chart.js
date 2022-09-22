import Chart from 'chart.js/auto';

const budgitData = [];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

if (!localStorage.getItem('bData')) {
    localStorage.setItem('bData', '[]')
}

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

    // populate table from LS
    if(getLSDList()) {
        let list = getLSDList(new Date(), true, true);
        list.forEach( (row) => {
            insertRow(row.item,row.category,row.amount);
        })
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
        data: [
            getLSD(days[0]),
            getLSD(days[1]),
            getLSD(days[2]),
            getLSD(days[3]),
            getLSD(days[4]),
            getLSD(days[5]),
            getLSD(days[6])
        ],
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

    // onclick event
    document.getElementById('add-expense').addEventListener("submit", addExpense)

    // insert entries to table with individual removal event listeners
    function insertRow(i,c,a) {
        let table                = document.getElementById('daily-table');
        let row                  = document.createElement('tr');
        let item                 = row.insertCell(-1);
        let category             = row.insertCell(1);
        let amount               = row.insertCell(2);
        let delRow               = row.insertCell(3);
            row.dataset.item     = i;
            item.innerHTML       = i;
            row.dataset.category = c;
            category.innerHTML   = c;
            row.dataset.amount   = a;
            amount.innerHTML     = parseFloat(a).toFixed(2);
            delRow.innerHTML     = "<i class='material-symbols-outlined'>delete</i>";

        amount.classList.add("amount-col");
        delRow.classList.add('del-row')
        delRow.addEventListener('click', () => {
            removeEntry(
                row.dataset.item,
                row.dataset.category,
                row.dataset.amount
            );
            removeRow(delRow);
            updateGraphs();
        })
        table.appendChild(row);
    }

    

    // adds expense by calling insert row, updateLS, and updateValue
    function addExpense(e) { 
        e.preventDefault();

        const item     = (document.getElementById('item').value),
              category = (document.getElementById('category').value);
        let   amount   = (document.getElementById('amount').value);
        if (!item || category === 'none' || !amount) {
                let error  = document.getElementById("error");
                error.style.display = 'block';
                error.innerHTML     = 'Please fill out all fields.';
            setTimeout(() => {
                const error = document.getElementById('error');
                error.style.display = 'none';
            }, 3000); 
        } else {
        insertRow(item,category,amount);
        updateLS(createEntry(item,category,amount));
        parseFloat(getLSD());
        updateValue(getLSD());
        }

    };

    // update chart values and refresh chart
    function updateValue(val=getLSD(),label = labels[6]) {
        const index = labels.indexOf(label);
        myChart.config.data.datasets[0].data[index] = val;
        myChart.update();
    }

    // create new entry to be stored in local storage
    function createEntry (item,category,val,time = new Date()){
        const entry          = {};
        let   m              = monthNames[time.getMonth()],
              d              = time.getDate(),
              y              = time.getFullYear();
              entry.y        = y;
              entry.m        = m;
              entry.d        = d;
              entry.item     = item;
              entry.category = category;
              entry.amount   = val;
        return entry;
    }

    // update local storage
    function updateLS(data) {
        let old =  JSON.parse(localStorage.getItem('bData'));
        localStorage.setItem('bData', JSON.stringify([...old, data]));
    }
    
    // get monthly total spending
    function getLSM(time = new Date(), income = false) {
        let list = getLSMList(time,income);
        let sum = parseFloat(0);
            list.forEach( obj => {
                sum += parseFloat(obj.amount);
            })
        return sum;
    }

    // get a list of monthly spending or income transactions
    function getLSMList(time = new Date(),income = false){
        const m = monthNames[time.getMonth()];
        const y = time.getFullYear();
        const bData = JSON.parse(localStorage.getItem('bData'));
        let list = [];
        if (bData && !income){
            list = bData.filter(obj => obj.y === y && obj.m === m && obj.category !== 'Income')    
        } else if (bData && income) {
            list = bData.filter(obj => obj.y === y && obj.m === m && obj.category === 'Income')  
        }
        return list;
    }

    // dynamically get daily spending/income/both from local storage
    function getLSD(time = new Date(), income = false, full = false){
        let list = getLSDList(time, income, full);
        let sum = parseFloat(0);
        list.forEach( obj => {
            sum += parseFloat(obj.amount);
        })
        return sum;
    }


    // get list of daily transaction
    function getLSDList(time = new Date(),income = false, full = false){
        const m     = monthNames[time.getMonth()],
              d     = time.getDate(),
              y     = time.getFullYear(),
              bData = JSON.parse(localStorage.getItem('bData'));
        let   list  = [];
        if (bData && !income && !full){
            list = bData.filter(obj => obj.y === y && obj.m === m && obj.d === d && obj.category !== 'Income') 
        } else if (bData && income && !full) {
            list = bData.filter(obj => obj.y === y && obj.m === m && obj.d === d && obj.category === 'Income') 
        } else if (bData && full) {
            list = bData.filter(obj => obj.y === y && obj.m === m && obj.d === d) 
        }
        return list;
    }

    function removeEntry(item,category,amount,time = new Date()){
        const bData = JSON.parse(localStorage.getItem('bData'));
        const m     = monthNames[time.getMonth()],
              d     = time.getDate(),
              y     = time.getFullYear(),
              i     = item,
              c     = category,
              a     = parseFloat(amount);
        if (bData){
            let item = bData.filter(obj => 
                obj.y === y 
                && obj.m === m 
                && obj.d === d 
                && obj.item === i 
                && obj.category === c 
                && parseFloat(obj.amount) === a
            )
            if (item.length > 0){
                bData.splice(bData.indexOf(item[0]),1);
                localStorage.setItem('bData', JSON.stringify(bData));
            }
            
        }
    }

    function removeRow(btn) {
        let row = btn.parentNode;
        row.parentNode.removeChild(row);
    }

    // update all charts simultaneously
    function updateGraphs(){
        updateValue();
        updateCategory();
        updateMonthlyS();
        updateMonthlyI();
    }   


    window.getLSM = getLSM;
    window.getLSMList = getLSMList;
    
});

