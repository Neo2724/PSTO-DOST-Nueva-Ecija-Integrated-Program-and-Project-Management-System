window.onload = function () {
    let currentSystem = '';

    function showLoginModal(system) {
        currentSystem = system;
        document.getElementById('loginModal').style.display = 'block';
    }

    document.querySelectorAll('.choice-card button').forEach((btn) => {
        btn.onclick = function () {
            showLoginModal(this.getAttribute('onclick').match(/'(\w+)'/)[1]);
        };
    });

    document.querySelector('.close').onclick = function () {
        document.getElementById('loginModal').style.display = 'none';
    };

  
    document.getElementById("loginForm").onsubmit = async function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Username and password are required!",
            });
            return;
        }

        try {
            const response = await fetch("http://localhost/dostphp/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, system: currentSystem }),
            });

            const data = await response.json();
            console.log("Response:", data); // Debugging

            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful!",
                    text: "Redirecting...",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = `http://localhost/dostphp/${currentSystem}/index.php`;
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: data.message,
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Login Error",
                text: "Something went wrong. Please try again later.",
            });
        }
    };




//sign up

document.getElementById("signupButton").onclick = function () {
    document.getElementById("signupModal").style.display = "block";
};

document.getElementById("closeSignup").onclick = function () {
    document.getElementById("signupModal").style.display = "none";
};

// Close modal when clicking outside
window.onclick = function (event) {
    const signupModal = document.getElementById("signupModal");
    if (event.target === signupModal) {
        signupModal.style.display = "none";
    }
};


    document.getElementById("signupForm").onsubmit = async function (event) {
        event.preventDefault();
    
        const username = document.getElementById("signupUsername").value.trim();
        const password = document.getElementById("signupPassword").value.trim();
        const program = document.getElementById("signupProgram").value.trim();
    
        if (!username || !password || !program) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please fill out all fields!",
            });
            return;
        }
    
        try {
            const response = await fetch("http://localhost/dostphp/signup.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, program }),
            });
    
            const data = await response.json();
            console.log("Response:", data); // Debugging
    
            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Account Created!",
                    text: "You can now log in.",
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    document.getElementById('signupModal').style.display = 'none'; // Close modal
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Signup Failed",
                    text: data.message,
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Signup Error",
                text: "Something went wrong. Please try again later.",
            });
        }
    };
    
};


