$(document).ready(function () {
    function fetchProducts() {
        $.ajax({
            url: 'https://dummyjson.com/products',
            method: "GET",
            success: function (data) {
                updateState({ totalProducts: data.products });
                renderProducts(data.products);
            }
        });
    }

    function renderProducts(products) {
        $("#product-container").empty();
        products.forEach(function (product) {
            let cardHtml = `
                <div class="col-md-3 mb-4">
                    <div class="card">
                        <img src="${product.thumbnail}" class="card-img-top" alt="Product Image">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">$${product.price}</p>
                            <button class="btn btn-custom buy-now" data-id="${product.id}">Buy Now</button>
                        </div>
                    </div>
                </div>
            `;
            $("#product-container").append(cardHtml);
        });
    }

 
    $(document).on("click", ".buy-now", function () {
        let productId = parseInt($(this).data("id"));
        addToCart(productId);
    });

    fetchProducts();
});
