/* ==========================================================================
   1. Centralized Brand Configuration (Easily Customizable)
   ========================================================================== */
const AZ_CONFIG = {
    brandName: "AZ Scrubs",

    // Official WhatsApp number for order dispatch: 01208456362
    whatsappNumber: "201208456362",
    whatsappDisplay: "01208456362",

    // Instagram profile
    instagramUrl: "https://www.instagram.com/medooo1102006?cplk=MXMxdnQxajM3eTB2aA==",
    instagramHandle: "medooo1102006",

    // Placeholder payment details for Egypt
    instapayAddress: "azscrubs@instapay",
    instapayAccount: "AZ Scrubs Apparel",
    fawryServiceCode: "78890",
    fawryReference: "AZ-98124",

    currency: "EGP"
};

/* ==========================================================================
   2. Six Signature Medical Scrub Products
   ========================================================================== */
const PRODUCTS_DATA = [
    {
        id: "scrub-01",
        name: "All-Day Comfort Flex Scrub",
        badge: "Best Seller ⭐",
        price: 1500,
        image: "a6d7082f6fb65c6632c9802106a5d87b_dfb9429ebf60.avif",
        description: "Designed for long shifts with 4 functional pockets, modern tailored collar, and fluid-shield microfibers.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Classic Navy", hex: "#0F2347" },
            { name: "Medical Teal", hex: "#00A896" },
            { name: "Charcoal Black", hex: "#121212" },
            { name: "Deep Burgundy", hex: "#580C1F" }
        ],
        defaultSize: "L",
        defaultColor: "Classic Navy"
    },
    {
        id: "scrub-02",
        name: "Surgeon Motion V-Neck",
        badge: "Surgeon's Choice 🩺",
        price: 1200,
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=700&auto=format&fit=crop",
        description: "Engineered with cooling zone microfibers and 4-way stretch flex for intense surgery sessions.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Surgical Teal", hex: "#088395" },
            { name: "Classic Navy", hex: "#0F2347" },
            { name: "Steel Gray", hex: "#374151" },
            { name: "Charcoal Black", hex: "#121212" }
        ],
        defaultSize: "M",
        defaultColor: "Surgical Teal"
    },
    {
        id: "scrub-03",
        name: "Precision Jogger Scrub Set",
        badge: "Maximum Flex 🏃",
        price: 1600,
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=700&auto=format&fit=crop",
        description: "Athletic-fit jogger pants with elasticized comfort cuffs and a matching 6-pocket utility top.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Charcoal Black", hex: "#121212" },
            { name: "Classic Navy", hex: "#0F2347" },
            { name: "Medical Teal", hex: "#00A896" },
            { name: "Royal Blue", hex: "#1D4ED8" }
        ],
        defaultSize: "L",
        defaultColor: "Charcoal Black"
    },
    {
        id: "scrub-04",
        name: "Elite Shift 6-Pocket Scrub",
        badge: "Clinical Utility 💼",
        price: 1650,
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=700&auto=format&fit=crop",
        description: "Specialized compartmentalized pockets for stethoscopes, pens, and tablets with reinforced stitching.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Deep Burgundy", hex: "#580C1F" },
            { name: "Classic Navy", hex: "#0F2347" },
            { name: "Forest Green", hex: "#1B4332" },
            { name: "Steel Gray", hex: "#374151" }
        ],
        defaultSize: "XL",
        defaultColor: "Deep Burgundy"
    },
    {
        id: "scrub-05",
        name: "Minimalist Classic Scrub",
        badge: "Essential Edition ✨",
        price: 1500,
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=700&auto=format&fit=crop",
        description: "Understated silhouette with featherlight breathability, ideal for daily hospital rotations.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Royal Blue", hex: "#1D4ED8" },
            { name: "Classic Navy", hex: "#0F2347" },
            { name: "Surgical Teal", hex: "#088395" }
        ],
        defaultSize: "M",
        defaultColor: "Royal Blue"
    },
    {
        id: "scrub-06",
        name: "Aerocool Performance Scrub",
        badge: "Cooling Tech ❄️",
        price: 1350,
        image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=700&auto=format&fit=crop",
        description: "High-airflow combed cotton-poly weave that resists wrinkles and prevents heat retention.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Classic Navy", hex: "#0F2347" },
            { name: "Charcoal Black", hex: "#121212" },
            { name: "Medical Teal", hex: "#00A896" },
            { name: "Deep Burgundy", hex: "#580C1F" }
        ],
        defaultSize: "L",
        defaultColor: "Classic Navy"
    }
];

// Current order selection state
let currentOrder = {
    product: PRODUCTS_DATA[0],
    size: PRODUCTS_DATA[0].defaultSize,
    color: PRODUCTS_DATA[0].defaultColor,
    paymentMethod: "instapay"
};

