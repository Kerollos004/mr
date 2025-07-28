
//open and close wishlist
let wishlist = document.querySelector(".wish-list")
let wishIcons = document.querySelectorAll(".wish-icon ")
let checkoutPage = document.querySelector(".checkout-page")
let listSpans = document.querySelectorAll(".list-count")

wishIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        wishlist.classList.add("active")
    })
})

//close wishlist
let closeWishlistIcon = document.querySelector(".remove-list")
closeWishlistIcon.onclick = () => {
    wishlist.classList.remove("active")
}

// wishlist search effect
let searchIcon = document.querySelector(".search-icon")
let search = document.querySelector(".search")
searchIcon.onclick = () => {
    search.classList.toggle("active")
    searchIcon.classList.toggle("active")
}
//mini menu effects
let miniMenuIcons = document.querySelectorAll(".mini-menu li  ")
miniMenuIcons.forEach(icon => {
    icon.addEventListener("click" , changeIconClass)
})
function changeIconClass() {
    miniMenuIcons.forEach(icon => {
        icon.classList.remove("active")
        this.classList.add("active")
    })
}
//open wishlist from footer
let wishlistLinks = document.querySelectorAll(".wislist-link")
wishlistLinks.forEach(link => {
    link.addEventListener("click", () => {
        wishlist.classList.add("active")
    })
})





//add to wishlist
let wishlistArr = []
let wishedProducts = document.querySelector(".wished-products")
function addToWishlist(i) {
    let wishedItem = pros[i]
    let added = wishlistArr.find(item => item.id == wishedItem.id)
    if (added) {
        let wishAlert = document.createElement("h3")
        wishAlert.setAttribute("class", "alert")
        wishAlert.innerHTML ="تم اضافه المنتج من قبل"
        document.querySelector("body").appendChild(wishAlert)
        setTimeout(()=>{wishAlert.classList.add("active")} , 1000)
    }
    else {
        wishlistArr.push(wishedItem)
    }
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistArr))
    
    displayWislistItem() 
}
//display wishlist item
let wishListCont = ""
function displayWislistItem() {
    let wishListAddCont = ""
    for (i = 0; i < wishlistArr.length; i++){
        wishListAddCont+= `
            <article class="wished-product mb-3 pro d-flex justify-content-between align-items-center">
                <img src = "./${wishlistArr[i].productImg}"   alt="img">
                <h3 class=" item-name fs-4 mx-3 text-white">${wishlistArr[i].name}</h3>
                <i  onclick= "deleteWishlistItem(${i})" class=" trash bi bi-trash3 fs-3"></i>
            </article>
        `
    }
    wishListCont = wishListAddCont
    if (wishlistArr.length > 0) {
        wishedProducts.innerHTML = wishListCont
    } else {
        wishedProducts.innerHTML = "<h3 class ='text-white text-center'> لا توجد منتجات في قائمة الأمنيات. </h3>"
    }
    listSpans.forEach(span=>span.innerHTML = wishlistArr.length)
}

//remove item from wishlist
function deleteWishlistItem(index) {
    wishlistArr.splice(index, 1)
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistArr))
    displayWislistItem() 
    
}
// wishlist search operations
let searchInput = document.querySelector(".search-input")

searchInput.addEventListener("keyup", searchOperation)
function searchOperation() {
    let filteredWishlistProducts = ""
    wishlistArr.forEach(product => {
        if (searchInput.value != "") {
            if (product.name.toLowerCase().includes(searchInput.value.toLowerCase())) {
            filteredWishlistProducts += `
            <article class="wished-product mb-3 pro d-flex justify-content-between align-items-center">
                <img src = "./${product.productImg}"  alt="img">
                <h3 class="fs-4 text-white">${product.name}</h3>
                <i  onclick= "deleteWishlistItem(${product})" class=" trash bi bi-trash3 fs-3"></i>
            </article>
            `
            wishedProducts.innerHTML = filteredWishlistProducts
            }
        }
        else {
            wishedProducts.innerHTML = wishListCont
        }

    })
}





function closeProductDetails() {
    productDetails.classList.remove("active")
}




