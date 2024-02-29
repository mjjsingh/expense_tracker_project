//expense.js

async function submitExpenseForm(e) {
    e.preventDefault(); // Prevent form from being submitted

    // Manually create an object with the form data
    var formData = {
        amount: document.getElementById('amount').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value
    };

    try {
        // Use axios to send the form data to the server
        let response = await axios({
            method: 'post',
            url: '/expenses',
            data: formData,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });

        if (response.status !== 200) {
            alert('Error occurred while adding expense');
            return;
        }

        // If the response is OK, get the updated list of expenses
        let data = response.data;

        // Display the expenses on the screen
        displayExpenses(data.expenses);
        e.target.reset();
    } catch (error) {
        console.error('Error:', error);
    }
}



function displayExpenses(expenses) {
    var expensesDiv = document.getElementById('expenses');
    expensesDiv.innerHTML = '';
    expenses.forEach(expense => {
        var p = document.createElement('p');
        p.textContent = `Amount: ${expense.amount}, Description: ${expense.description}, Category: ${expense.category}`;
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteExpense(expense.id);
        };
        p.appendChild(deleteButton);
        expensesDiv.appendChild(p);
    });
}

async function deleteExpense(id) {
    try {
        let response = await fetch('/expenses/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (!response.ok) {
            alert('Error occurred while deleting expense');
            return;
        }
        let data = await response.json();
        displayExpenses(data.expenses);
    } catch (error) {
        console.error('Error:', error);
    }
}

// When the page loads, fetch the expenses from the server and display them
window.onload = async function() {
    try {
        let response = await axios({
            method: 'get',
            url: '/expenses',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });

        if (response.status !== 200) {
            alert('Error occurred while fetching expenses');
            console.error('Response status:', response.status);
            return;
        }

        let data = response.data;
        displayExpenses(data.expenses);
    } catch (error) {
        console.error('Fetch error:', error);
    }
};


