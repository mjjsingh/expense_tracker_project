// submitExpenseForm.js
window.submitExpenseForm = async function(e) {
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

        console.log('Response:', response); // Log the response for debugging

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
        alert('An error occurred. Please check the console for more details.');
    }
};

