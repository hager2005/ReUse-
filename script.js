const items = [
  { title: "كرسي مكتب مريح", category: "أثاث", type: "تبرع", location: "القاهرة - المعادي", age: "منذ ساعتين", image: "https://images.unsplash.com/photo-1598300053650-0b6a1f1d0d60?auto=format&fit=crop&w=700&q=80" },
  { title: "مجموعة كتب تطوير ذاتي", category: "كتب", type: "تبرع", location: "القاهرة - التجمع", age: "منذ 5 ساعات", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80" },
  { title: "مصباح طاولة خشبي", category: "أثاث", type: "تبادل", location: "الجيزة - الدقي", age: "منذ يوم", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80" },
  { title: "ملابس أطفال بحالة ممتازة", category: "ملابس", type: "تبرع", location: "الإسكندرية", age: "منذ يومين", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=80" },
  { title: "أدوات زراعة صغيرة", category: "أدوات منزلية", type: "تبادل", location: "القاهرة - مصر الجديدة", age: "منذ يومين", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80" },
  { title: "طابعة منزلية", category: "أجهزة", type: "تبرع", location: "القاهرة - مدينة نصر", age: "منذ 3 أيام", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=700&q=80" },
  { title: "طقم أكواب سيراميك", category: "أدوات منزلية", type: "تبادل", location: "الجيزة - المهندسين", age: "منذ 3 أيام", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80" },
  { title: "كنبة صغيرة لغرفة المعيشة", category: "أثاث", type: "تبرع", location: "القاهرة - زهراء المعادي", age: "منذ 4 أيام", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80" }
];

const grid = document.getElementById("itemsGrid");
const modal = document.getElementById("itemModal");
let activeFilter = "الكل";
let visibleCount = 4;

function renderItems() {
  const filtered = activeFilter === "الكل" ? items : items.filter(item => item.type === activeFilter);
  grid.innerHTML = filtered.slice(0, visibleCount).map((item, index) => `
    <article class="item-card" data-index="${index}">
      <div class="item-image">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <span class="badge">${item.type}</span>
        <button class="favorite" type="button" aria-label="إضافة إلى المفضلة">♡</button>
      </div>
      <div class="item-info">
        <h3>${item.title}</h3>
        <p>${item.category}</p>
        <div class="item-meta"><span>⌖ ${item.location}</span><span>${item.age}</span></div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".favorite").forEach(button => {
    button.addEventListener("click", () => {
      button.classList.toggle("selected");
      button.textContent = button.classList.contains("selected") ? "♥" : "♡";
    });
  });
  document.getElementById("loadMore").hidden = visibleCount >= filtered.length;
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    visibleCount = 4;
    renderItems();
  });
});

document.querySelectorAll(".category-card").forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    const firstMatch = items.findIndex(item => item.category === category);
    document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
    if (firstMatch >= 0) grid.querySelectorAll(".item-card")[firstMatch]?.animate([{ transform: "scale(.96)" }, { transform: "scale(1)" }], { duration: 350 });
  });
});

document.getElementById("loadMore").addEventListener("click", () => {
  visibleCount += 4;
  renderItems();
});

function openItemModal() { modal.showModal(); }
document.getElementById("addItemButton").addEventListener("click", openItemModal);
document.getElementById("heroAddButton").addEventListener("click", openItemModal);

document.getElementById("itemForm").addEventListener("submit", event => {
  const submitter = event.submitter;
  if (!submitter || submitter.value !== "default") return;
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  items.unshift({
    title: data.get("title"),
    category: data.get("category"),
    type: data.get("type"),
    location: data.get("location"),
    age: "الآن",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=700&q=80"
  });
  visibleCount = 4;
  activeFilter = "الكل";
  document.querySelectorAll(".filter").forEach(button => button.classList.toggle("active", button.dataset.filter === "الكل"));
  renderItems();
  modal.close();
  event.currentTarget.reset();
  document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.getElementById("searchButton").addEventListener("click", () => {
  document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
});

renderItems();
