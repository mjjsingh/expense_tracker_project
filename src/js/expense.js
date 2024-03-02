// expense.js
window.onload = async function() {
    // Fetch expenses when the page loads
    window.fetchExpenses();

    // Get the expense form element
    const expenseForm = document.getElementById('expenseForm');

    // Attach the submitExpenseForm function to the form's submit event
    expenseForm.addEventListener('submit', window.submitExpenseForm);
};

// This function will be called when an expense is clicked
window.onExpenseClick = function(id) {
    // Call the deleteExpense function
    window.deleteExpense(id);

    // Fetch and display the updated list of expenses
    window.fetchExpenses();
};







