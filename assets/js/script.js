function changeBackgroundColor(event) {

    /* This function changes the background color of the HTML elements. */

    let body = document.body;
    let box = document.getElementsByClassName("box");

    if (this.classList.contains('btn-outline-dark')) {
        this.classList.replace('btn-outline-dark', 'btn-outline-warning');
        body.style.backgroundColor = '#FFFFFF';

        for (let i = 0; i < box.length; i++) {
            box[i].style.backgroundColor = '#e9e9e9';
            box[i].style.color = '#000000';
            box[i].style.boxShadow = '8px 8px 10px #3B3C39';
        }
    }
    else {
        this.classList.replace('btn-outline-warning', 'btn-outline-dark');
        body.style.backgroundColor = '#181818';

        for (let i = 0; i < box.length; i++) {
            box[i].style.backgroundColor = '#3B3C39';
            box[i].style.color = '#FFFFFF';
            box[i].style.boxShadow = '8px 8px 20px #000000';
        }
    }
}

let icon = document.getElementById('clickable-icon');
icon.addEventListener('click', changeBackgroundColor);

//create empty array
let global = [];
let country = [];


window.addEventListener("load", function () {
    coronavirusApi();

});


const url = 'https://api.covid19api.com/summary';
async function coronavirusApi() {

    const response = await fetch(url);
    const data = await response.json();
    const globalData = data.Global;
    const countries = data.Countries;
    country = countries;
    console.log(country);
    global = globalData;
    addTextContent();
}

function addTextContent() {

    lastUpdate.innerHTML = global.Date;
    newConfirmed.innerHTML = global.NewConfirmed;
    totalConfirmed.innerHTML = global.TotalConfirmed;
    dailyDeaths.innerHTML = global.NewDeaths;
    totalDeaths.innerHTML = global.TotalDeaths;
    newRecovered.innerHTML = global.NewRecovered;
    totalRecovered.innerHTML = global.TotalRecovered;
    addFlagImage();

}

let lastUpdate = document.getElementById('last-updated');
let newConfirmed = document.getElementById("new-confirmed");
let totalConfirmed = document.getElementById("total-confirmed");
let dailyDeaths = document.getElementById("daily-deaths");
let totalDeaths = document.getElementById("total-deaths");
let newRecovered = document.getElementById('daily-recovered');
let totalRecovered = document.getElementById('total-recovered');


// function addFlagImage() {
//     const url = `https://icons.iconarchive.com/icons/wikipedia/flags/1024/${country[80].CountryCode}-${country[80].Country}-Flag-icon.png`
//     countryFlag.setAttribute('src', url);
// }

// let countryFlag = document.getElementById('flag');