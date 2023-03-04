// Get all the products on the page
const products = document.querySelectorAll(".product");

// Get the selected product container
let selectedProductContainer = document.querySelector(".selected-product");

// Get the show total button and the total price element
const showTotalBtn = document.querySelector("#show-total-btn");
const totalPriceElement = document.querySelector("#total-price");

// Create an array to store the selected products
let selectedProducts = [];

// Loop through all the products and add a click event listener to each one
products.forEach((product) => {
  product.addEventListener("click", () => {
    // Get the product name and price from the data attributes
    const productName = product.getAttribute("data-product-name");
    const productPrice = product.getAttribute("data-product-price");

    // Create a new object with the product name and price
    const selectedProduct = { name: productName, price: productPrice };

    // Add the selected product to the array
    selectedProducts.push(selectedProduct);

    // Update the selected product container with the product name and show price button
    selectedProductContainer.innerHTML = `
      <h2>Selected Product</h2>
      <p>You have selected ${productName}.</p>
      <button id="show-price-btn">Show Price</button>
    `;

    // Get the show price button from the updated selected product container
    const showPriceBtn =
      selectedProductContainer.querySelector("#show-price-btn");

    // Add a click event listener to the show price button
    showPriceBtn.addEventListener("click", () => {
      // Create an empty string to store the list of prices
      let priceList = "";

      // Loop through all the selected products and add the price to the list
      selectedProducts.forEach((product) => {
        priceList += `<li>${product.name}: $${product.price}</li>`;
      });

      // Create a new price list container and update it with the list of prices
      const newPriceListContainer = document.createElement("div");
      newPriceListContainer.classList.add("price-list");
      newPriceListContainer.innerHTML = `
      <h3>Price List</h3>
      <ul>${priceList}</ul>
      <button id="show-total-btn">Show Total Price</button>
    `;

      // Replace the old price list container with the new one
      selectedProductContainer.parentNode.replaceChild(
        newPriceListContainer,
        selectedProductContainer.nextElementSibling
      );

      // Update the selected product container variable to reference the new container
      selectedProductContainer = newPriceListContainer.previousElementSibling;

      // Get the show total button from the updated price list container
      const showTotalBtn =
        newPriceListContainer.querySelector("#show-total-btn");

      // Add a click event listener to the show total button
      showTotalBtn.addEventListener("click", () => {
        // Calculate the total price of all the selected products
        let totalPrice = 0;
        selectedProducts.forEach((product) => {
          totalPrice += parseInt(product.price);
        });

        // Update the total price element with the total price
        totalPriceElement.textContent = `$${totalPrice}`;

        // Show the total price container
        totalPriceElement.parentNode.style.display = "block";

        // Hide the show total button
        showTotalBtn.style.display = "none";
      });

      // Hide the show price button
      newPriceListContainer.querySelector("#show-price-btn").style.display =
        "none";
    });
  });
});
