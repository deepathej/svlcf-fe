async function generateDataHealthGraph() {
  var ctx = document.getElementById('dataHealthGraph').getContext('2d');
  const response = await fetch('http://localhost:9001/svlcf/dataHealthGraph');
  const data = await response.json();
  var myChart = new Chart(ctx, {
      type: 'bar', // Bar chart type
      data: {
          labels: ['Backup', 'StockReport', 'UserData'], // X-axis labels
          datasets: [{
              label: 'Data Health Graph',
              data: [10, 10, 10], // Data points
              backgroundColor: [
                  data.dataBaseBackup, data.stockReport, data.userData // Colors for each bar
              ]
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}