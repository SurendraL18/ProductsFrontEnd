$(document).ready(function () {
  let cartCount = 0;
  let cartItems = [];
  let products = [];

  // Load products from products.json
  $.getJSON("products.json", function (data) {
    products = data;

    // Render Products Page
    renderProducts(products);

    // Render only first 3 as Featured on Home Page
    renderFeaturedProducts(products.slice(0, 3));
  });

  // ---------------------------
  // Navigation (simulate routes)
  // ---------------------------
  $(".page-link").on("click", function () {
    const page = $(this).data("page");

    $(".page-link").removeClass("active");
    $(this).addClass("active");

    $(".page").addClass("d-none");
    $("#" + page).removeClass("d-none");
  });

  // Shop Now button
  $(document).on("click", ".go-products", function () {
    $(".page-link[data-page='products']").trigger("click");
  });

  // ---------------------------
  // Search filter
  // ---------------------------
  $("#search").on("keyup", function () {
    const value = $(this).val().toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(value));
    renderProducts(filtered);
  });

  // ---------------------------
  // Render all Products (Products Page)
  // ---------------------------
  function renderProducts(productList) {
    const productGrid = $("#product-grid");
    const noProducts = $("#no-products");

    productGrid.empty();

    if (productList.length === 0) {
      noProducts.removeClass("d-none");
      return;
    } else {
      noProducts.addClass("d-none");
    }

    productList.forEach(product => {
      productGrid.append(`
        <div class="col-md-4 col-sm-6">
          <div class="card h-100 shadow-sm border-0">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.name}</h5>
              <p class="text-muted small">${product.description}</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="fw-bold text-dark">₹${product.price}</span>
                <button class="btn btn-sm btn-dark add-to-cart" data-id="${product.id}">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      `);
    });
  }

  // ---------------------------
  // Render Featured Products (Home Page)
  // ---------------------------
  function renderFeaturedProducts(featuredList) {
    const featuredGrid = $("#featured-products");
    featuredGrid.empty();

    featuredList.forEach(product => {
      featuredGrid.append(`
        <div class="col-md-4 col-sm-6">
          <div class="card h-100 shadow-sm border-0">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.name}</h5>
              <p class="text-muted small">${product.description}</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="fw-bold text-dark">₹${product.price}</span>
                <button class="btn btn-sm btn-dark add-to-cart" data-id="${product.id}">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      `);
    });
  }

  // ---------------------------
  // Add to cart
  // ---------------------------
  $(document).on("click", ".add-to-cart", function () {
    const id = $(this).data("id");
    const product = products.find(p => p.id === id);

    cartCount++;
    $("#cart-count").text(cartCount);

    cartItems.push(product);
    renderCart();
  });

  // ---------------------------
  // Render Cart
  // ---------------------------
  function renderCart() {
    const cartList = $("#cart-items");
    cartList.empty();

    if (cartItems.length === 0) {
      cartList.html("<li class='list-group-item text-muted'>Your cart is empty</li>");
      return;
    }

    cartItems.forEach((item, index) => {
      cartList.append(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${item.name} - ₹${item.price}
          <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">Remove</button>
        </li>
      `);
    });
  }

  // ---------------------------
  // Remove item from cart
  // ---------------------------
  $(document).on("click", ".remove-item", function () {
    const index = $(this).data("index");
    cartItems.splice(index, 1);
    cartCount--;
    $("#cart-count").text(cartCount);
    renderCart();
  });
});
