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
        // Use fetch to send the form data to the server
        let response = await fetch('/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            alert('Error occurred while adding expense');
            return;
        }

        // If the response is OK, get the updated list of expenses
        let data = await response.json();

        // Display the expenses on the screen
        displayExpenses(data.expenses);
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
            method: 'DELETE'
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
        let response = await fetch('/expenses');
        if (!response.ok) {
            alert('Error occurred while fetching expenses');
            console.error('Response status:', response.status);
            return;
        }
        let data = await response.json();
        displayExpenses(data.expenses);
    } catch (error) {
        console.error('Fetch error:', error);
    }
};


