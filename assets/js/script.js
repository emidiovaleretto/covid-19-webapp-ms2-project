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