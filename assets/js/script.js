let body = document.body;
let box = document.getElementsByClassName("box-container");

function themeMode(backgroundColor, backgroundColorBoxes, fontColor, boxShadow) {

    /**
     * This function receives as parameters: backgroundColor, 
     * backgroundColorBoxes, fontColor and boxShadow. Afterwards, 
     * it is called by the changeBackgroundColor() function and 
     * passed the corresponding values.
     */

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
        themeMode('#FFFFFF', '#e9e9e9', '#000000', '8px 8px 10px #3B3C39');

    }
    else {

        this.classList.replace('btn-outline-warning', 'btn-outline-dark');
        themeMode('#181818', '#3B3C39', '#FFFFFF', '8px 8px 20px #000000');
    }
}

let icon = document.getElementById('clickable-icon');
icon.addEventListener('click', changeBackgroundColor);

// Build the API

let globalResponse = [];
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
        globalResponse = globalData;

        loadCountriesList();
        addData(globalResponse);

    } catch (error) {
        alert('Oops! It seems there is an issue with the api response. Please try again later.');
    }
}

function addData(data) {

    /* This function add data to the HTML document. */

    Object.entries(data).forEach(([key, value]) => {

        if (data[key] == 0) {
            $(`#${key}`).html('No data');
        }
        else {
            $(`#${key}`).html(decimalPoint(value));

            if (key == 'Date')
                $('#Date').html(formatDate(data[key]));
        }
    });
}

let countryFlag = document.getElementById('flag');


function loadCountriesList() {

    /* This function loads the country list and append it to the <option> HTML tag. */

    for (let i = 0; i < country.length; i++) {

        let option = document.createElement('option');
        option.value = option.textContent = country[i].Slug;
        option.text = option.textContent = country[i].Country;
        select.append(option);
    }
}


function decimalPoint(number) {

    /**
     * This function adds a decimal point after every
     * three digits in the number given as argument.
     * E.g., 
     * without function -> Total Confirmed: 241215431
     * with function -> Total Confirmed: 241.215.431
     */

    return number.toLocaleString('pt-Br');
}

function addZeroDigitToHour(number) {

    /**
     * This functions adds the zero digit to the hour/minute 
     * if hour/minute is less than 10. 
     * E.g., time: 13:05
     */

    if (number < 10) {
        return '0' + number;

    } else {
        return number;
    }
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

    return `${dayOfWeek}, ${monthName} ${day}, ${year} - ${[hour, minute].map(addZeroDigitToHour).join(':')}`;
}


function getSelectedCountry(event) {

    /* This function gets the country seleted from <select> input. */

    let selectedCountry = this.options[this.selectedIndex].text;

    for (let i = 0; i < country.length; i++) {

        if (selectedCountry === country[i].Country) {

            addData(country[i]);

            let countryCode = country[i].CountryCode.toLowerCase();

            const url = `./assets/img/all-countries-flag/${countryCode}.png`;
            countryFlag.setAttribute('src', url);
            countryFlag.setAttribute('alt', `${country[i].Country} Flag`);

        } else if (selectedCountry === 'Worldwide') {

            addData(globalResponse);
            countryFlag.setAttribute('src', "./assets/img/global.png");
            countryFlag.setAttribute('alt', "Global Image");
        }
    }

}

let select = document.getElementById('country');
select.addEventListener('change', getSelectedCountry);
