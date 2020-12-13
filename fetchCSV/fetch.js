//Data source: https://data.giss.nasa.gov/gistemp/
//About global mean temperture: https://earthobservatory.nasa.gov/world-of-change/global-temperatures
async function getData(){
  const xs =[];
  const ys = [];

  const response = await fetch("ZonAnn.Ts+dSST.csv");
  const data = await response.text();
  // console.log(data);

  //split(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
  //slice(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  const table = data.split("\n");//\n indicate a line break or new line
  const cleanedTable = table.slice(1, table.length-1);//To clean up the unneed empty row at last in the CSV.file
  // console.log(rows);

  //forEach(): https://www.w3schools.com/jsref/jsref_foreach.asp
  cleanedTable.forEach(row => {
    const columns = row.split(",");
    const year = columns[0];
    xs.push(year);
    const temperture = columns[1];
    ys.push(parseFloat(temperture)+14);
    // console.log(year, temperture);
  });

  // console.log({xs, ys});
  //Return javascript object include 2 Arrays
  return {xs, ys};
}

async function chartIt(){
  const data = await getData();//ChartIt is going to wait till the getData is done.

  const ctx = document.getElementById('chart').getContext('2d');
  const color = [];
  for(let i=0; i<data.xs.length; i++){
    color.push('rgba(54, 162, 235, 0.5)');
  }
  const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: data.xs,
          datasets: [{
              label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in C°',
              data: data.ys,
              backgroundColor: color,
              borderColor: color,
              fill: false,
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: false,
                      callback: function(value, index, values){
                        return value + "°";
                      }
                  }
              }]
          }
      }
  });
}
chartIt();
