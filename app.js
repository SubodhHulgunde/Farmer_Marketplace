// ───── DATA ─────
const products = [
  { id:1, name:'Fresh Spinach', emoji:'🥬', category:'vegetables', price:35, unit:'250g', farmer:'Ravi Kumar', village:'Nashik, MH', rating:4.8, reviews:124, organic:true, featured:true },
  { id:2, name:'Country Tomatoes', emoji:'🍅', category:'vegetables', price:60, unit:'1kg', farmer:'Meena Devi', village:'Pune, MH', rating:4.6, reviews:89, organic:false, featured:true },
  { id:3, name:'Sweet Mangoes', emoji:'🥭', category:'fruits', price:180, unit:'1kg', farmer:'Ganesh Patil', village:'Ratnagiri, MH', rating:4.9, reviews:312, organic:true, featured:true },
  { id:4, name:'Green Chillies', emoji:'🌶️', category:'spices', price:45, unit:'250g', farmer:'Sunita Bai', village:'Nagpur, MH', rating:4.5, reviews:56, organic:true, featured:false },
  { id:5, name:'A2 Cow Milk', emoji:'🥛', category:'dairy', price:70, unit:'1 litre', farmer:'Bharat Singh', village:'Satara, MH', rating:4.7, reviews:201, organic:true, featured:true },
  { id:6, name:'Alphonso Mangoes', emoji:'🍊', category:'fruits', price:320, unit:'1kg', farmer:'Priya Joshi', village:'Devgad, MH', rating:5.0, reviews:445, organic:true, featured:true },
  { id:7, name:'Basmati Rice', emoji:'🍚', category:'grains', price:120, unit:'1kg', farmer:'Om Prakash', village:'Kolhapur, MH', rating:4.4, reviews:78, organic:false, featured:false },
  { id:8, name:'Wild Honey', emoji:'🍯', category:'honey', price:380, unit:'500g', farmer:'Arjun Yadav', village:'Mahabaleshwar, MH', rating:4.9, reviews:167, organic:true, featured:true },
  { id:9, name:'Purple Brinjal', emoji:'🍆', category:'vegetables', price:40, unit:'500g', farmer:'Kavita Shinde', village:'Solapur, MH', rating:4.3, reviews:34, organic:false, featured:false },
  { id:10, name:'Turmeric Powder', emoji:'🌿', category:'spices', price:150, unit:'250g', farmer:'Vijay More', village:'Sangli, MH', rating:4.8, reviews:93, organic:true, featured:false },
  { id:11, name:'Green Peas', emoji:'🫛', category:'vegetables', price:80, unit:'500g', farmer:'Lata Pawar', village:'Ahmednagar, MH', rating:4.6, reviews:58, organic:true, featured:false },
  { id:12, name:'Pomegranate', emoji:'🍎', category:'fruits', price:140, unit:'1kg', farmer:'Suresh Kale', village:'Solapur, MH', rating:4.7, reviews:112, organic:false, featured:false },
  { id:13, name:'Toor Dal', emoji:'🫘', category:'grains', price:130, unit:'1kg', farmer:'Nandini Rao', village:'Latur, MH', rating:4.5, reviews:67, organic:true, featured:false },
  { id:14, name:'Fresh Butter', emoji:'🧈', category:'dairy', price:90, unit:'250g', farmer:'Bharat Singh', village:'Satara, MH', rating:4.8, reviews:88, organic:true, featured:false },
  { id:15, name:'Banana', emoji:'🍌', category:'fruits', price:50, unit:'1 dozen', farmer:'Deepak Nikam', village:'Jalgaon, MH', rating:4.4, reviews:145, organic:false, featured:false },
  { id:16, name:'Drumstick', emoji:'🥒', category:'vegetables', price:30, unit:'250g', farmer:'Ravi Kumar', village:'Nashik, MH', rating:4.2, reviews:23, organic:false, featured:false },
];

