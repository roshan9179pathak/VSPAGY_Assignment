const yearSelect = document.getElementById("year");
const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

const months = [
  "MM",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function populateYears() {
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i <= currentYear + 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }
}

function populateMonths() {
  monthSelect.innerHTML = "";
  months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index + 1;
    option.textContent = month;
    monthSelect.appendChild(option);
  });
}

yearSelect.addEventListener("change", () => {
  const selectedMonth = parseInt(monthSelect.value);
  updateDays(selectedMonth);
});

monthSelect.addEventListener("change", (e) => {
  updateDays(parseInt(e.target.value));
});

populateYears();
populateMonths();

monthSelect.value = 1;

// Here I will fetch products from localstorage

let imageInCart = document.getElementById("image-container");
let pName = document.getElementById("product-name");
let pSize = document.getElementById("size");
let pColor = document.getElementById("color");
let price = document.getElementById("price");
let quantity = document.getElementById("quantity");
const productsContainer = document.getElementById("products-container");
let totalPrice = 0;

$(document).ready(function () {
  function renderCart() {
    $("#products-container").empty();

    let totalPrice = 0;

    if (state.cart.length === 0) {
      $("#products-container").html("<p>Your cart is empty!</p>");
      return;
    }

    state.cart.forEach(function (product) {
      const quantitySelectId = `#quantity-select-${product.id}`;
      const quantitySelect = document.createElement("select");
      quantitySelect.classList.add(
        "form-select",
        "form-select-sm",
        "d-inline-block",
        "w-auto",
        "ms-1"
      );
      quantitySelect.id = `quantity-select-${product.id}`;

      for (let i = 1; i <= 5; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        if (i === 1) option.selected = true;
        quantitySelect.appendChild(option);
      }

      const productDiv = document.createElement("div");
      productDiv.classList.add("d-flex", "pt-3", "ps-3", "main-card-body");

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("me-3");
      imageContainer.style.width = "20%";
      const productImage = document.createElement("img");
      productImage.src = product.thumbnail;
      productImage.alt = "product-image";
      productImage.classList.add("w-100", "h-100");
      imageContainer.appendChild(productImage);

      const detailsContainer = document.createElement("div");

      const productName = document.createElement("p");
      productName.classList.add("fs-6", "fw-semibold", "mb-0");
      productName.textContent = product.title;

      const sizeColorDiv = document.createElement("div");
      const sizeText = document.createElement("span");
      sizeText.classList.add("fs-7", "fw-semibold");
      sizeText.textContent = `Size: ${product.size || "M"}`;
      const colorText = document.createElement("span");
      colorText.classList.add("fs-7", "fw-semibold");
      colorText.textContent = `Color: ${product.color || "Blue"}`;
      sizeColorDiv.appendChild(sizeText);
      sizeColorDiv.appendChild(colorText);

      const priceQuantityDiv = document.createElement("div");
      priceQuantityDiv.classList.add("d-flex", "align-items-center");
      const priceText = document.createElement("span");
      priceText.classList.add("fs-7", "fw-semibold");
      priceText.textContent = `Price: $${product.price}`;
      const quantityDiv = document.createElement("div");
      quantityDiv.classList.add("ms-3");
      const quantityText = document.createElement("span");
      quantityText.classList.add("fs-7", "fw-semibold");
      quantityText.textContent = "Quantity:";
      quantityDiv.appendChild(quantityText);
      quantityDiv.appendChild(quantitySelect);
      priceQuantityDiv.appendChild(priceText);
      priceQuantityDiv.appendChild(quantityDiv);

      const savedMoneyDiv = document.createElement("div");
      savedMoneyDiv.classList.add("d-flex", "align-items-center", "mt-2");
      const coinIcon = document.createElement("i");
      coinIcon.classList.add("bi", "bi-coin", "me-1");
      const savedText = document.createElement("span");
      savedText.classList.add("fs-7", "fw-semibold");
      savedText.textContent = `You have saved $41`;
      savedMoneyDiv.appendChild(coinIcon);
      savedMoneyDiv.appendChild(savedText);

      const removeButton = document.createElement("button");
      removeButton.classList.add(
        "btn",
        "btn-link",
        "text-primary",
        "fw-semibold",
        "p-0",
        "remove-item",
        "text-decoration-none"
      );
      removeButton.textContent = "Remove";
      removeButton.setAttribute("data-id", product.id);

      detailsContainer.appendChild(productName);
      detailsContainer.appendChild(sizeColorDiv);
      detailsContainer.appendChild(priceQuantityDiv);
      detailsContainer.appendChild(savedMoneyDiv);
      detailsContainer.appendChild(removeButton);

      productDiv.appendChild(imageContainer);
      productDiv.appendChild(detailsContainer);

      $("#products-container").append(productDiv);

      $(quantitySelect).on("change", function () {
        updateCartTotal();
      });
    });

    updateCartTotal();
  }

  function updateCartTotal() {
    let totalPrice = 0;

    state.cart.forEach(function (product) {
      const quantity = parseInt($(`#quantity-select-${product.id}`).val()) || 1;
      totalPrice += product.price * quantity;
    });

    document.querySelector(
      "#totalPrice"
    ).textContent = `Total Price: $${totalPrice.toFixed(2)}`;

    document.querySelector(
      "#payButton"
    ).textContent = `Pay $${totalPrice.toFixed(2)}`;
  }


  $(document).on("click", ".remove-item", function () {
    let productId = parseInt($(this).data("id"));
    state.cart = state.cart.filter((item) => item.id !== productId);
    updateState({ cart: state.cart });
    renderCart();
  });

  renderCart();

  let storedAddresses = localStorage.getItem("selectedAddresses");

  if (storedAddresses) {
    let addresses = JSON.parse(storedAddresses);

    let billingAddress = "";
    let shippingAddress = "";

    addresses.forEach((addr) => {
      if (addr.type === "Delivery") {
        billingAddress = addr.address;
      }
      if (addr.type === "Shipping") {
        shippingAddress = addr.address;
      }
    });

    if (billingAddress) {
      $(".billing-box:first .billing-address span").text(billingAddress);
    }

    if (shippingAddress) {
      $(".billing-box:last .billing-address span").text(shippingAddress);
    }
  }

  $("#change-shipping , #change-billing").click(function () {
    window.location.href = "address.html";
  });

  //
});
