function updateCalenderField() {
    const reportType = document.reportsForm.reportType.value;
    let period = document.reportsForm.duration;
	if(reportType == "dailyStock" || reportType == "dailyBalance" || reportType == "dailySales"){
		period.setAttribute('type', 'date');
	} else{
		period.setAttribute('type', 'month');
	}
    blockFutureDates();
}

function getDailyReport() {
    const reportType = document.reportsForm.reportType.value;
    const duration = document.reportsForm.duration.value;
    const saleRequest = {
        "type": reportType,
        "date": duration
    };
    console.log("API call to dailyReports");
    fetch("http://localhost:9001/svlcf/reports", {
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
            document.reportsForm.duration.value = "yyyy-MM-dd";
			window.open(data, "_blank");
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            document.reportsForm.duration.value = "yyyy-MM-dd";
            alert("Failed!!! \n" + errorMessage);
        });
}

function getUserReport() {
    const userId = document.userSummaryForm.userId.value;
    if (userId < 1) {
        alert("userId cannot be less than 1");
        document.userSummaryForm.userId.value = "";
        return false;
    }
    console.log("API call to getUserReport : " + userId);
    fetch("http://localhost:9001/svlcf/getUserReport/" + userId).then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.text();
        })
        .then(data => {
            document.userSummaryForm.userId.value = "";
            window.open(data, "_blank");
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}

function blockFutureDates() {
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    document.reportsForm.duration.setAttribute('max', date);
}

function generateDuplicateOrReplaceInvoice() {
	const operation = document.duplicateInvoiceForm.operation.value;
    const invoiceId = document.duplicateInvoiceForm.invoiceId.value;
    if (invoiceId < 1) {
        alert("invoiceId cannot be less than 1");
        document.duplicateInvoiceForm.invoiceId.value = "";
        return false;
    }
    console.log("API call to generateDuplicateOrReplaceInvoice : " + invoiceId);
    fetch("http://localhost:9001/svlcf/duplicateOrReplaceInvoice/" + operation + "/" + invoiceId).then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.text();
        })
        .then(data => {
            document.duplicateInvoiceForm.invoiceId.value = "";
            window.open(data, "_blank");
        })
        .catch(error => {
            const errorMessage = JSON.parse(error.message).message;
            alert("Failed!!! \n" + errorMessage);
        });
}