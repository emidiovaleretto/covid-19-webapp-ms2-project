function changeBackgroundColor(event) {
    let body = document.body;
    let box = document.getElementsByClassName("box");
    let icon = document.getElementsByClassName('btn-light')[0];
    icon.classList.replace('btn-light', 'btn-warning');

    if (body.id === 'darkgray') {
        body.style.backgroundColor = '#FFFFFF';

        for (let i = 0; i < box.length; i++) {
            box[i].style.backgroundColor = '#e9e9e9';
            box[i].style.color = '#000000';
            box[i].style.boxShadow = '8px 8px 10px #3B3C39';
        }
    }
    else {
        body.style.backgroundColor = '#181818';
    }
}

let clickableIcon = document.getElementById('clickable-icon');
clickableIcon.addEventListener('click', changeBackgroundColor);