/* ==========================================================================
   3. Initialization
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initMobileDrawer();

    // If on shop.html, render the catalog & setup checkout modal listeners
    if (document.getElementById("productsGridContainer")) {
        renderProducts();
        setupModalListeners();
    }
});

/* ==========================================================================
   4. Theme Toggle (Light / Dark Appearance)
   ========================================================================== */
function initThemeToggle() {
    const toggleBtn = document.getElementById("themeToggleBtn");
    const htmlRoot = document.documentElement;

    // Retrieve saved preference or default to dark
    const savedTheme = localStorage.getItem("az_theme") || "dark";
    htmlRoot.setAttribute("data-theme", savedTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const currentTheme = htmlRoot.getAttribute("data-theme");
            const targetTheme = currentTheme === "dark" ? "light" : "dark";

            htmlRoot.setAttribute("data-theme", targetTheme);
            localStorage.setItem("az_theme", targetTheme);

            showToast(targetTheme === "dark" ? "Switched to Dark Mode 🌙" : "Switched to Light Mode ☀️");
        });
    }
}

/* ==========================================================================
   5. Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const drawer = document.getElementById("mobileDrawer");
    const closeBtn = document.getElementById("closeDrawerBtn");
    const links = document.querySelectorAll(".drawer-link");

    if (mobileBtn && drawer) {
        mobileBtn.addEventListener("click", () => drawer.classList.add("open"));
    }
    if (closeBtn && drawer) {
        closeBtn.addEventListener("click", () => drawer.classList.remove("open"));
    }
    links.forEach(l => {
        l.addEventListener("click", () => drawer && drawer.classList.remove("open"));
    });
}

/* ==========================================================================
   6. Render Product Catalog (shop.html)
   ========================================================================== */
function renderProducts() {
    const container = document.getElementById("productsGridContainer");
    if (!container) return;

    container.innerHTML = PRODUCTS_DATA.map(p => `
    <div class="product-card" id="card-${p.id}" data-selected-size="${p.defaultSize}" data-selected-color="${p.defaultColor}">
      <div class="product-img-box">
        <span class="badge-overlay">${p.badge}</span>
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>

      <div class="product-body">
        <div class="product-title-row">
          <h3 class="product-name">${p.name}</h3>
          <span class="product-price">${AZ_CONFIG.currency} ${p.price}</span>
        </div>

        <p class="product-desc">${p.description}</p>

        <!-- Interactive Size Picker -->
        <div class="picker-row">
          <div class="picker-label">
            <span>Size:</span>
            <span class="selected-val" id="size-val-${p.id}">${p.defaultSize}</span>
          </div>
          <div class="sizes-group">
            ${p.sizes.map(size => `
              <button type="button" 
                      class="size-btn ${size === p.defaultSize ? 'active' : ''}" 
                      onclick="selectSize('${p.id}', '${size}')">
                ${size}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Color Swatches -->
        <div class="picker-row">
          <div class="picker-label">
            <span>Color:</span>
            <span class="selected-val" id="color-val-${p.id}">${p.defaultColor}</span>
          </div>
          <div class="colors-group">
            ${p.colors.map(c => `
              <button type="button" 
                      class="color-swatch ${c.name === p.defaultColor ? 'active' : ''}" 
                      style="background-color: ${c.hex};" 
                      title="${c.name}" 
                      onclick="selectColor('${p.id}', '${c.name}')">
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Buy Button -->
        <button type="button" class="btn-buy" onclick="openCheckoutModal('${p.id}')">
          <i class="fa-solid fa-bag-shopping"></i>
          <span>Buy (${AZ_CONFIG.currency} ${p.price})</span>
        </button>

      </div>
    </div>
  `).join('');
}

// Size Selection Handler
window.selectSize = function (productId, size) {
    const card = document.getElementById(`card-${productId}`);
    if (!card) return;

    card.setAttribute("data-selected-size", size);
    const label = document.getElementById(`size-val-${productId}`);
    if (label) label.textContent = size;

    const buttons = card.querySelectorAll(".size-btn");
    buttons.forEach(btn => btn.classList.toggle("active", btn.textContent.trim() === size));
};

// Color Selection Handler
window.selectColor = function (productId, colorName) {
    const card = document.getElementById(`card-${productId}`);
    if (!card) return;

    card.setAttribute("data-selected-color", colorName);
    const label = document.getElementById(`color-val-${productId}`);
    if (label) label.textContent = colorName;

    const swatches = card.querySelectorAll(".color-swatch");
    swatches.forEach(s => s.classList.toggle("active", s.getAttribute("title") === colorName));
};

/* ==========================================================================
   7. Checkout Modal Management
   ========================================================================== */
window.openCheckoutModal = function (productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const card = document.getElementById(`card-${productId}`);
    const selectedSize = card ? card.getAttribute("data-selected-size") : product.defaultSize;
    const selectedColor = card ? card.getAttribute("data-selected-color") : product.defaultColor;

    currentOrder.product = product;
    currentOrder.size = selectedSize;
    currentOrder.color = selectedColor;

    // Populate modal data
    document.getElementById("modalProductName").textContent = product.name;
    document.getElementById("modalThumb").src = product.image;
    document.getElementById("modalProductPrice").textContent = `${AZ_CONFIG.currency} ${product.price}`;
    document.getElementById("modalProductSize").textContent = selectedSize;
    document.getElementById("modalProductColor").textContent = selectedColor;

    const overlay = document.getElementById("checkoutModalOverlay");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
};

function setupModalListeners() {
    const overlay = document.getElementById("checkoutModalOverlay");
    const closeBtn = document.getElementById("closeModalBtn");

    if (closeBtn) closeBtn.addEventListener("click", closeCheckoutModal);

    if (overlay) {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) closeCheckoutModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay && overlay.classList.contains("active")) {
            closeCheckoutModal();
        }
    });
}

