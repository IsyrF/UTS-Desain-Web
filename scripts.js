const menuItems = [
  {
    id: 1,
    name: "Nasi Goreng Magelangan",
    description: "Nasi goreng yang dicampur dengan indomie",
    price: 15000,
    category: "main",
    image:
      "https://cdn.pixabay.com/photo/2014/10/26/12/03/fried-rice-503777_1280.jpg",
  },
  {
    id: 2,
    name: "Indomie",
    description: "mie instan yang dimasak goreng atau rebus",
    price: 12000,
    category: "main",
    image:
      "https://cdn.pixabay.com/photo/2021/10/16/13/11/mie-goreng-6715015_640.jpg",
  },
  {
    id: 3,
    name: "Roti Bakar Bandung",
    description: "Roti isian yang dipanggang",
    price: 12000,
    category: "appetizer",
    image:
      "https://thumbs.dreamstime.com/b/kasino-bread-chocolate-spread-roti-bakar-bandung-toasted-close-up-277680304.jpg?w=768",
  },
  {
    id: 4,
    name: "Bubur Kacang Ijo",
    description: "Olahan kacang hijau yang diberi kuah santan",
    price: 8000,
    category: "dessert",
    image:
      "https://thumbs.dreamstime.com/b/mung-bean-porridge-bubur-kacang-hijau-indonesian-dessert-porridge-mung-beans-coconut-milk-mung-bean-porridge-bubur-244033922.jpg?w=768",
  },
];

let cart = [];

const menuGrid = document.querySelector(".menu-grid");
const cartModal = document.querySelector(".cart-modal");
const cartIcon = document.querySelector(".cart-icon");
const cartCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total h3");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
const filterBtns = document.querySelectorAll(".filter-btn");

function initializeMenu() {
  menuGrid.innerHTML = "";
  menuItems.forEach((item) => {
    const menuItem = createMenuItem(item);
    menuGrid.appendChild(menuItem);
  });
}

function createMenuItem(item) {
  const div = document.createElement("div");
  div.className = "menu-item";
  div.dataset.category = item.category;
  div.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <div class="menu-item-content">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="price">Rp ${item.price.toLocaleString()}</div>
      <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
    </div>
  `;
  return div;
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".menu-item").forEach((item) => {
      item.classList.toggle(
        "hidden",
        category !== "all" && item.dataset.category !== category
      );
    });
  });
});

function updateCart() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  updateCartModal();
}

function updateCartModal() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>Rp ${item.price.toLocaleString()}</p>
        <div class="quantity-controls">
          <button class="quantity-btn minus" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn plus" data-id="${item.id}">+</button>
        </div>
      </div>
    `;
    cartItems.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: Rp ${total.toLocaleString()}`;
}

menuGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const id = parseInt(e.target.dataset.id);
    const menuItem = menuItems.find((item) => item.id === id);
    const cartItem = cart.find((item) => item.id === id);

    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...menuItem, quantity: 1 });
    }

    updateCart();
  }
});

cartIcon.addEventListener("click", () => {
  cartModal.classList.toggle("open");
});

cartModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("quantity-btn")) {
    const id = parseInt(e.target.dataset.id);
    const cartItem = cart.find((item) => item.id === id);

    if (e.target.classList.contains("plus")) {
      cartItem.quantity++;
    } else if (e.target.classList.contains("minus") && cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      cart = cart.filter((item) => item.id !== id);
    }

    updateCart();
  }
});

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

window.addEventListener("scroll", () => {
  document
    .querySelector(".navbar")
    .classList.toggle("scrolled", window.scrollY > 50);
});

initializeMenu();
updateCart();