//open and close cart 
let cartIcons = document.querySelectorAll(".cart-icon ")
let cartDiv =  document.querySelector(".shopping-cart")
let removeCart = document.querySelector(".remove-cart")

cartIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        cartDiv.classList.add("active")
    })
})
removeCart.onclick = () => {
    cartDiv.classList.remove("active")
}
//open cart from footer
let cartLinks = document.querySelectorAll(".cart-link")
cartLinks.forEach(link => {
    link.addEventListener("click", () => {
        cartDiv.classList.add("active")
    })
})
//cart operations
// add to cart
let cartContent = document.querySelector(".cart-content")
let cartCountSpans = document.querySelectorAll(".cart-count")
let cartArr = []
    cartArr = JSON.parse(localStorage.getItem("cart")) || []
let myItem = ""
function addToCart(i) {
    myItem = pros[i]
    let exsiting = cartArr.find(item => item.id == myItem.id)
    if (exsiting) {
        exsiting.quantity++
        let cartAlert = document.createElement("h3")
        cartAlert.setAttribute("class", "alert")
        cartAlert.innerHTML = "تم اضافه المنتج من قبل"
        document.querySelector("body").appendChild(cartAlert)
        setTimeout(()=>{cartAlert.classList.add("active")} , 1000)
    }
    else {
        myItem = { ...pros[i], quantity: 1 }
        cartArr.push(myItem)
    }
    localStorage.setItem("cart", JSON.stringify(cartArr))
    
    displayCart()
}
let itemPrice = 0
function displayCart() {
    let total = 0
    let cartHtml = ""
    for (i = 0; i < cartArr.length; i++){
         itemPrice = cartArr[i].newPrice * cartArr[i].quantity 
        total += itemPrice
        cartHtml += `
                <article class="cart-item">
                    <img src="./${cartArr[i].productImg}" alt="img">
                    <p class=" item-name fs-4 text-white">${cartArr[i].name}</p>
                    <p class="fs-4 text-white">${itemPrice} EGP</p>
                    <div class="btns p-2  ">
                        <button  onclick = "increase(${i})" class="p-2 rounded-2  fs-5 ">+</button>
                        <span   class="p-2 rounded-2  fs-5 ">${cartArr[i].quantity}</span>
                        <button   onclick = "decrease(${i})" class="p-2 rounded-2 fs-5 ">-</button>
                    </div>
                    <i  onclick="removeItem(${i})" class=" trash bi bi-trash3 fs-3"></i>
                </article>
        `
    }
    if (cartArr.length > 0) {
        cartContent.innerHTML = cartHtml
        
    }
    else {
        cartContent.innerHTML = "<h3 class ='text-white text-center'> لا توجد منتجات في سلة التسوق.</h3>"
    }
    document.querySelector(".subtotal").innerHTML =`الإجمالي: ${total} جنيه `


    cartCountSpans.forEach(span=>span.innerHTML = cartArr.length)
}
//remove item from cart
function removeItem(index) {
    cartArr.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(cartArr))
    displayCart()
}
// increase and decrease

function increase(i) {
    let increased = cartArr[i]
    increased.quantity++
    localStorage.setItem("cart", JSON.stringify(cartArr))
    displayCart()
}

function decrease(i) {
    let decreased = cartArr[i]
    decreased.quantity <= 1 ? decreased.quantity = 1 : decreased.quantity--
    localStorage.setItem("cart", JSON.stringify(cartArr))
    displayCart()
}


//window loading 
window.onload = () => {
    if (localStorage.getItem("wishlistItems") !== null) {
        wishlistArr = JSON.parse(localStorage.getItem("wishlistItems"));
        displayWislistItem()
    }
    else {
        wishlistArr = [];
        wishedProducts.innerHTML = "<h3 class ='text-white text-center'> لا توجد منتجات في قائمة الأمنيات.</h3>"

    }

    if (localStorage.getItem("cart") !== null) {
        displayCart()
    }
    else {
        cartArr = []
        cartContent.innerHTML = "<h3 class ='text-white text-center'> لا توجد منتجات في سلة التسوق</h3>"
    }
}







