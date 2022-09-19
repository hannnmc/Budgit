document.addEventListener("DOMContentLoaded", e => {
    let dailyTotal = 0;
    
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
    };


    
});