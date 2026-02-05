/* ================= NAVBAR HIDE ON SCROLL ================= */

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  let currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // scroll down → hide
    navbar.classList.add("nav-hide");
  } else {
    // scroll up → show
    navbar.classList.remove("nav-hide");
  }

  lastScrollY = currentScrollY;
});


/* ================= THEME TOGGLE ================= */

const sun = document.querySelector("#sun")
const moonNight = document.querySelector("#moon-night")


sun.addEventListener("click", () => {
    sun.style.display = "none"
    moonNight.style.display = "block"


    document.body.classList.remove("light")
    document.body.classList.add("dark")
})

moonNight.addEventListener("click", () => {
    sun.style.display = "block"
    moonNight.style.display = "none"


    document.body.classList.remove("dark")
    document.body.classList.add("light")
})

/* ================= PRODUCTS ================= */

let productList = document.querySelector("#productList")


let allProducts = []

let request = fetch("https://fakestoreapi.com/products")
.then(res => res.json())
.then(products => {
    
    allProducts = products

    
    let productHtml = allProducts.map(function (product) {
        return `
        <div class="product-card">
        <img src="${product.image}" alt="img">
        <h6>${product.title}</h6>
        <p>${product.description.slice(0, 90)}...</p>
        <h3>$${product.price}</h3>
        <h5>$${product.category}</h5>
        </div>`
    })
    productList.innerHTML = productHtml.join("")
})  
.catch(err => console.error(err))

let All = document.querySelector(".All")
let Shirts = document.querySelector(".Shirts")
let Jackets = document.querySelector(".Jackets")
let Jewellerys = document.querySelector(".Jewellerys")
let Electronics = document.querySelector(".Electronics")



All.addEventListener("click", function () {
    let productHtml = allProducts.map(function (product) {
        return `    
        <div class="product-card">
            <img src="${product.image}" alt="img">
            <h6>${product.title}</h6>
            <p>${product.description.slice(0, 90)}...</p>
            <h3>$${product.price}</h3>
            <h5>$${product.category}</h5>
        </div>`
    })
    productList.innerHTML = productHtml.join("")
})
Shirts.addEventListener("click", () => {
    let filtered = allProducts.filter(product =>
        product.category === "men's clothing"
    )

    let productHtml = filtered.map(product => {
        return `
        <div class="product-card">
            <img src="${product.image}">
            <h6>${product.title}</h6>
            <p>${product.description.slice(0, 90)}...</p>
            <h3>$${product.price}</h3>
        </div>`
    })

    productList.innerHTML = productHtml.join("")
})

Jackets.addEventListener("click", () => {
    let filtered = allProducts.filter(product =>
        product.category === "women's clothing"
    )

    let productHtml = filtered.map(product => {
        return `
        <div class="product-card">
            <img src="${product.image}">
            <h6>${product.title}</h6>
            <p>${product.description.slice(0, 90)}...</p>
            <h3>$${product.price}</h3>
        </div>`
    })

    productList.innerHTML = productHtml.join("")
})

Jewellerys.addEventListener("click", () => {
    let filtered = allProducts.filter(product =>
        product.category === "jewelery"
    )

    let productHtml = filtered.map(product => {
        return `
        <div class="product-card">
            <img src="${product.image}">
            <h6>${product.title}</h6>
            <p>${product.description.slice(0, 90)}...</p>
            <h3>$${product.price}</h3>
        </div>`
    })

    productList.innerHTML = productHtml.join("")
})

Electronics.addEventListener("click", () => {
    let filtered = allProducts.filter(product =>
        product.category === "electronics"
    )

    let productHtml = filtered.map(product => {
        return `
        <div class="product-card">
            <img src="${product.image}">
            <h6>${product.title}</h6>
            <p>${product.description.slice(0, 90)}...</p>
            <h3>$${product.price}</h3>
        </div>`
    })

    productList.innerHTML = productHtml.join("")
})