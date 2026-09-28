const products = [
    {
        id: 1,
        name: "Classic Black Watch",
        price: 499,
        category: "watches",
        image: "images/classic.webp"
    },
    {
        id: 2,
        name: "Silver Minimalist Watch",
        price: 599,
        category: "watches",
        image: "images/silver.webp"
    },
    {
        id: 3,
        name: "Casual Leather Watch",
        price: 699,
        category: "watches",
        image: "images/casual.jpg"
    },
    {
        id: 4,
        name: "Simple Chain Necklace",
        price: 199,
        category: "necklaces",
        image: "images/simple.webp"
    },
    {
        id: 5,
        name: "Pendant Necklace",
        price: 249,
        category: "necklaces",
        image: "images/pendant.avif"
    },
    {
        id: 6,
        name: "Stainless Steel Necklace",
        price: 299,
        category: "necklaces",
        image: "images/steel.jpg"
    },
    {
        id: 7,
        name: "Simple Silver Ring",
        price: 149,
        category: "rings",
        image: "images/silverR.avif"
    },
    {
        id: 8,
        name: "Black Band Ring",
        price: 179,
        category: "rings",
        image: "images/blackR.jpg"
    },
    {
        id: 9,
        name: "Stainless Steel Ring",
        price: 229,
        category: "rings",
        image: "images/steelR.webp"
    },
    {
        id: 10,
        name: "Beaded Bracelet",
        price: 129,
        category: "bracelets",
        image: "images/beaded.webp"
    },
    {
        id: 11,
        name: "Chain Bracelet",
        price: 199,
        category: "bracelets",
        image: "images/chainB.jpg"
    },
    {
        id: 12,
        name: "Stainless Steel Bracelet",
        price: 249,
        category: "bracelets",
        image: "images/steelB.webp"
    },
    {
        id: 13,
        name: "Classic Black Cap",
        price: 199,
        category: "caps",
        image: "images/blackC.webp"
    },
    {
        id: 14,
        name: "Minimalist Baseball Cap",
        price: 249,
        category: "caps",
        image: "images/baseballC.webp"
    },
    {
        id: 15,
        name: "Embroidered Logo Cap",
        price: 299,
        category: "caps",
        image: "images/logoC.jpg"
    }
];

let cart = JSON.parse(
    localStorage.getItem("bydVaultCart")
) || [];

function saveCart() {
    localStorage.setItem(
        "bydVaultCart",
        JSON.stringify(cart)
    );

    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.querySelectorAll(".cart-count").forEach(
        element => {
            element.textContent = count;
        }
    );
}

function formatPrice(price) {
    return "₱" + price.toLocaleString("en-PH");
}

function addToCart(id) {
    const product = products.find(
        item => item.id === id
    );

    if (!product) {
        return;
    }

    const existingProduct = cart.find(
        item => item.id === id
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();

    showCartMessage(
        product.name + " has been added to your cart."
    );
}

function showCartMessage(message) {
    const existingMessage =
        document.querySelector(".cart-message");

    if (existingMessage) {
        existingMessage.remove();
    }

    const messageBox =
        document.createElement("div");

    messageBox.className = "cart-message";
    messageBox.textContent = message;

    messageBox.style.position = "fixed";
    messageBox.style.right = "25px";
    messageBox.style.bottom = "25px";
    messageBox.style.background = "#101c2c";
    messageBox.style.color = "#ffffff";
    messageBox.style.padding = "14px 20px";
    messageBox.style.fontSize = "12px";
    messageBox.style.fontWeight = "600";
    messageBox.style.borderLeft = "3px solid #c7a45b";
    messageBox.style.boxShadow =
        "0 10px 30px rgba(16, 28, 44, 0.18)";
    messageBox.style.zIndex = "9999";
    messageBox.style.opacity = "0";
    messageBox.style.transform = "translateY(15px)";
    messageBox.style.transition = "0.3s ease";

    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.style.opacity = "1";
        messageBox.style.transform =
            "translateY(0)";
    }, 50);

    setTimeout(() => {
        messageBox.style.opacity = "0";
        messageBox.style.transform =
            "translateY(15px)";

        setTimeout(() => {
            messageBox.remove();
        }, 300);
    }, 1800);
}

function changeQuantity(id, amount) {
    const item = cart.find(
        product => product.id === id
    );

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(
            product => product.id !== id
        );
    }

    saveCart();

    renderCart();
}

function removeFromCart(id) {
    const item = cart.find(
        product => product.id === id
    );

    cart = cart.filter(
        product => product.id !== id
    );

    saveCart();

    renderCart();

    if (item) {
        showCartMessage(
            item.name + " has been removed from your cart."
        );
    }
}

