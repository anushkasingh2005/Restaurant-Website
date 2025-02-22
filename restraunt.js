const menuItems = [
  { name: "Pizza", price: 200 },
  { name: "Butter Chicken", price: 450 },
  { name: "Paneer Tikka", price: 350 },
  { name: "Biryani", price: 400 },
  { name: "Samosa", price: 50 },
  { name: "Dosa", price: 250 },
  { name: "Idli", price: 200 },
  { name: "Vada", price: 150 },
  { name: "Jalebi", price: 100 },
  { name: "Gulab Jamun", price: 80 },
  { name: "Kulfi", price: 120 }
];

let selectedItems = []; // Array to store selected menu items

// Function to update order summary and total amount dynamically
async function updateOrderSummary() {
  const orderSummaryList = document.getElementById("order-summary").querySelector("ul");
  orderSummaryList.innerHTML = ""; // Clear existing items

  let totalAmount = 0;
  for (const item of selectedItems) {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - Rs. ${item.price}`;
    orderSummaryList.appendChild(listItem);
    totalAmount += item.price;
  }

  try {
    const response = await fetch('/calculate_total', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ selected_items: selectedItems })
    });

    if (!response.ok) {
      throw new Error('Error calculating total amount');
    }

    const data = await response.json();
    totalAmount = data.total_amount;
  } catch (error) {
    console.error(error);
    // Handle error gracefully (e.g., display a message to the user)
  }

  document.getElementById("total-amount").textContent = `Total: Rs. ${totalAmount}`;
}

// Event listener for menu item clicks (simulates adding items to cart)
const menuItemsContainer = document.querySelector(".menu-items");
menuItemsContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") { // Ensure click is on an image (menu item)
    const clickedMenuItem = menuItems.find(item => item.name === event.target.alt);
    if (clickedMenuItem) {
      selectedItems.push(clickedMenuItem); // Add item to selected items array
      updateOrderSummary();
    }
  }
});

// Basic form validation (can be extended for more robust validation)
const billingForm = document.getElementById("billing-form");
billingForm.addEventListener("submit", (event) => {
  const nameInput = document.getElementById("name");
  const addressInput = document.getElementById("address");
  const cityInput = document.getElementById("city");

  if (nameInput.value === "" || addressInput.value === "" || cityInput.value === "") {
    alert("Please fill in all required fields (Name, Address, City).");
    event.preventDefault(); // Prevent form submission if validation fails
  } else {
    // Simulate successful order placement (alert for now)
    alert("Your order has been placed successfully!");
    selectedItems = []; // Clear selected items after successful order
    updateOrderSummary(); // Update order summary to reflect cleared items
  }
});