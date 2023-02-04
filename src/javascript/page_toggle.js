document.addEventListener("DOMContentLoaded", e => {

    // page buttons
    const openmodal = document.getElementById('help-info');
    const mainBtn = document.getElementById('main');
    const detailCatBtn = document.getElementById('detail-category');
    const detailDayBtn = document.getElementById('detail-daily');
    const savingBtn = document.getElementById('savings-calc');
    const recommendBtn = document.getElementById('recommendations');

    // modal close button
    const closemodal = document.querySelector('.close-button');

    // page containers 
    const modal= document.querySelector('.modal-wrapper');
    // const detailCatPage = document.querySelector('.detail-category');
    // const detailDayPage = document.querySelector('.detail-day');
    // const savingsPage = document.querySelector('.savings-page');
    // const recommendations = document.querySelector('.recommendations');

    if (!localStorage.getItem('bData')) {
        const modal= document.querySelector('.modal-wrapper');
        modal.classList.add('active');
        localStorage.setItem('bData', '[]')
    }
    openmodal.addEventListener ('click', () => {
        modal.classList.add('active');
    });
    closemodal.addEventListener ('click', () => {
        modal.classList.remove('active');
    });

});