function renderCart() {
    const container =
        document.getElementById("cartContainer");

    if (!container) {
        return;
    }

    const checkoutArea =
        document.getElementById("checkoutArea");

    const receiptArea =
        document.getElementById("receiptArea");

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">

                <h2>Your cart is empty.</h2>

                <p>
                    Browse our collection and add something
                    to your cart.
                </p>

                <a
                    href="products.html"
                    class="btn btn-dark">
                    Shop Products
                </a>

            </div>
        `;

        if (checkoutArea) {
            checkoutArea.style.display = "none";
        }

        return;
    }

    if (checkoutArea) {
        checkoutArea.style.display = "none";
    }

    if (receiptArea) {
        receiptArea.style.display = "none";
    }

    let subtotal = 0;

    const itemsHTML = cart.map(item => {

        const itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;

        return `
            <div class="cart-item">

                <div class="cart-item-image">
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >
                </div>

                <div>

                    <span class="cart-item-category">
                        ${item.category.toUpperCase()}
                    </span>

                    <h3>
                        ${item.name}
                    </h3>

                    <p class="cart-item-price">
                        ${formatPrice(item.price)}
                    </p>

                    <div class="quantity-control">

                        <button
                            type="button"
                            onclick="changeQuantity(${item.id}, -1)">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            type="button"
                            onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                    </div>

                    <button
                        type="button"
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})">
                        Remove
                    </button>

                </div>

                <div>
                    <strong>
                        ${formatPrice(itemTotal)}
                    </strong>
                </div>

            </div>
        `;

    }).join("");

    const shipping = 50;

    const total =
        subtotal + shipping;

    container.innerHTML = `

        <div class="cart-layout">

            <div class="cart-items">

                ${itemsHTML}

            </div>

            <aside class="cart-summary">

                <p class="eyebrow">
                    ORDER SUMMARY
                </p>

                <h2>
                    Order Total
                </h2>

                <div class="summary-line">

                    <span>
                        Subtotal
                    </span>

                    <strong>
                        ${formatPrice(subtotal)}
                    </strong>

                </div>

                <div class="summary-line">

                    <span>
                        Shipping
                    </span>

                    <strong>
                        ${formatPrice(shipping)}
                    </strong>

                </div>

                <div class="summary-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        ${formatPrice(total)}
                    </strong>

                </div>

                <button
                    type="button"
                    class="btn btn-dark summary-btn"
                    onclick="showCheckout()">

                    Proceed to Checkout

                </button>

            </aside>

        </div>
    `;
}

function showCheckout() {

    if (cart.length === 0) {
        return;
    }

    const checkoutArea =
        document.getElementById("checkoutArea");

    if (!checkoutArea) {
        return;
    }

    checkoutArea.style.display = "block";

    checkoutArea.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function generateOrderNumber() {

    const randomNumber =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return "BYD-" + randomNumber;
}

function setupCheckout() {

    const form =
        document.getElementById("checkoutForm");

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            if (cart.length === 0) {
                return;
            }

            const firstName =
                document.getElementById(
                    "firstName"
                ).value.trim();

            const lastName =
                document.getElementById(
                    "lastName"
                ).value.trim();

            const email =
                document.getElementById(
                    "email"
                ).value.trim();

            const phone =
                document.getElementById(
                    "phone"
                ).value.trim();

            const address =
                document.getElementById(
                    "address"
                ).value.trim();

            const selectedPayment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );

            if (!selectedPayment) {

                alert(
                    "Please select a payment method."
                );

                return;
            }

            const payment =
                selectedPayment.value;


            const orderNumber =
                generateOrderNumber();

            const orderDate =
                new Date().toLocaleDateString(
                    "en-PH",
                    {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }
                );

            let subtotal = 0;

            const receiptItems =
                cart.map(item => {

                    const itemTotal =
                        item.price *
                        item.quantity;

                    subtotal += itemTotal;

                    return `
                        <tr>

                            <td>
                                ${item.name}
                            </td>

                            <td>
                                ${item.quantity}
                            </td>

                            <td>
                                ${formatPrice(item.price)}
                            </td>

                            <td>
                                ${formatPrice(itemTotal)}
                            </td>

                        </tr>
                    `;

                }).join("");

            const shipping = 50;

            const total =
                subtotal + shipping;

            const receiptArea =
                document.getElementById(
                    "receiptArea"
                );

            if (!receiptArea) {
                return;
            }

            receiptArea.innerHTML = `

                <div class="receipt">

                    <div class="receipt-header">

                        <div>

                            <p class="eyebrow">
                                BYD VAULT
                            </p>

                            <h2>
                                Order Receipt
                            </h2>

                            <p>
                                Thank you for your purchase.
                            </p>

                        </div>

                        <div class="receipt-order">

                            <span>
                                ORDER NUMBER
                            </span>

                            <strong>
                                ${orderNumber}
                            </strong>

                            <span style="margin-top:8px;">
                                DATE
                            </span>

                            <strong>
                                ${orderDate}
                            </strong>

                        </div>

                    </div>

                    <div class="receipt-body">

                        <div class="receipt-info">

                            <div>

                                <h4>
                                    CUSTOMER
                                </h4>

                                <p>
                                    ${firstName}
                                    ${lastName}
                                </p>

                                <p>
                                    ${email}
                                </p>

                                <p>
                                    ${phone}
                                </p>

                            </div>

                            <div>

                                <h4>
                                    DELIVERY
                                </h4>

                                <p>
                                    ${address}
                                </p>

                                <h4 style="margin-top:15px;">
                                    PAYMENT
                                </h4>

                                <p>
                                    ${payment}
                                </p>

                            </div>

                        </div>

                        <table class="receipt-table">

                            <thead>

                                <tr>

                                    <th>
                                        PRODUCT
                                    </th>

                                    <th>
                                        QTY
                                    </th>

                                    <th>
                                        PRICE
                                    </th>

                                    <th>
                                        TOTAL
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                ${receiptItems}

                            </tbody>

                        </table>

                        <div class="receipt-total">

                            <div>

                                <span>
                                    Subtotal
                                </span>

                                <strong>
                                    ${formatPrice(subtotal)}
                                </strong>

                            </div>

                            <div>

                                <span>
                                    Shipping
                                </span>

                                <strong>
                                    ${formatPrice(shipping)}
                                </strong>

                            </div>

                            <div class="grand-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    ${formatPrice(total)}
                                </strong>

                            </div>

                        </div>

                    </div>

                    <div class="receipt-footer">

                        Your order has been successfully placed.
                        Please keep this receipt for your reference.

                    </div>

                </div>

                <div class="receipt-actions">

                    <a
                        href="products.html"
                        class="btn btn-dark">

                        Continue Shopping

                    </a>

                </div>

            `;


            const checkoutArea =
                document.getElementById(
                    "checkoutArea"
                );


            if (checkoutArea) {
                checkoutArea.style.display = "none";
            }


            receiptArea.style.display = "block";


            cart = [];


            saveCart();


            form.reset();


            receiptArea.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );
}

    setTimeout(() => {

        printWindow.print();

        printWindow.close();

    }, 500);

function setupProductFilters() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const sortSelect =
        document.getElementById(
            "sortSelect"
        );

    const productGrid =
        document.getElementById(
            "productGrid"
        );

    const noResults =
        document.getElementById(
            "noResults"
        );

    const categoryButtons =
        document.querySelectorAll(
            ".category-btn"
        );

    if (!productGrid) {
        return;
    }

    let currentCategory = "all";

    function filterProducts() {

        const searchValue =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";

        const cards =
            Array.from(
                productGrid.querySelectorAll(
                    ".product-card"
                )
            );

        cards.forEach(card => {

            const category =
                card.dataset.category;

            const name =
                card.dataset.name
                    .toLowerCase();

            const matchesCategory =
                currentCategory === "all" ||
                category === currentCategory;

            const matchesSearch =
                name.includes(searchValue);

            card.style.display =
                matchesCategory &&
                matchesSearch
                    ? ""
                    : "none";

        });

        const visibleCards =
            cards.filter(
                card =>
                    card.style.display !== "none"
            );

        if (noResults) {

            noResults.style.display =
                visibleCards.length === 0
                    ? "block"
                    : "none";

        }

    }

    categoryButtons.forEach(button => {

        button.addEventListener(
            "click",
            function() {

                categoryButtons.forEach(
                    btn =>
                        btn.classList.remove(
                            "active"
                        )
                );

                this.classList.add(
                    "active"
                );

                currentCategory =
                    this.dataset.category;

                filterProducts();

            }
        );

    });

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterProducts
        );

    }

    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            function() {

                const cards =
                    Array.from(
                        productGrid.querySelectorAll(
                            ".product-card"
                        )
                    );

                if (this.value === "low") {

                    cards.sort(
                        (a, b) =>
                            Number(
                                a.dataset.price
                            ) -
                            Number(
                                b.dataset.price
                            )
                    );

                }

                if (this.value === "high") {

                    cards.sort(
                        (a, b) =>
                            Number(
                                b.dataset.price
                            ) -
                            Number(
                                a.dataset.price
                            )
                    );

                }

                if (this.value === "name") {

                    cards.sort(
                        (a, b) =>
                            a.dataset.name.localeCompare(
                                b.dataset.name
                            )
                    );

                }

                cards.forEach(card =>
                    productGrid.appendChild(
                        card
                    )
                );

                filterProducts();

            }
        );

    }

    const params =
        new URLSearchParams(
            window.location.search
        );

    const categoryFromURL =
        params.get("category");

    if (categoryFromURL) {

        const matchingButton =
            document.querySelector(
                `.category-btn[data-category="${categoryFromURL}"]`
            );

        if (matchingButton) {

            categoryButtons.forEach(
                btn =>
                    btn.classList.remove(
                        "active"
                    )
            );

            matchingButton.classList.add(
                "active"
            );

            currentCategory =
                categoryFromURL;

        }

    }

    filterProducts();
}

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        renderCart();

        setupCheckout();

        setupProductFilters();

    }
);