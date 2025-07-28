(function () {
  emailjs.init("FNOKCmc_vD4QP74to"); // ← public key
})();
let Alert = document.createElement("h3")
Alert.setAttribute("class", "alert")
window.addEventListener("DOMContentLoaded", function () {
const form = document.getElementById("contact-form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault(); 

    emailjs.sendForm("mail", "template_2qv3bvs", form)
        .then(() => {
            Alert.innerHTML = "تم الارسال بنجاح"
            setTimeout(() => { Alert.classList.add("active") }, 1000)
            document.querySelector("body").appendChild(Alert)
            form.reset();
        })
        .catch(() => {
            Alert.innerHTML = "فشل الارسال"
            setTimeout(() => { Alert.classList.add("active") }, 1000)
            document.querySelector("body").appendChild(Alert)
        });
    });
    } else {
    console.warn("Form not found");
}
});

