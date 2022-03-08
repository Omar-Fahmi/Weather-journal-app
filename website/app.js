/* Global Variables */
//these consts will make it ez for us to callback in coding
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=e7462b564406bef96c46f760ac8f4a82&units=metric";
const zipArea = document.getElementById("zip");
const baseFeelings = document.getElementById("feelings");
const temprature = document.getElementById("temp");
// Create a new date instance dynamically with JS
let d = new Date();
//add 1 to make a natural numeric
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//Event listener to add function to exiting html dom elemnt
document.getElementById('generate').addEventListener('click', () =>{
    //check if the user click on button without type anything 
    if(zipArea.value.trim() === "" || baseFeelings.value.trim() === ""){
        alert("please enter zip code and feelings")
        return;
    }
    getWeatherInfo(baseUrl, zipArea.value, apiKey)
    .then((data) =>{
        sendData('/giveData',{
            date: newDate,
            temp: data.main.temp,
            content: baseFeelings.value
        });
    })
    .then(() =>{
        updateUI();
    });
});


//get rout
const getWeatherInfo = async (baseUrl, zipArea, apiKey) => {

    const fetchWeather = await fetch( baseUrl + zipArea + apiKey);
    
    try{
        const data = await fetchWeather.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

//post rout
const sendData = async (url ='', data = {})=>{
    //post data now to server
    const pushData = await fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });

    try {
        const conclusion = pushData.json();
        return conclusion;
        } catch (error) {
            console.log("error", error);
        }
    }

//function update ui
const updateUI = async () => {
    const fetchData = await fetch('/recieveData');
    try {
        const newData = await fetchData.json();
        document.getElementById("date").innerHTML = newData.date;
        document.getElementById("temp").innerHTML = newData.temp;
        document.getElementById("content").innerHTML = newData.content;
    } catch (error) {
        console.log("error", error);
    }
}