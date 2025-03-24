function confirmPayment() {
    const paymentAmount = document.paymentForm.paymentAmount.value;
    if (paymentAmount < 0) {
        alert("paymentAmount should be greater than 0");
        document.paymentForm.paymentAmount.value = "";
        return false;
    }
    const userDetailsForValidation = document.validateUserForm.userDetails.value;
    if (userDetailsForValidation == "") {
        alert("Failed!!!\n Need userDetails");
        console.log("payment without userDetails");
        return false;
    }
    const userDetails = JSON.parse(userDetailsForValidation);
    const paymentRequest = {
        "userId": userDetails.id,
        "paymentMode": document.paymentForm.paymentMode.value,
        "paymentAmount": paymentAmount,
        "previousBalance": userDetails.balance,
        "userType": userDetails.userType
    };
    console.log("API call to newPayment");
    fetch("http://localhost:9001/svlcf/newPayment", {
            method: "POST",
            body: JSON.stringify(paymentRequest),
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
            alert("Success!!! \n" + "UserId: " + response.userId + "\nPaymentMode: " + response.paymentMode +
                "\nPaymentType: " + response.paymentType + "\nPreviousBalance: " + response.previousBalance +
                "\nPaymentAmount: " + response.paymentAmount + "\nBalanceAmount: " + response.balanceAmount + "\nDate: " + response.date +
                "\nTime: " + response.time);
            document.paymentForm.paymentAmount.value = "";
            document.paymentForm.paymentMode.value = "CASH";
            document.validateUserForm.userId.value = "";
            document.validateUserForm.userDetails.value = "";
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function createTableWithTodayPayments() {
    console.log("API call to getTodayPayments");
    fetch("http://localhost:9001/svlcf/getTodayPayments")
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
            let tableWithTodayPayments = document.getElementById("tableWithTodayPayments");
            let i = 1;
            for (let item of items) {
                let rowInTableWithTodayPayments = tableWithTodayPayments.insertRow(i++);
                rowInTableWithTodayPayments.setAttribute('id', item.id);
                rowInTableWithTodayPayments.insertCell(0).innerHTML = item.userId;
                rowInTableWithTodayPayments.insertCell(1).innerHTML = item.paymentMode;
                rowInTableWithTodayPayments.insertCell(2).innerHTML = item.previousBalance;
                rowInTableWithTodayPayments.insertCell(3).innerHTML = item.paymentAmount;
                rowInTableWithTodayPayments.insertCell(4).innerHTML = item.balanceAmount;
                rowInTableWithTodayPayments.insertCell(5).innerHTML = item.time;
                let button = document.createElement('button');
                button.appendChild(document.createTextNode('Delete'));
                button.setAttribute('name', item.id);
                button.setAttribute('onclick', 'deleteCartItem(this)');
                rowInTableWithTodayPayments.insertCell(6).appendChild(button);
            }
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function deleteCartItem(element) {
    console.log("API call to deletePayment");
    fetch("http://localhost:9001/svlcf/deletePayment/" + element.name, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(element.name).remove();
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}