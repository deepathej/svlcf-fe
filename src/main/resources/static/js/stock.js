function createTableWithStock() {
    console.log("API call to getStock");
    fetch("http://localhost:9001/svlcf/getStock")
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            const stock = JSON.parse(JSON.stringify(data));
            let tableWithStock = document.getElementById("tableWithStock");
            let i = 1;
            for (let singleStock of stock) {
                let rowInTableWithStock = tableWithStock.insertRow(i++);
                rowInTableWithStock.insertCell(0).innerHTML = singleStock.brand;
                rowInTableWithStock.insertCell(1).innerHTML = singleStock.name;
                rowInTableWithStock.insertCell(2).innerHTML = singleStock.variant;
                rowInTableWithStock.insertCell(3).innerHTML = singleStock.quantity;
                rowInTableWithStock.insertCell(4).innerHTML = singleStock.price;
            }
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function populateBrandField(getAllBrands) {
    console.log("API call to getBrandFilters");
    fetch("http://localhost:9001/svlcf/getBrandFilters/" + getAllBrands).then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            const brands = JSON.parse(JSON.stringify(data));
            let option = '<option>brand</option>';
            for (let brand of brands) {
                option += '<option value="' + brand + '">' + brand + '</option>';
            }
            document.validateStockForm.brand.innerHTML = option;
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function populateItemField(getAllItems, fromPage) {
    const brand = document.validateStockForm.brand.value;
    console.log("API call to getItemFilters");
    fetch("http://localhost:9001/svlcf/getItemFilters/" + getAllItems + "/" + brand).then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            const items = JSON.parse(JSON.stringify(data));
            let item_element = document.validateStockForm.item;
            if (!items) {
                item_element.innerHTML = '<option>item</option>';
                return;
            }
            if(fromPage === 'sale'){
                document.getElementById("price").setAttribute("placeholder", "price");
                document.getElementById("quantity").setAttribute("placeholder", "quantity");
                document.validateStockForm.quantity.value = "";
                document.validateStockForm.price.value = "";
                document.validateStockForm.variant.innerHTML = '<option>variant</option>';
            }
            let option = '<option>item</option>';
            for (let item of items) {
                option += '<option value="' + item + '">' + item + '</option>';
            }
            item_element.innerHTML = option;
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function populateVariantField(getAllVariants, fromPage) {
    const brand = document.validateStockForm.brand.value;
    const item = document.validateStockForm.item.value;
    console.log("API call to getVariantFilters");
    fetch("http://localhost:9001/svlcf/getVariantFilters/" + getAllVariants + "/" + brand + "/" + item).then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            const variants = JSON.parse(JSON.stringify(data));
            let variant_element = document.validateStockForm.variant;
            if (!variants) {
                variant_element.innerHTML = '<option>variant</option>';
                return;
            }
            if(fromPage === 'sale'){
                document.getElementById("price").setAttribute("placeholder", "price");
                document.getElementById("quantity").setAttribute("placeholder", "quantity");
                document.validateStockForm.quantity.value = "";
                document.validateStockForm.price.value = "";
            }
            let option = '<option>variant</option>';
            for (let variant of variants) {
                option += '<option value="' + variant + '">' + variant + '</option>';
            }
            variant_element.innerHTML = option;
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function validateStockAndGetDetails(fromPage) {
    const stockRequest = {
        "name": document.validateStockForm.item.value,
        "brand": document.validateStockForm.brand.value,
        "variant": document.validateStockForm.variant.value
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
            const response = JSON.stringify(data);
            if(fromPage === "addStock"){
                document.validateStockForm.stockDetails.value = response;
                document.addStockForm.price.setAttribute("placeholder", "Price - " + JSON.parse(response).price);
            } else if(fromPage === "priceUpdate") {
                document.validateStockForm.stockDetails.value = response;
                document.priceUpdateForm.price.setAttribute("placeholder", "Price - " + JSON.parse(response).price);
            } else {
                const parsedResponse = JSON.parse(response);
                document.getElementById("price").setAttribute("placeholder", parsedResponse.price);
                document.getElementById("quantity").setAttribute("placeholder", parsedResponse.quantity);
            }
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function stockPriceUpdate() {
    const price = document.priceUpdateForm.price.value;
    if (price < 1) {
        alert("Price should be greater than 0");
        document.priceUpdateForm.price.value = "";
        return false;
    }
    const stockDetailsForValidation = document.validateStockForm.stockDetails.value;
    if (stockDetailsForValidation == "") {
        alert("Failed!!!\n Need stockDetails");
        return false;
    }
    const stockId = JSON.parse(document.validateStockForm.stockDetails.value).id;
    console.log("API call to updateStockPrice");
    fetch("http://localhost:9001/svlcf/updateStockPrice/" + stockId + "/" + price, {
            method: "PUT"
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
            alert("Success!!! \n" + "ID: " + response.id + "\nName: " + response.name + "\nBrand: " + response.brand + "\nPrice: " + response.price + "\nQuantity: " + response.quantity + "\nVariant: " + response.variant);
            document.validateStockForm.brand.value = "";
            document.validateStockForm.item.value = "item";
            document.validateStockForm.variant.value = "variant";
            document.validateStockForm.stockDetails.value = "";
            document.priceUpdateForm.price.value = "";
            let priceElement = document.priceUpdateForm.price;
            priceElement.setAttribute("placeholder", "Price");
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function addStock() {
    const price = document.addStockForm.price.value;
    if (price < 1) {
        alert("Price should be greater than 0");
        document.addStockForm.price.value = "";
        return false;
    }
    const quantity = document.addStockForm.quantity.value;
    if (quantity < 1) {
        alert("Quantity should be greater than 0");
        document.addStockForm.quantity.value = "";
        return false;
    }
    const userId = document.validateUserForm.userId.value;
    if (userId == "") {
        alert("Need UserId");
        return false;
    }
    const stockDetails = document.validateStockForm.stockDetails.value;
    if (stockDetails == "") {
        alert("need stockDetails");
        return false;
    }
    console.log("API call to updateStock");
    fetch("http://localhost:9001/svlcf/updateStock/" + userId + "/" + quantity + "/" + price, {
            method: "POST",
            body: stockDetails,
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
            alert("Success!!! \n" + "ID: " + response.id + "\nName: " + response.name + "\nBrand: " + response.brand + "\nPrice: " + response.price +
                "\nQuantity: " + response.quantity + "\nVariant: " + response.variant);
            document.validateStockForm.brand.value = "";
            document.validateStockForm.item.value = "item";
            document.validateStockForm.variant.value = "variant";
            document.validateUserForm.userId.value = "";
            document.validateUserForm.userDetails.value = "";
            document.validateStockForm.stockDetails.value = "";
            document.addStockForm.price.value = "";
            document.addStockForm.quantity.value = "";
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function saveNewStockToDB() {
    const stockName = document.newStockForm.stockName.value;
    if (stockName.length < 3) {
        alert("Item should be minimum 3 characters");
        document.newStockForm.newStockForm.value = "";
        return false;
    }
    const brand = document.newStockForm.brand.value;
    if (brand.length < 3) {
        alert("Brand should be minimum 3 characters");
        document.newStockForm.brand.value = "";
        return false;
    }
    const price = document.newStockForm.price.value;
    if (price < 1) {
        alert("Price should be greater than 0");
        document.newStockForm.price.value = "";
        return false;
    }
    const quantity = document.newStockForm.quantity.value;
    if (quantity < 1) {
        alert("Quantity should be greater than 0");
        document.newStockForm.quantity.value = "";
        return false;
    }
    const variant = document.newStockForm.variant.value;
    if (variant < 1) {
        alert("Variant should be greater than 0");
        document.newStockForm.variant.value = "";
        return false;
    }
    const userId = document.validateUserForm.userId.value;
    if (userId == "") {
        alert("UserDetails is required");
        return false;
    }
    const stockRequest = {
        "userId": userId,
        "stock": {
            "name": stockName,
            "brand": brand,
            "price": price,
            "quantity": quantity,
            "variant": variant
        }
    };
    console.log("API call to newStock");
    fetch("http://localhost:9001/svlcf/newStock", {
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
            alert("Success!!! \n" + "ID: " + response.id + "\nName: " + response.name + "\nBrand: " + response.brand + "\nPrice: " + response.price +
                "\nQuantity: " + response.quantity + "\nVariant: " + response.variant);
            document.newStockForm.stockName.value = "";
            document.newStockForm.brand.value = "";
            document.newStockForm.price.value = "";
            document.newStockForm.quantity.value = "";
            document.newStockForm.variant.value = "";
            document.validateUserForm.userId.value = "";
            document.validateUserForm.userDetails.value = "";
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}