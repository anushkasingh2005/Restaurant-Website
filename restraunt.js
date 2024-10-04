// Generate a random captcha
function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById('captcha-image').innerHTML = captcha;
    return captcha;
}

// Handle form submission
document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const contactNumber = document.getElementById('contact-number').value;
    const otp = document.getElementById('otp').value;
    const captchaInput = document.getElementById('captcha-input').value;
    const captcha = generateCaptcha();

    // Validate inputs and send OTP
    if (contactNumber && otp && captchaInput === captcha) {
        // Send OTP to the entered contact number
        // ...
    } else {
        alert('Invalid inputs. Please try again.');
    }
});

// Populate menu items using JavaScript (replace with your actual data)
const menuItems = [
    { name: "Pizza", price: 200, image: "pizza.jpg" },
    // ... other menu items
];

const menuItemsContainer = document.querySelector('.menu-items');
menuItems.forEach(item => {
    const menuItemElement = document.createElement('div');
    menuItemElement.classList.add('menu-item');
    menuItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h2>${item.name}</h2>
        <p>Rs. ${item.price}</p>
    `;
    menuItemsContainer.appendChild(menuItemElement);
});
// ... (rest of your JavaScript code) ...

// Update order summary and total in the billing section
function updateBillingDetails() {
    const orderSummaryElement = document.getElementById('order-summary');
    const totalAmountElement = document.getElementById('total-amount');

    // Clear previous order items
    orderSummaryElement.innerHTML = '';

    // Add current order items to the summary
    for (const item in menu) {
        if (menu.hasOwnProperty(item) && orderedItems[item]) {
            const quantity = orderedItems[item];
            const price = menu[item];
            const total = quantity * price;

            const itemElement = document.createElement('p');
            itemElement.textContent = `${item} (${quantity}): Rs. ${total}`;
            orderSummaryElement.appendChild(itemElement);
        }
    }

    // Calculate and display total amount
    let total = 0;
    for (const item in orderedItems) {
        total += menu[item] * orderedItems[item];
    }
    totalAmountElement.textContent = `Total: Rs. ${total}`;
}

// ... (rest of your event listeners and form handling) ...

// Call updateBillingDetails() whenever the order changes
// (e.g., when an item is added or removed)