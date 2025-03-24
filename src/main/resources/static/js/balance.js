function createUserTableWithBalance() {
    const amount = document.usersWithBalanceForm.amount.value;
    if (amount < 0) {
        alert("Amount cannot be less than 0");
        document.usersWithBalanceForm.amount.value = "";
        deleteExistingDataFromTable(document.getElementById("usersWithBalanceTable"));
        return false;
    }
    const userType = document.usersWithBalanceForm.type.value;
    console.log("API call to getUsersWithBalance");
    fetch("http://localhost:9001/svlcf/getUsersWithBalance/" + amount + "/" + userType)
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            const users = JSON.parse(JSON.stringify(data));
            let userTable = document.getElementById("usersWithBalanceTable");
            deleteExistingDataFromTable(userTable);
            let i = 1;
            let totalAmount = 0;
            for (let user of users) {
                let rowFromUserTable = userTable.insertRow(i++);
                rowFromUserTable.insertCell(0).innerHTML = user.id;
                rowFromUserTable.insertCell(1).innerHTML = user.name;
                rowFromUserTable.insertCell(2).innerHTML = user.address;
                rowFromUserTable.insertCell(3).innerHTML = user.phoneNumber;
                rowFromUserTable.insertCell(4).innerHTML = user.balance;
                rowFromUserTable.insertCell(5).innerHTML = user.userType;
                rowFromUserTable.insertCell(6).innerHTML = user.gstin;
                totalAmount = totalAmount + user.balance;
            }
            //Row to display the total
            let rowFromUserTable = userTable.insertRow(i++);
            rowFromUserTable.insertCell(0).innerHTML = "";
            rowFromUserTable.insertCell(1).innerHTML = "Total-Balance";
            rowFromUserTable.insertCell(2).innerHTML = "";
            rowFromUserTable.insertCell(3).innerHTML = "";
            rowFromUserTable.insertCell(4).innerHTML = totalAmount;
            rowFromUserTable.insertCell(5).innerHTML = "";
            rowFromUserTable.insertCell(6).innerHTML = "";

            if (users.length == 0) {
                alert("Success!!!\nNo users with more balance than " + amount);
            }
            document.usersWithBalanceForm.amount.value = "";
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function deleteExistingDataFromTable(userTable) {
    while (userTable.rows.length > 1) {
        userTable.deleteRow(1);
    }
}