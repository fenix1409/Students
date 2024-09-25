// let elSigninForm = document.querySelector(".signin-form");

// elSigninForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const data = {
//         newemail: e.target.newemail.value,
//         newpassword: e.target.newpassword.value
//     };

//     let submitButton = elSigninForm.querySelector('button[type="submit"]');
//     submitButton.innerHTML = `
//         <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="loading" width="35">
//     `;

//     let registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

//     if (registeredUser && registeredUser.newemail === data.newemail && registeredUser.newpassword === data.newpassword) {
//         localStorage.setItem("user", JSON.stringify(data));
//         setTimeout(() => location.pathname = "./list.html", 1000);
//     } 
//     else {
//         // Admin hisobini tekshirish
//         if (data.newemail === "Bobur@gamil.com" && data.newpassword === "123") {
//             localStorage.setItem("user", JSON.stringify({ username: data.newemail }));
//             setTimeout(() => location.pathname = "./admin.html", 1000);
//         } 
//         else {
//             setTimeout(() => {
    //                 submitButton.innerHTML = `Sign In Failed`;
//             }, 1000);

//             setTimeout(() => {
    //                 submitButton.innerHTML = `SIGN IN`;
//             }, 2000);
//         }
//     }
// });


let elSigninForm = document.querySelector(".signin-form");

elSigninForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        username: e.target.username.value, 
        newpassword: e.target.newpassword.value 
    };

    let submitButton = elSigninForm.querySelector('button[type="submit"]');
    submitButton.innerHTML = `
        <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="loading" width="35">
    `;

    let registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (registeredUser && registeredUser.newusername === data.username && registeredUser.newpassword === data.newpassword) {
        localStorage.setItem("user", JSON.stringify(data));
        setTimeout(() => location.pathname = "./list.html", 1000);
    } else {
        if (data.username === "Bobur" && data.newpassword === "123") {
            localStorage.setItem("user", JSON.stringify({ username: data.username }));
            setTimeout(() => location.pathname = "./list.html", 1000);
        } else {
            console.log("Sign in failed: Incorrect username or password.");
            setTimeout(() => {
                submitButton.innerHTML = `Sign In Failed`;
            }, 1000);

            setTimeout(() => {
                submitButton.innerHTML = `SIGN IN`;
            }, 2000);
        }
    }
});