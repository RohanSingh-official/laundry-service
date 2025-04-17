document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('laundryOrderForm');

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        placeOrder();
    });
});

function placeOrder() {
    // Simulate order processing
    setTimeout(function() {
        displayOrderConfirmation();
    }, 1000);
}

function displayOrderConfirmation() {
    const orderForm = document.getElementById('laundryOrderForm');
    orderForm.innerHTML = `
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your order.</p>
        <button id="returnHomeBtn" class="btn btn-primary">Return to Home</button>
    `;
    
    document.getElementById('returnHomeBtn').addEventListener('click', returnToHome);
}

function returnToHome() {
    window.location.href = 'index.html';
}