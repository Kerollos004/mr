//  getdata function and display product
let productBoxs = document.querySelector(".product-boxs")
let pros
window,addEventListener("DOMContentLoaded" , getAllData)
async function getAllData () {
    let res = await fetch("products.json")
    let results = await res.json()
    pros = results
    displayAllProducts()
}
let productsHtml = "";

// عرض كل المنتجات
function displayAllProducts(items = pros) {
    productsHtml = ""; 

    for (let i = 0; i < items.length; i++) {
        productsHtml += `
        <div class="position-relative product-box border rounded-4 my-4 overflow-hidden shadow-sm bg-white ">
            <div class="product-img-wrapper">
                <img src="./${items[i].productImg}"  class="product-img w-100" alt="img">
            </div>

            <div class="p-3 card-body">
                <h5 class="card-title fw-bold">${items[i].name}</h5>
                <p class="card-text text-muted">${items[i].productDescription}</p>
                
                <div class="prices d-flex align-items-center gap-2">
                    <p class="text-muted text-decoration-line-through mb-0">${items[i].oldPrice} EGP</p>
                    <h3 class="text-danger mb-0">${items[i].newPrice} EGP</h3>
                </div>
            </div>

            <div class="layer z-2 position-absolute top-0 start-0 w-100 h-100 text-white d-flex flex-column align-items-center justify-content-center gap-4">
                <i onclick="addToCart(${i})" class="cart-icon fs-4 d-flex align-items-center justify-content-center bi bi-bag cursor-pointer"></i>
                <i onclick="addToWishlist(${i})" class="fs-4 d-flex align-items-center justify-content-center bi bi-bag-heart cursor-pointer"></i>
            </div>
            <div class="discount ">
<span>وفر %${Math.round(((pros[i].oldPrice - pros[i].newPrice) / pros[i].oldPrice) * 100)}</span>
            </div>
        </div>`;
    }

    productBoxs.innerHTML = productsHtml;
}
let filterLinks = document.querySelectorAll(".filter-link");
filterLinks.forEach(link => {
    link.addEventListener("click", changeClass)
    link.addEventListener("click" , filterData)
})

function changeClass(e) {
    e.preventDefault()

    filterLinks.forEach(link => link.classList.remove("active"));
    this.classList.add("active");
}

function filterData(e) {
    e.preventDefault()

    let selectedCategory = this.dataset.filter;

    if (selectedCategory === "الكل") {
        displayAllProducts();
    } else {
        let filteredItems = pros.filter(item => item.category === selectedCategory);
        displayAllProducts(filteredItems);
    }
}

//search operation
let productsInput = document.querySelector(".products-input")

productsInput.addEventListener("keyup", filterSearch)

function filterSearch() {
    let searchHtml = ""
    if (productsInput.value != "") {
        pros.forEach((pro , index) => {
            if (pro.name.toLowerCase().includes( productsInput.value.toLowerCase().trim())) {
                searchHtml += `
    <div class="card ${pro.category} porduct-box my-4">

    <div class="product-img-wrapper">
        <img src="./${pro.productImg}" class="product-img w-100" alt="img">
    </div>

    <div class="p-3 card-body">
        <h5 class="card-title fw-bold">${pro.name}</h5>
        <p class="card-text text-muted">${pro.productDescription}</p>
        
        <div class="prices d-flex align-items-center gap-2">
            <p class="text-muted text-decoration-line-through mb-0">${pro.oldPrice} EGP</p>
            <h3 class="text-danger mb-0">${pro.newPrice} EGP</h3>
        </div>
    </div>

    <div class="layer z-2 position-absolute top-0 start-0 w-100 h-100 text-white d-flex flex-column align-items-center justify-content-center gap-4 ">
        <i onclick="addToCart(${index})" class="cart-icon fs-4 d-flex align-items-center justify-content-center bi bi-bag cursor-pointer"></i>
        <i onclick="addToWishlist(${index})" class="fs-4 d-flex align-items-center justify-content-center bi bi-bag-heart cursor-pointer"></i>
    </div>
</div>
                `
            }
        })
        productBoxs.innerHTML = searchHtml
    }
    else {
        productBoxs.innerHTML = productsHtml
    }
}
