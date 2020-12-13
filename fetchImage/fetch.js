console.log("about to fetch a rainbow");

async function catchRainbow(){
  //This does exactly the same thing as .then() below
  //Await the result of fetch and store that result in response
  const response = await fetch("rainbow.jpg");
  console.log(response);
  const blob = await response.blob();
  console.log(blob);
  document.getElementById('rainbow').src = URL.createObjectURL(blob);
}

catchRainbow().then(response => {
  console.log("yay");
}).catch(error => {
  console.error(error);
});//catch handles stuff goes wrong;


//--- Altanative way....
fetch("rainbow.jpg").then(response => {
  console.log(response);
  return response.blob();
})
.then(blob =>{
  console.log(blob);

  //Placing the data as a blob into the source attribtue of the image DOM element.
  document.getElementById('rainbow').src = URL.createObjectURL(blob);
  //URL.createObjectURL(): Takes a blob object and turns it into image format
})
.catch(error => {
  console.error(error);
});//catch handles stuff goes wrong
