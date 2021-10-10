function changeBackground(event) {
    let body = document.body; 
    body.style.backgroundColor = 'white';
}

let clickableIcon = document.getElementById('clickable-icon');
clickableIcon.addEventListener('click', changeBackground);