const farmers = [
  { id:1, name:'Ravi Kumar', avatar:'👨‍🌾', loc:'Nashik, Maharashtra', banner:'#d8f3dc', products:8, rating:4.8, sales:'2.1k', tags:['Vegetables','Organic'], bio:'3rd generation farmer growing pesticide-free vegetables for 15 years.' },
  { id:2, name:'Meena Devi', avatar:'👩‍🌾', loc:'Pune, Maharashtra', banner:'#fde8d0', products:12, rating:4.7, sales:'3.4k', tags:['Vegetables','Fruits'], bio:'Specializes in hybrid tomatoes and seasonal fruits.' },
  { id:3, name:'Ganesh Patil', avatar:'🧑‍🌾', loc:'Ratnagiri, Maharashtra', banner:'#fef3c7', products:5, rating:4.9, sales:'5.7k', tags:['Alphonso Mangoes','Organic'], bio:'Famous for the finest Alphonso mangoes from Konkan coast.' },
  { id:4, name:'Sunita Bai', avatar:'👩‍🌾', loc:'Nagpur, Maharashtra', banner:'#ffe4e6', products:9, rating:4.5, sales:'1.2k', tags:['Spices','Herbs'], bio:'Grows traditional spice varieties using ancestral farming methods.' },
  { id:5, name:'Bharat Singh', avatar:'👨‍🌾', loc:'Satara, Maharashtra', banner:'#dbeafe', products:6, rating:4.8, sales:'4.1k', tags:['Dairy','A2 Milk'], bio:'A2 Gir cow dairy farm with 30 cows. Free-range, grass-fed.' },
  { id:6, name:'Arjun Yadav', avatar:'🧑‍🌾', loc:'Mahabaleshwar, Maharashtra', banner:'#fef9c3', products:3, rating:4.9, sales:'2.8k', tags:['Honey','Forest Produce'], bio:'Wild honey harvester from the hills of Mahabaleshwar.' },
];

// ───── CART STATE ─────
let cart = [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  showToast(`✓ ${product.name} added to cart`);
}

function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  updateCartUI();
  renderCart();
}

function changeQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) return removeFromCart(productId);
  updateCartUI();
  renderCart();
}

