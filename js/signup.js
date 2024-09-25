let elSignupForm = document.querySelector(".signup-form");
elSignupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const data = {
        newusername: e.target.newusername.value,
        newpassword: e.target.userpassword.value
    };
    
    localStorage.setItem("registeredUser", JSON.stringify(data));
    
    let submitButton = elSignupForm.querySelector('button[type="submit"]');
    submitButton.innerHTML = `
        <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="loading" width="35">
    `;
    
    setTimeout(() => {
        location.pathname = "./index.html";
    }, 1000);
});