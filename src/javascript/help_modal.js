document.addEventListener("DOMContentLoaded", e => {

    const openmodal = document.getElementById('help-info');
    const modal= document.getElementsByClassName('modal-wrapper');
    const closemodal = document.getElementsByClassName('close-button');

    openmodal.addEventListener ('click', () => {
        modal.classList.add('active');
    });
    console.log(closemodal);
    closemodal.addEventListener ('click', () => {
        modal.classList.remove('active');
    });
});