function updateCartUI() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cartCount').textContent = total;
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!cart.length) {
    container.innerHTML = '<div class="cart-empty">🛒<br/><br/>Your cart is empty</div>';
    footer.innerHTML = '';
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price} / ${item.unit}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="cart-remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
      <div style="font-weight:700;font-size:15px;">₹${item.price * item.qty}</div>
    </div>
  `).join('');

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const delivery = subtotal > 500 ? 0 : 40;
  const total = subtotal + delivery;

  footer.innerHTML = `
    <div style="font-size:14px;color:var(--gray);">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <span>Subtotal</span><span>₹${subtotal}</span>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:14px;">
        <span>Delivery</span><span>${delivery === 0 ? '<span style="color:var(--green)">FREE</span>' : '₹' + delivery}</span>
      </div>
    </div>
    <div class="cart-total"><span>Total</span><span>₹${total}</span></div>
    ${delivery > 0 ? `<p style="font-size:12px;color:var(--green);text-align:center;">Add ₹${500-subtotal} more for free delivery</p>` : ''}
    <button class="btn-primary" style="width:100%;text-align:center;" onclick="checkout()">Proceed to Checkout →</button>
  `;
}

// ───── PAGES ─────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById(`page-${name}`).classList.add('active');
  const link = document.querySelector(`[data-page="${name}"]`);
  if (link) link.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'shop') renderShop();
  if (name === 'farmers') renderFarmers();
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});

// ───── RENDER PRODUCTS ─────
function productCardHTML(p) {
  const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 ? '½' : '');
  return `
    <div class="product-card">
      <div class="product-img">
        <span>${p.emoji}</span>
        ${p.organic ? '<span class="organic-badge">ORGANIC</span>' : ''}
      </div>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-rating">${stars} <span style="color:var(--gray)">(${p.reviews})</span></div>
        <div class="product-farmer">by <span>${p.farmer}</span> · ${p.village}</div>
        <div class="product-footer">
          <div class="product-price">₹${p.price} <small>/ ${p.unit}</small></div>
          <button class="btn-add" onclick="addToCart(${p.id})">+ Add</button>
        </div>
      </div>
    </div>
  `;
}

function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  const featured = products.filter(p => p.featured).slice(0, 6);
  grid.innerHTML = featured.map(productCardHTML).join('');
}

function renderShop() {
  const cat = document.getElementById('filterCat')?.value || '';
  const sort = document.getElementById('sortBy')?.value || 'popular';
  const search = document.getElementById('searchInput')?.value?.toLowerCase() || '';
  const maxPrice = parseInt(document.getElementById('priceRange')?.value || 500);
  const organicOnly = document.getElementById('organicOnly')?.checked || false;

  let filtered = products.filter(p => {
    if (cat && p.category !== cat) return false;
    if (search && !p.name.toLowerCase().includes(search) && !p.farmer.toLowerCase().includes(search)) return false;
    if (p.price > maxPrice) return false;
    if (organicOnly && !p.organic) return false;
    return true;
  });

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'newest') filtered.reverse();
  else filtered.sort((a, b) => b.reviews - a.reviews);

  document.getElementById('shopCount').textContent = `${filtered.length} products`;
  document.getElementById('shopGrid').innerHTML = filtered.length
    ? filtered.map(productCardHTML).join('')
    : '<p style="color:var(--gray);grid-column:1/-1;text-align:center;padding:60px 0;">No products found</p>';
}

function renderFarmers() {
  document.getElementById('farmersGrid').innerHTML = farmers.map(f => `
    <div class="farmer-card">
      <div class="farmer-banner" style="background:${f.banner}">
        <div class="farmer-avatar">${f.avatar}</div>
      </div>
      <div class="farmer-body" style="padding-top:48px;">
        <div class="farmer-name">${f.name}</div>
        <div class="farmer-loc">📍 ${f.loc}</div>
        <div class="farmer-tags">${f.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <p style="font-size:13px;color:var(--gray);line-height:1.6;margin-bottom:14px;">${f.bio}</p>
        <div class="farmer-stats">
          <div class="farmer-stat"><strong>${f.products}</strong><small>Products</small></div>
          <div class="farmer-stat"><strong>★ ${f.rating}</strong><small>Rating</small></div>
          <div class="farmer-stat"><strong>${f.sales}</strong><small>Sales</small></div>
        </div>
      </div>
    </div>
  `).join('');
}

// ───── CART UI ─────
document.getElementById('cartBtn').addEventListener('click', openCart);

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').style.display = 'block';
  renderCart();
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').style.display = 'none';
}

function checkout() {
  closeCart();
  showToast('🎉 Order placed! Farmer will confirm shortly.');
  cart = [];
  updateCartUI();
}

// ───── FILTERS ─────
function filterCategory(cat) {
  showPage('shop');
  setTimeout(() => {
    document.getElementById('filterCat').value = cat;
    renderShop();
  }, 100);
}

function updatePrice(val) {
  document.getElementById('priceLabel').textContent = val;
  renderShop();
}

// ───── LOGIN ─────
document.getElementById('loginBtn').addEventListener('click', () => {
  document.getElementById('loginModal').classList.add('open');
});

function closeLogin() {
  document.getElementById('loginModal').classList.remove('open');
}

document.getElementById('loginModal').addEventListener('click', e => {
  if (e.target === document.getElementById('loginModal')) closeLogin();
});

// ───── TOAST ─────
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ───── SELLER FORM ─────
function submitFarmerForm() {
  showToast('🌾 Application submitted! We\'ll contact you in 24hrs.');
}

// ───── INIT ─────
renderFeatured();
renderCart();
