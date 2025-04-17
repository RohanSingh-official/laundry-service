// Get current user
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Redirect to login if not authenticated
if (!currentUser) {
    window.location.href = 'login.html';
}

// Display user name
document.getElementById('userName').textContent = currentUser.name;

// Price list
const priceList = {
    wash: 5,
    iron: 3,
    wash_iron: 7,
    dry_clean: 10
};

// Get orders from localStorage
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Function to save orders to localStorage
function saveOrders() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Order Form Functionality
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const service = document.getElementById('service').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const pickupDate = document.getElementById('pickup-date').value;
        const pickupTime = document.getElementById('pickup-time').value;
        
        const totalPrice = priceList[service] * weight;
        
        const newOrder = {
            id: Date.now(),
            user: currentUser.email,
            service,
            weight,
            pickupDate,
            pickupTime,
            totalPrice,
            status: 'Pending'
        };
        
        orders.push(newOrder);
        saveOrders();
        updateOrderList();
        orderForm.reset();
        alert('Order placed successfully!');
    });
}

// Function to update order list
function updateOrderList() {
    const orderList = document.getElementById('orderList');
    if (orderList) {
        orderList.innerHTML = '';
        const userOrders = orders.filter(order => order.user === currentUser.email);
        
        userOrders.forEach(order => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Order ID:</strong> ${order.id}<br>
                <strong>Service:</strong> ${order.service.replace('_', ' ').toUpperCase()}<br>
                <strong>Weight:</strong> ${order.weight} kg<br>
                <strong>Pickup Date:</strong> ${order.pickupDate}<br>
                <strong>Pickup Time:</strong> ${order.pickupTime}<br>
                <strong>Total Price:</strong> $${order.totalPrice.toFixed(2)}<br>
                <strong>Status:</strong> ${order.status}
            `;
            orderList.appendChild(li);
        });
    }
}

// Update order list on page load
updateOrderList();

// Logout Functionality
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
}

// Set minimum date for pickup to today
document.addEventListener('DOMContentLoaded', function() {
    const pickupDateInput = document.getElementById('pickup-date');
    if (pickupDateInput) {
        const today = new Date().toISOString().split('T')[0];
        pickupDateInput.min = today;
    }
});