function closeCheckoutModal() {
    const overlay = document.getElementById("checkoutModalOverlay");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
}

// Payment Option Toggle (Fawry vs InstaPay)
window.switchPayment = function (method) {
    currentOrder.paymentMethod = method;

    const tabInstapay = document.getElementById("tabInstapay");
    const tabFawry = document.getElementById("tabFawry");
    const boxInstapay = document.getElementById("instapayDetails");
    const boxFawry = document.getElementById("fawryDetails");

    if (method === "instapay") {
        tabInstapay.classList.add("active");
        tabFawry.classList.remove("active");
        boxInstapay.classList.add("active");
        boxFawry.classList.remove("active");
    } else {
        tabFawry.classList.add("active");
        tabInstapay.classList.remove("active");
        boxFawry.classList.add("active");
        boxInstapay.classList.remove("active");
    }
};

/* ==========================================================================
   8. Form Validation & WhatsApp Order Dispatch
   ========================================================================== */
window.confirmOrderWhatsApp = function () {
    const nameInput = document.getElementById("custName");
    const phoneInput = document.getElementById("custPhone");
    const govSelect = document.getElementById("custGov");
    const addressInput = document.getElementById("custAddress");

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const gov = govSelect.value.trim();
    const address = addressInput.value.trim();

    // Reset errors
    document.querySelectorAll(".error-msg").forEach(e => e.classList.remove("show"));

    let hasError = false;

    if (!name) {
        document.getElementById("nameError").classList.add("show");
        nameInput.focus();
        hasError = true;
    }
    if (!phone || phone.length < 10) {
        document.getElementById("phoneError").classList.add("show");
        if (!hasError) phoneInput.focus();
        hasError = true;
    }
    if (!gov) {
        document.getElementById("govError").classList.add("show");
        if (!hasError) govSelect.focus();
        hasError = true;
    }
    if (!address) {
        document.getElementById("addressError").classList.add("show");
        if (!hasError) addressInput.focus();
        hasError = true;
    }

    if (hasError) return;

    const paymentMethodLabel = currentOrder.paymentMethod === 'instapay' ? 'InstaPay' : 'Fawry';
    const p = currentOrder.product;

    // Construct structured WhatsApp message
    const message =
        `🌟 *NEW ORDER — AZ SCRUBS* 🌟
----------------------------------------
🩺 *Product Selection:*
• Item: *${p.name}*
• Size: *${currentOrder.size}*
• Color: *${currentOrder.color}*
• Price: *${AZ_CONFIG.currency} ${p.price}*

👤 *Customer Details:*
• Name: ${name}
• Phone: ${phone}
• Governorate: ${gov}
• Address: ${address}

💳 *Payment Method:*
• ${paymentMethodLabel}

💰 *Total Amount:* ${AZ_CONFIG.currency} ${p.price} (+ standard shipping)
----------------------------------------
Hello, I have placed this order via the AZ Scrubs official store. Please confirm availability and shipping schedule!`;

    // Open WhatsApp chat directly with brand owner
    const whatsappUrl = `https://wa.me/${AZ_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    showToast("Opening WhatsApp to confirm your order!");
    closeCheckoutModal();
};

/* ==========================================================================
   9. Helper Utilities (Clipboard Copy & Toasts)
   ========================================================================== */
window.copyData = function (elementId, successMsg) {
    const text = document.getElementById(elementId).innerText;
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => showToast(successMsg));
    } else {
        const tempInput = document.createElement("textarea");
        tempInput.value = text;
        tempInput.style.position = "fixed";
        tempInput.style.left = "-999999px";
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();
        try {
            document.execCommand('copy');
            showToast(successMsg);
        } catch (e) {
            showToast("Please copy manually: " + text);
        }
        document.body.removeChild(tempInput);
    }
};

function showToast(message) {
    const hub = document.getElementById("toastHub");
    if (!hub) return;

    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--accent-cyan)"></i> <span>${message}</span>`;
    hub.appendChild(toast);

    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 4000);
}