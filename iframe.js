document.addEventListener('DOMContentLoaded', function () {
    const cardNumberInput = document.getElementById('cardNumber');
    const cardNumberBox = document.querySelector('.card-number-box');
    const cardLogo = document.getElementById('card-logo');
    const cardHolderInput = document.getElementById('cardHolder');
    const cardHolderNameBox = document.querySelector('.card-holder-name');
    const expMonthInput = document.getElementById('expMonth');
    const expYearInput = document.getElementById('expYear');
    const expMonthBox = document.querySelector('.exp-month');
    const expYearBox = document.querySelector('.exp-year');
    const cvvInput = document.getElementById('cvv');
    const cvvBox = document.querySelector('.cvv-box');
    const cvvError = document.getElementById('cvv-error');
    const cardFront = document.querySelector('.card.front');
    const cardBack = document.querySelector('.card.back');
    const submitBtn = document.getElementById('submit-btn');
    const expirationError = document.getElementById('expiration-error');
    const cardNumberErrorMessage = document.getElementById('cardNumberErrorMessage');
    const formMessage = document.getElementById('form-message');

    function validateForm() {
        if (cardNumberInput.value.trim() &&
            cardHolderInput.value.trim() &&
            expMonthInput.value.trim() &&
            expYearInput.value.trim().length === 4 &&
            cvvInput.value.trim() &&
            cardNumberErrorMessage.style.display === 'none' &&
            expirationError.style.display === 'none' &&
            cvvError.style.display === 'none') {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // Format card number on input
    cardNumberInput.addEventListener('input', function () {
        let cardNumber = cardNumberInput.value.replace(/\D/g, '').substring(0, 16);
        let formattedNumber = cardNumber.match(/.{1,4}/g)?.join(' ') || '';
        cardNumberBox.textContent = formattedNumber || '####-####-####-####';

        // Detect card type
        if (cardNumber.startsWith('4')) {
            cardLogo.src = 'https://mohamedadel397.github.io/iframe_integration/visa.png';
        } else if (cardNumber.startsWith('5')) {
            cardLogo.src = 'https://mohamedadel397.github.io/iframe_integration/mastercard.png';
        } else {
            cardLogo.src = 'https://mohamedadel397.github.io/iframe_integration/master_visa-removebg-preview.png';
            cardLogo.style.visibility = 'visible';
        }

        if (cardNumber.replace(/\s/g, '').length < 16) {
            cardNumberInput.style.borderColor = 'red';
            cardNumberErrorMessage.textContent = 'Your card number is invalid.';
            cardNumberErrorMessage.style.color = 'red';
            cardNumberErrorMessage.style.display = 'block';
        } else {
            cardNumberInput.style.borderColor = '';
            cardNumberErrorMessage.style.display = 'none';
        }
        cardNumberInput.value = formattedNumber;
        validateForm();
    });

    // Update card holder name on input
    cardHolderInput.addEventListener('input', function () {
        const maxLength = 18;
        let cardHolderName = cardHolderInput.value;
        if (cardHolderName.length > maxLength) {
            cardHolderName = cardHolderName.substring(0, maxLength);
            cardHolderInput.value = cardHolderName;
        }
        cardHolderNameBox.textContent = cardHolderInput.value || 'full name';
        validateForm();
    });

    // Update expiration date on input
    expMonthInput.addEventListener('input', function () {
        let month = expMonthInput.value.replace(/\D/g, '').substring(0, 2);
        if (parseInt(month) > 12) {
            expirationError.textContent = "Invalid Month. Please Enter A Value Between 01 And 12.";
            expirationError.style.display = "block";
        } else {
            expirationError.style.display = "none";
            if (month.length === 1 && parseInt(month) > 1) {
                month = '0' + month;
            }
            if (month.length === 2) {
                expYearInput.focus();
            }
        }
        expMonthBox.textContent = month || 'mm';
        expMonthInput.value = month;
        validateForm();
    });

    expYearInput.addEventListener('focus', function () {
        if (expYearInput.value === '') {
            expYearInput.value = '20';
            expYearInput.setSelectionRange(2, 2);
        }
    });

    expYearInput.addEventListener('input', function (event) {
        const currentYear = new Date().getFullYear() % 100;
        const maxYear = currentYear + 10;
        let value = expYearInput.value;

        // Ensure the input starts with '20'
        if (!value.startsWith('20')) {
            value = '20';
        }

        // Allow only 4 characters
        value = value.substring(0, 4);

        let year = parseInt(value.substring(2));
        if (value.length === 4 && (year < currentYear || year > maxYear)) {
            expirationError.textContent = `Invalid Year. Please Enter A Value Between ${currentYear} And ${maxYear}.`;
            expirationError.style.display = "block";
        } else {
            expirationError.style.display = "none";
            if (value.length === 4) {
                cvvInput.focus();
            }
        }

        expYearBox.textContent = value.substring(2) || 'yy';
        expYearInput.value = value;
        validateForm();
    });

    expYearInput.addEventListener('keydown', function (event) {
        const key = event.key;
        const value = expYearInput.value;

        // Allow deleting and backspacing the year part
        if ((key === 'Backspace' || key === 'Delete') && expYearInput.selectionStart > 2) {
            return;
        } else if (key === 'Backspace' || key === 'Delete') {
            event.preventDefault();
        }
    });

    // Show CVV on card back and validate
    cvvInput.addEventListener('input', function () {
        let cvv = cvvInput.value.replace(/\D/g, '').substring(0, 4);
        cvvBox.textContent = cvv || '***';

        if (cvv.length < 3 || cvv.length > 4) {
            cvvError.textContent = 'Invalid Cvv. Please Enter 3 Or 4 Digits.';
            cvvError.style.display = 'block';
        } else {
            cvvError.style.display = 'none';
        }

        // Flip to show the back of the card
        cardFront.style.transform = 'rotateY(-180deg)';
        cardBack.style.transform = 'rotateY(0deg)';
        validateForm();
    });

    // Flip back to the front of the card when other inputs are focused
    document.querySelectorAll('input').forEach(input => {
        if (input !== cvvInput) {
            input.addEventListener('focus', function () {
                cardFront.style.transform = 'rotateY(0deg)';
                cardBack.style.transform = 'rotateY(180deg)';
            });
        }
    });
});

function handleSubmit() {
    const cardNumberInput = document.getElementById('cardNumber');
    const formMessage = document.getElementById('form-message');

    if (cardNumberInput.value.replace(/\s/g, '') === '5432155555555555') {
        formMessage.textContent = 'Success! Your Payment Request Has Been Sent Successfully.';
        formMessage.style.color = 'green';
    } else {
        formMessage.textContent = 'error! Your Payment Request Has Been Failed Due To: Expired Card.';
        formMessage.style.color = 'red';
    }
}






//////////////////////////////////////////////////////////////////


document.addEventListener("DOMContentLoaded", function () {
    const containers = document.getElementsByClassName("payment-container");
    for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        const iframe = document.createElement("iframe");
        iframe.src = "./iframe.html?styles=" + encodeURIComponent(container.getAttribute('data-custom-styles') || "");
        iframe.width = container.getAttribute('data-iframe-width') || "100%";
        iframe.height = container.getAttribute('data-iframe-height') || "650px";
        iframe.style.border = "none";
        container.appendChild(iframe);

        iframe.onload = function () {
            // Access the iframe's document
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const buttonContainer = iframeDoc.querySelector('.submit-btn'); // Corrected selector
            const bgColor = container.getAttribute('data-bg-color'); // Get the bg color from the parent container
            if (bgColor) {
                buttonContainer.style.background = bgColor; // Apply the background color
            }
            const cardBackground = iframeDoc.querySelector('.card-container .front');
            const cardBack = iframeDoc.querySelector('.card-container .back');
            const cardBackgroundColor = container.getAttribute('data-card-background-color');
            const cardBack1 = container.getAttribute('back-card-background-color');

            if (cardBackgroundColor){
                cardBackground.style.background = cardBackgroundColor;
                cardBack.style.background = cardBackgroundColor;

            }

        }
    }
});
