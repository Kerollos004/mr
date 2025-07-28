//toggle menu
let nav = document.querySelector(".n-bar")
let menuBtn = document.querySelector(".menu-btn")
menuBtn.onclick = () => {
    menuBtn.classList.toggle("active")
    nav.classList.toggle("active")
}
// //change active class
let links = document.querySelectorAll(".link")
links.forEach(link => {
    link.addEventListener("click", changeClass)
    link.addEventListener("click", closeNav)
})
function closeNav() {
    nav.classList.remove("active")
    menuBtn.classList.remove("active")
}
function changeClass() {
    links.forEach(link => {
        link.classList.remove("active")
        this.classList.add("active")
    })
}

// //3d models
VanillaTilt.init(document.querySelector(".services-box"), {
    max: 15,
    speed: 400
});
VanillaTilt.init(document.querySelectorAll(".services-box"));


//  getdata function and display product
let productBoxs = document.querySelector(".product-boxs")

let pros = ""
async function getData() {
    let res = await fetch("products.json")
    let results = await res.json()
    pros = results
    displayHomeProducts()
}
//display products
function displayHomeProducts() {
    for (let i = 0; i <8 ; i++) {
        productBoxs.innerHTML += `
<div class="position-relative product-box border rounded-4  my-3  overflow-hidden shadow-sm bg-white">
    <div class="product-img-wrapper">
        <img src="./${pros[i].productImg}" class="product-img w-100" alt="img">
    </div>

    <div class="p-3 card-body">
        <h5 class="card-title fw-bold">${pros[i].name}</h5>
        <p class="card-text text-muted">${pros[i].productDescription}</p>
        
        <div class="prices d-flex align-items-center gap-2">
            <p class="text-muted text-decoration-line-through mb-0">${pros[i].oldPrice} EGP</p>
            <h3 class="text-danger mb-0">${pros[i].newPrice} EGP</h3>
        </div>
    </div>

    <div class="layer z-3 position-absolute top-0 start-0 w-100 h-100 text-white d-flex flex-column align-items-center justify-content-center gap-4 bg-dark bg-opacity-50">
        <i onclick="addToCart(${i})" class="cart-icon fs-4 d-flex align-items-center justify-content-center bi bi-bag cursor-pointer"></i>
        <i onclick="addToWishlist(${i})" class="fs-4 d-flex align-items-center justify-content-center bi bi-bag-heart cursor-pointer"></i>
    </div>

    <div class="discount ">
<span>وفر %${Math.round(((pros[i].oldPrice - pros[i].newPrice) / pros[i].oldPrice) * 100)}</span>
    </div>
</div>


                        `
    }
}

getData()




//gsap

let basicTl = gsap.timeline()
basicTl.fromTo("header", 
    {y:"-200%"},
    { y: "0%" , duration:1.5 , ease:"none" }
)

basicTl.fromTo(".n-bar", 
{ x: "-200%" },
{x:"0%" , duration:1 , ease:"none"}
)

basicTl.fromTo(".n-bar ul li a",
    { opacity: 0 },
    { opacity: 1, duration: 1, delay: 1, ease:"none",stagger: .5 }
)

gsap.fromTo(".home-content h3 , .home-content p , .home-content a ",
    { opacity:0  , y:"20" },
    { opacity: 1,y:0 , duration: .5, delay:3 ,ease:"none"  , stagger:.5 }
)
//scrolltrigger
let aboutScrollTl = gsap.timeline({
            scrollTrigger: {
            trigger: ".about",
            start: "top 70%",
            toggleActions:"play none none none"
        }
})

aboutScrollTl.fromTo(".about-text ", 
    { x: "-200%" },
    {x: "0%", duration: 1, ease:"none",}
)
aboutScrollTl.fromTo(".about-img img ", 
    { x: "200%" },
    { x: "0%", duration: 1,ease:"none",}
)

aboutScrollTl.fromTo(".slide-box", 
    { opacity:0 },
    {
        opacity:1 , duration: 1,  stagger: .5,ease:"none",
    }
)

let servicesScrollTl = gsap.timeline({
            scrollTrigger: {
            trigger: ".services",
            start: "top 70%",
            toggleActions:"play none none none"
        }
})
servicesScrollTl.fromTo(".services-box", 
    { opacity:0 , y:"30%" },
    {
        opacity:1 , y:"0%", duration: .5,delay:1 ,  stagger: .5,ease:"none",
    }
)

let porductScrollTl = gsap.timeline({
            scrollTrigger: {
            trigger: ".products",
            start: "top 70%",
            toggleActions:"play none none none"
        }
})

porductScrollTl.fromTo(".porduct-box", 
    { y: "30%"  ,opacity:0 },
    {
        opacity:1 , y: "0%", duration: .5, delay: 1, stagger: .5, ease:"none",
    }
)

let connectScrollTl = gsap.timeline({
            scrollTrigger: {
            trigger: ".connect",
            start: "top 70%",
            toggleActions:"play none none none"
        }
})

connectScrollTl.fromTo("form", 
    { y: "30%" , opacity:0 },
    {
        opacity:1, y: "0%", duration: 1, delay: 1,ease:"none",
    }
)

