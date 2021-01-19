'use strict';

// Reference to DOM elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

// Helper functions
const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// Loop over buttons to add event listeners (to open popup)
for (let i = 0; i < btnsOpenModal.length; i++) {

    let btnOpenModal = btnsOpenModal[i];
    console.log(btnOpenModal);

    // Add event listener to remove 'hidden' class from modal window and overlay
    btnOpenModal.addEventListener('click', openModal);
}



// Close popup
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {

    // Check for ESC key and hidden class
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }

});

