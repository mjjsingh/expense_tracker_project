// displayExpenses.js

window.displayExpenses = function(expenses) {
    var expensesDiv = document.getElementById('expenses');
    expensesDiv.innerHTML = '';
    expenses.forEach(expense => {
        var p = document.createElement('p');
        p.textContent = `Amount: ${expense.amount}, Description: ${expense.description}, Category: ${expense.category}`;
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            window.deleteExpense(expense.id);
        };
        p.appendChild(deleteButton);
        expensesDiv.appendChild(p);
    });
};


