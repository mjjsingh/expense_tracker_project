// deleteExpense.js

window.deleteExpense = async function(id) {
    try {
        let response = await axios({
            method: 'delete',
            url: '/expenses/' + id,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });

        if (!response.ok) {
            alert('Error occurred while deleting expense');
            return;
        }

        let data = await response.data;
        displayExpenses(data.expenses);
    } catch (error) {
        console.error('Error:', error);
    }
};

