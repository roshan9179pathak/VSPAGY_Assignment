$(document).ready(function () {
  loadAddresses();

  $("#address-form").submit(function (event) {
    event.preventDefault();

    let hno = $("#hno").val().trim();
    let street = $("#street").val().trim();
    let city = $("#city").val().trim();
    let country = $("#country").val().trim();
    let zip = $("#zip").val().trim();

    if (!hno || !street || !city || !country || !zip) {
      alert("Please fill all address fields.");
      return;
    }

    let address = {
      hno,
      street,
      city,
      country,
      zip,
      delivery: false,
      shipping: false,
    };

    let addresses = JSON.parse(localStorage.getItem("addresses")) || [];
    addresses.push(address);
    localStorage.setItem("addresses", JSON.stringify(addresses));

    $("#address-form")[0].reset();

    addAddressToUI(address);
  });

  function addAddressToUI(address) {
    let uniqueGroup = `group-${address.zip}-${Date.now()}`;

    let addressBlock = `
        <div class="col-md-6">
            <div class="p-3 border bg-light">
                <span>${address.hno}, ${address.street}, ${address.city}, ${address.country}, ${address.zip}</span>
                <div>
                    <input type="checkbox" class="address-checkbox delivery-checkbox" data-group="${uniqueGroup}">
                    <span class="me-2">Set delivery address</span>

                    <input type="checkbox" class="address-checkbox shipping-checkbox" data-group="${uniqueGroup}">
                    <span>Set shipping address</span>
                </div>
            </div>
        </div>
    `;

    let row = $("#address-list .row").last();

    if (row.length === 0 || row.children().length >= 2) {
      $("#address-list").append('<div class="row g-4"></div>');
      row = $("#address-list .row").last();
    }

    row.append(addressBlock);
  }

  function loadAddresses() {
    let addresses = JSON.parse(localStorage.getItem("addresses")) || [];

    addresses.forEach((address) => {
      addAddressToUI(address);
    });
  }

  $(document).on("change", ".address-checkbox", function () {
    let group = $(this).data("group");
    $(`.address-checkbox[data-group="${group}"]`)
      .not(this)
      .prop("checked", false);
  });

  // Here I will save the newly set address and then redirect to the cart page.

  $("#set-adress").click(function () {
    let selectedAddresses = [];

    $(".address-checkbox:checked").each(function() {
        let addressBlock = $(this).closest(".p-3.border.bg-light");
        let addressText = addressBlock.find("span:first").text(); 
        let addressType = $(this).hasClass("delivery-checkbox") ? "Delivery" : "Shipping"; 

        selectedAddresses.push({
            address: addressText,
            type: addressType
        });
    });

    if (selectedAddresses.length > 0) {
        localStorage.setItem("selectedAddresses", JSON.stringify(selectedAddresses));
    } else {
        alert("Please select at least one address.");
        return;
    }

  
    window.location.href = "cart.html";
  });
});
