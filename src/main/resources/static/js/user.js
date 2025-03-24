function saveUserDetails() {
    const name = document.newUserForm.userName.value;
    if (name.length < 3) {
        alert("Name should be minimum 3 characters");
        document.newUserForm.userName.value = "";
        return false;
    }
    const address = document.newUserForm.address.value;
    if (address.length < 5) {
        alert("Address should be minimum 5 characters");
        document.newUserForm.address.value = "";
        return false;
    }
    const phone = document.newUserForm.phone.value;
    if (phone.length != 10) {
        alert("Mobile number should be of 10 characters");
        document.newUserForm.phone.value = "";
        return false;
    }
    const gstin = document.newUserForm.gstin.value;
    if (gstin.length > 0 && gstin.length != 15) {
        alert("GSTIN should be of 15 characters");
        document.newUserForm.gstin.value = "";
        return false;
    }
    const userRequest = {
        "name": name,
        "address": address,
        "phoneNumber": phone,
        "userType": document.newUserForm.type.value,
        "gstin": gstin
    };
    console.log("API call to newUser");
    fetch("http://localhost:9001/svlcf/newUser", {
            method: "POST",
            body: JSON.stringify(userRequest),
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
            alert("Success!!! \n" + "ID: " + response.id + "\nName: " + response.name + "\nAddress: " + response.address + "\nMobile: " + response.phoneNumber +
                "\nUserType: " + response.userType + "\nGSTIN: " + response.gstin);
            document.newUserForm.userName.value = "";
            document.newUserForm.address.value = "";
            document.newUserForm.phone.value = "";
            document.newUserForm.type.value = "CONSUMER";
            document.newUserForm.gstin.value = "";
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function validateUserAndGetDetails(fromPage) {
    const userId = document.validateUserForm.userId.value;
    if (userId < 1) {
        alert("UserId cannot be less than 1");
        document.validateUserForm.userId.value = "";
        return false;
    }
    console.log("API call to getUserById : " + userId);
    fetch("http://localhost:9001/svlcf/getUserById/" + userId).then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            const response = JSON.parse(JSON.stringify(data));
            document.validateUserForm.userDetails.value = JSON.stringify(data);
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            document.validateUserForm.userDetails.value = "";
            alert("Failed!!! \n" + errorMessage);
        });
    if(fromPage === 'sale') {
        console.log("API call to lastInvoice : " + userId);
        fetch("http://localhost:9001/svlcf/lastInvoice/" + userId).then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(text);
                    });
                }
                return response.text();
            })
            .then(data => {
                window.open(data, "_blank");
            })
            .catch(error => {
                const errorMessage = JSON.parse(error.message).message;
                alert("Failed!!! \n" + errorMessage);
            });
    }
}

function createTableWithUsers() {
    console.log("API call to getAllUsers");
    fetch("http://localhost:9001/svlcf/getAllUsers")
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
            let tableWithUsers = document.getElementById("tableWithUsers");
            let i = 1;
            for (let user of users) {
                let rowInTableWithUsers = tableWithUsers.insertRow(i++);
                rowInTableWithUsers.insertCell(0).innerHTML = user.id;
                rowInTableWithUsers.insertCell(1).innerHTML = user.name;
                rowInTableWithUsers.insertCell(2).innerHTML = user.address;
                rowInTableWithUsers.insertCell(3).innerHTML = user.phoneNumber;
                rowInTableWithUsers.insertCell(4).innerHTML = user.balance;
                rowInTableWithUsers.insertCell(5).innerHTML = user.userType;
                rowInTableWithUsers.insertCell(6).innerHTML = user.gstin;
            }
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function updateUserDetails() {
    const name = document.updateUserForm.name.value;
    if (name.length < 3) {
        alert("Name should be minimum 3 characters");
        document.updateUserForm.name.value = "";
        return false;
    }
    const address = document.updateUserForm.address.value;
    if (address.length > 0 && address.length < 5) {
        alert("Address should be minimum 5 characters");
        document.updateUserForm.address.value = "";
        return false;
    }
    const phone = document.updateUserForm.phone.value;
    if (phone.length > 0 && phone.length != 10) {
        alert("Mobile number should be of 10 characters");
        document.updateUserForm.phone.value = "";
        return false;
    }
    const gstin = document.updateUserForm.gstin.value;
    if (gstin.length > 0 && gstin.length != 15) {
        alert("GSTIN should be of 15 characters");
        document.updateUserForm.gstin.value = "";
        return false;
    }
    if (gstin == "" && address == "" && phone == "" && name == "") {
        alert("At-least one filed should be populated to update user");
        return false;
    }
    const userId = document.validateUserForm.userId.value;
    if (userId == "") {
        alert("Need UserId");
        return false;
    }
    const userRequest = {
        "id": userId,
        "name": name,
        "address": address,
        "phoneNumber": phone,
        "gstin": gstin
    };
    console.log("API call to updateUser");
    fetch("http://localhost:9001/svlcf/updateUser", {
            method: "POST",
            body: JSON.stringify(userRequest),
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
            alert("Success!!! \n" + "ID: " + response.id + "\nName: " + response.name + "\nAddress: " + response.address + "\nMobile: " + response.phoneNumber +
                "\nUserType: " + response.userType + "\nGSTIN: " + response.gstin);
            document.updateUserForm.address.value = "";
            document.updateUserForm.phone.value = "";
            document.updateUserForm.gstin.value = "";
            document.validateUserForm.userId.value = "";
            document.validateUserForm.userDetails.value = "";
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}