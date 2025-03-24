function saveExpensesToDB() {
    const amount = document.expensesForm.amount.value;
    if (amount.length < 1) {
        alert("Amount should be not be less than 1");
        document.expensesForm.amount.value = "";
        return false;
    }
    const remarks = document.expensesForm.remarks.value;
    if (remarks.length < 6) {
        alert("Remarks should be more than 5 characters");
        document.expensesForm.remarks.value = "";
        return false;
    }
    const expenseRequest = {
        "amount": amount,
        "paymentMode": document.expensesForm.paymentMode.value,
        "remarks": remarks
    };
    console.log("API call to addExpense");
    fetch("http://localhost:9001/svlcf/addExpense", {
            method: "POST",
            body: JSON.stringify(expenseRequest),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            const response = JSON.parse(JSON.stringify(data));
            alert("Success!!! \n" + "Amount: " + response.amount + "\nPaymentMode: " + response.paymentMode + "\nRemarks: " + response.remarks +
                "\nDate: " + response.date);
            document.expensesForm.amount.value = "";
            document.expensesForm.paymentMode.value = "CASH";
            document.expensesForm.remarks.value = "";
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function saveChangesToDB() {
    const amount = document.cashDepositForm.amount.value;
    if (amount.length < 1) {
        alert("Amount should be not be less than 1");
        document.cashDepositForm.amount.value = "";
        return false;
    }
    console.log("API call to depositCashToAccount");
    fetch("http://localhost:9001/svlcf/depositCashToAccount/" + amount)
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.text();
        })
        .then(data => {
            alert("Success!!!");
            document.cashDepositForm.amount.value = "";
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function createTableWithTodayExpense() {
    console.log("API call to getTodayExpense");
    fetch("http://localhost:9001/svlcf/getTodayExpense")
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            const items = JSON.parse(JSON.stringify(data));
            let tableWithTodayExpense = document.getElementById("tableWithTodayExpense");
            let i = 1;
            for (let item of items) {
                let rowInTableWithTodayExpense = tableWithTodayExpense.insertRow(i++);
                rowInTableWithTodayExpense.setAttribute('id', item.id);
                rowInTableWithTodayExpense.insertCell(0).innerHTML = item.remarks;
                rowInTableWithTodayExpense.insertCell(1).innerHTML = item.paymentMode;
                rowInTableWithTodayExpense.insertCell(2).innerHTML = item.amount;
                let button = document.createElement('button');
                button.appendChild(document.createTextNode('Delete'));
                button.setAttribute('name', item.id);
                button.setAttribute('onclick', 'deleteCartItem(this)');
                rowInTableWithTodayExpense.insertCell(3).appendChild(button);
            }
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function deleteCartItem(element) {
    document.getElementById(element.name).remove();
    console.log("API call to deleteExpense");
    fetch("http://localhost:9001/svlcf/deleteExpense/" + element.name, {
        method: "DELETE"
    }).then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(text);
            });
        }
        return response.text();
    }).catch(error => {
        const errorMessage = JSON.parse(error.message).message;
        alert("Failed!!! \n" + errorMessage);
    });
}