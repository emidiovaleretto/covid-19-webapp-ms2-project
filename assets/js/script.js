let log = console.log;
let body = document.body;
let box = document.getElementsByClassName("box-container");

function themeMode(backgroundColor, backgroundColorBoxes, fontColor, boxShadow) {

    /* This function receives as parameters: backgroundColor, 
       backgroundColorBoxes, fontColor and boxShadow. Afterwards, 
       it is called by the changeBackgroundColor() function and 
       passed the corresponding values. */

    body.style.backgroundColor = backgroundColor;

    for (let i = 0; i < box.length; i++) {
        box[i].style.backgroundColor = backgroundColorBoxes;
        box[i].style.color = fontColor;
        box[i].style.boxShadow = boxShadow;
    }
}

function changeBackgroundColor(event) {

    /* This function changes the background color of the HTML elements. */

    if (this.classList.contains('btn-outline-dark')) {

        this.classList.replace('btn-outline-dark', 'btn-outline-warning');
        themeMode('#FFFFFF', '#e9e9e9', '#000000', '8px 8px 10px #3B3C39')

    }
    else {

        this.classList.replace('btn-outline-warning', 'btn-outline-dark');
        themeMode('#181818', '#3B3C39', '#FFFFFF', '8px 8px 20px #000000')
    }
}

let icon = document.getElementById('clickable-icon');
icon.addEventListener('click', changeBackgroundColor);

// Build the API

let global = [];
let country = [];


// This event listener is fired upon the browser window is loaded.
window.addEventListener("load", function () {
    coronavirusDataApi();

});


const url = 'https://api.covid19api.com/summary';

async function coronavirusDataApi() {

    /* This function loads the data from the API. */

    try {

        const response = await fetch(url);
        const data = await response.json();
        const globalData = data.Global;
        const countries = data.Countries;

        country = countries;
        global = globalData;

        loadCountryList();

    } catch (error) {
        alert('Oops! It seems there is an issue with the api response. Please try again later.');
    }
}

function addData(data) {

    /* This function add data to the HTML document. */

    lastUpdate.innerHTML = formatDate(data.Date);
    newConfirmed.innerHTML = decimalPoint(data.NewConfirmed);
    totalConfirmed.innerHTML = decimalPoint(data.TotalConfirmed);
    dailyDeaths.innerHTML = decimalPoint(data.NewDeaths);
    totalDeaths.innerHTML = decimalPoint(data.TotalDeaths);
    newRecovered.innerHTML = decimalPoint(data.NewRecovered);
    totalRecovered.innerHTML = decimalPoint(data.TotalRecovered);

}

let lastUpdate = document.getElementById('last-updated');
let newConfirmed = document.getElementById("new-confirmed");
let totalConfirmed = document.getElementById("total-confirmed");
let dailyDeaths = document.getElementById("daily-deaths");
let totalDeaths = document.getElementById("total-deaths");
let newRecovered = document.getElementById('daily-recovered');
let totalRecovered = document.getElementById('total-recovered');
let countryFlag = document.getElementById('flag');


function loadCountryList() {

    /* This function loads the country list and append it to the <option> HTML tag. */

    for (let i = 0; i < country.length; i++) {
        $('select').append($('<option>', {
            value: country[i].Slug,
            text: country[i].Country
        }));
    }
}


function toCapitalize(str) {

    /* This function receives a string and capitalize 
        the first letter of each word in a string. 
        
       This function was created to format the
        string to fit the url that loads the flag image.
        
        */

    str = str.split('-');

    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }

    newString = str.join('-');

    return newString;
}


function decimalPoint(number) {

    /* This function adds a decimal point after every
       three digits in the number given as argument. */

    return number.toLocaleString('pt-Br');
}


function formatDate(date) {

    /* This function converts a date to a string format. */

    date = new Date(date);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    let dayOfWeek = days[date.getDay()];
    let monthName = months[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();

    return `${dayOfWeek}, ${monthName} ${day} ${year} ${hour}:${minute}`
}


function getSelectedCountry(select) {

    /* This function gets the country seleted from <select> input. */

    let selectedCountry = select.options[select.selectedIndex].text;

    for (let i = 0; i < country.length; i++) {

        if (selectedCountry === country[i].Country) {

            addData(country[i]);

            let countrySlug = toCapitalize(country[i].Slug);

            const url = `https://icons.iconarchive.com/icons/wikipedia/flags/1024/${country[i].CountryCode}-${countrySlug}-Flag-icon.png`
            countryFlag.setAttribute('src', url);
            countryFlag.setAttribute('alt', `${country[i].Country} Flag`);

        } else if (selectedCountry === 'Worldwide') {
            addData(global);

            let path = "./assets/img/global.png";
            countryFlag.setAttribute('src', path);

        }
    }

}
