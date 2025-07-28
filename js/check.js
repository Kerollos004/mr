


let checkoutProducts = document.querySelector(".checkout-products");
let checkOutPros = [];



window.onload = () => { 
    checkOutPros = JSON.parse(localStorage.getItem("cart")) || [];
    wishlistArr =JSON.parse(localStorage.getItem("wishlistItems"))
    if (checkOutPros.length > 0) {
        displayCheckOut();
    } else {
        checkoutProducts.innerHTML = "<h3 class='text-white text-center'> لا توجد منتجات في سلة التسوق</h3>";
    }
    cartArr = []
    cartContent.innerHTML = "<h3 class ='text-white text-center'> لا توجد منتجات في سلة التسوق</h3>"
    displayWislistItem();   
};

function displayCheckOut() {
    let subTotal = 0
    let shipping = 50
    let price = 0
    let checkOutHtml = "";

    checkOutPros.forEach((pro, index) => {
        price = pro.quantity * pro.newPrice
        subTotal += price
        let itemPrice = pro.newPrice * pro.quantity;
        checkOutHtml += `
        <article class="cart-item mb-3">
            <img src="./${pro.productImg}" alt="img">
            <h4 class=" item-name fs-3 text-white">${pro.name}</h4>
            <h4 class="fs-3 text-white">${itemPrice} EGP</h4>
            <span class="p-2 rounded-2 mx-2 fs-5">${pro.quantity}</span>
            <i onclick="removePro(${index})" class="trash bi bi-trash3 fs-3"></i>
        </article>
        `;
    });

    if (checkOutPros.length > 0) {
        checkoutProducts.innerHTML = checkOutHtml;
    }
    else {
        checkoutProducts.innerHTML = "<p class='text-white text-center'>  لا توجد منتجات في سله التسوق </p>";
    }
    document.querySelector(".sub").innerHTML = ` السعر : ${subTotal} جنيه`
    document.querySelector(".shipping").innerHTML = `  الشحن : ${shipping} جنيه`
    document.querySelector(".total").innerHTML = `    الاجمالي:  ${subTotal + shipping} جنيه `
    
}

function removePro(index) {
    checkOutPros.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(checkOutPros));
    displayCheckOut();

}


//----> whats app message 
function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    localStorage.removeItem("cart")
    displayCheckOut()

    let name = document.getElementById("name").value.trim()
    let phone = document.getElementById("mobile").value.trim()
    let address = document.getElementById("address").value.trim()
    let paymentMethod = document.getElementById("payment").value

    if (!name || !phone || !address) {
        let wishAlert = document.createElement("h3")
        wishAlert.setAttribute("class", "alert")
        wishAlert.innerHTML ="قم بتسجيل كامل البيانات"
        document.querySelector("body").appendChild(wishAlert)
        setTimeout(() => { wishAlert.classList.add("active") }, 1000)
        
    }

    else {
    let message = `  ده طلب جديد:\n\n`
    message += `👤 الاسم: ${name}\n📱 رقم العميل: ${phone}\n🏠 العنوان: ${address}\n💳 طريقة الدفع: ${paymentMethod}\n\n---\n`

    cart.forEach((item, i) => {
        message += `🛒 المنتج ${i + 1}:\n`
        message += `- الاسم: ${item.name}\n`
        message += `- السعر: ${item.newPrice}$\n`
        message += `- الكمية: ${item.quantity || 1}\n\n`
    })

    let total = cart.reduce((sum, item) => sum + (item.newPrice * (item.quantity || 1)), 0)
    message += `💰 الإجمالي: ${total}$`

    let encodedMessage = encodeURIComponent(message)

    let yourWhatsAppNumber = "201225344540"

    window.open(`https://wa.me/${yourWhatsAppNumber}?text=${encodedMessage}`, "_blank")

    document.getElementById("name").value = ""
    document.getElementById("mobile").value = ""
    document.getElementById("address").value = ""
}



}