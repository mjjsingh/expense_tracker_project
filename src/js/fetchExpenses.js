// fetchExpenses.js

window.fetchExpenses = async function() {
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


