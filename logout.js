

const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
        location.href = "../../index.html";

        console.log("signup out");
    });
});