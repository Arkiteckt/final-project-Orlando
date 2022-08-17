
// API Call

const api = 'https://covid19.mathdro.id/api?confirmed&recovered&deaths';
const getData = async () => {
  const response = await fetch(`${api}`);
  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(response.status);
  }
};


// Creat Chart and Populate with data

const result = getData();
result
  .then((data) => {
    let dailySummary = Object.values(data.dailySummary);
    let confirmed = Object.values(data.confirmed);
    let recovered = Object.values(data.recovered);
    let deaths = Object.values(data.deaths);
    var ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line', 
      data: {
        labels: dailySummary,
        datasets: [
          {
            label: 'Confirmed Cases',
            data: dailySummary,
            borderColor: 'rgba(255, 99, 132)',
            fill: false,
          },
          {
            label: 'Recovered Cases',
            data: recovered,
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false,
          },
          {
            label: 'Deaths',
            data: deaths,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Number of Cases',
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Date(DD/MM/YYYY)',
              },
            },
          ],
        },
        title: {
          display: true,
          text: `Covid Cases in the World for the last 180 Days`,
        },
      },
    });
  })


