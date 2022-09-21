document.addEventListener("DOMContentLoaded", e => {

    const openmodal = document.getElementById('help-info');
    const modal= document.querySelector('.modal-wrapper');
    const closemodal = document.querySelector('.close-button');

    openmodal.addEventListener ('click', () => {
        modal.classList.add('active');
    });
    closemodal.addEventListener ('click', () => {
        modal.classList.remove('active');
    });
});

