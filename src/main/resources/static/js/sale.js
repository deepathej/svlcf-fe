function validateAndAddItemToCart() {
    const item = document.validateStockForm.item.value;
    const brand = document.validateStockForm.brand.value;
    const variant = document.validateStockForm.variant.value;
    const quantity = document.validateStockForm.quantity.value;
    if (quantity < 1) {
        alert("Quantity should be greater than 0");
        document.validateStockForm.quantity.value = "";
        return false;
    }
    const price = document.validateStockForm.price.value;
    if (price < 1) {
        alert("Price should be greater than 0");
        document.validateStockForm.price.value = "";
        return false;
    }
    const stockRequest = {
        "name": item,
        "brand": brand,
        "variant": variant
    };
    console.log("API call to getMatchedStock");
    fetch("http://localhost:9001/svlcf/getMatchedStock", {
            method: "POST",
            body: JSON.stringify(stockRequest),
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
            if (response.quantity < quantity) {
                alert("Sale quantity should be less than available quantity : " + response.quantity);
                return false;
            } else {
                let productCartTable = document.getElementById("productInCart");
                const rowsInProductCartTable = productCartTable.rows.length;
                let newTableRow = productCartTable.insertRow(rowsInProductCartTable);
                newTableRow.setAttribute('id', rowsInProductCartTable);
                newTableRow.insertCell(0).innerHTML = response.id;
                newTableRow.insertCell(1).innerHTML = brand;
                newTableRow.insertCell(2).innerHTML = item;
                newTableRow.insertCell(3).innerHTML = variant;
                newTableRow.insertCell(4).innerHTML = quantity;
                newTableRow.insertCell(5).innerHTML = price;
                let button = document.createElement('button');
                button.appendChild(document.createTextNode('Delete'));
                button.setAttribute('name', rowsInProductCartTable);
                button.setAttribute('onclick', 'deleteCartItem(this)');
                newTableRow.insertCell(6).appendChild(button);
                document.validateStockForm.brand.value = "";
                document.validateStockForm.item.value = "item";
                document.validateStockForm.variant.value = "variant";
                document.validateStockForm.quantity.value = "";
                document.validateStockForm.price.value = "";
            }
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function deleteCartItem(element) {
    document.getElementById(element.name).remove();
}

function confirmSale() {
    const userDetailsForValidation = document.validateUserForm.userDetails.value;
    if (userDetailsForValidation == "") {
        alert("Failed!!!\n Need userDetails");
        return false;
    }
    const userDetails = JSON.parse(userDetailsForValidation);
    const stockList = document.getElementById("productInCart").rows;
    const saleProducts = [];
    for (let row of stockList) {
        let values = [];
        if (row.rowIndex != 0) {
            for (let cell of row.cells) {
                if (cell.cellIndex != 6) {
                    values.push(cell.innerText);
                }
            }
            const saleProduct = {
                "id": values[0],
                "brand": values[1],
                "name": values[2],
                "variant": values[3],
                "quantity": values[4],
                "price": values[5]
            };
            saleProducts.push(saleProduct);
        }
    }
    if (saleProducts.length == 0) {
        alert("Failed!!! \n" + "Please add items before confirm sale");
        return false;
    }
    const saleRequest = {
        "saleProducts": saleProducts,
        "user": {
            "id": userDetails.id,
            "name": userDetails.name,
            "address": userDetails.address,
            "phoneNumber": userDetails.phoneNumber,
            "balance": userDetails.balance,
            "userType": userDetails.userType,
            "gstin": userDetails.gstin
        }
    };
    console.log("API call to confirmSale");
    fetch("http://localhost:9001/svlcf/confirmSale", {
            method: "POST",
            body: JSON.stringify(saleRequest),
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
            return response.text();
        })
        .then(data => {
            document.validateUserForm.userDetails.value = "";
            document.validateUserForm.userId.value = "";
            let productCartTable = document.getElementById("productInCart");
            while (productCartTable.rows.length > 1) {
                productCartTable.deleteRow(1);
            }
            window.open(data, "_blank");
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}