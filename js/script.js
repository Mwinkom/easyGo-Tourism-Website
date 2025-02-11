  // JavaScript for Dynamic Tour Updates on Details page
   
   document.addEventListener("DOMContentLoaded", function () {
    const queryParams = new URLSearchParams(window.location.search);
    const tourTitle = queryParams.get("title") || "Tour Title";
    const tourLocation = queryParams.get("location") || "Location";
    const tourPrice = queryParams.get("price") || "GH₵2,500";
    const tourImage = queryParams.get("image") || "assets/images/gray.png";

    console.log("Title:", tourTitle);
    console.log("Location:", tourLocation);
    console.log("Price:", tourPrice);
    console.log("Image:", tourImage);

    document.getElementById("tourTitle").textContent = tourTitle;
    document.getElementById("tourLocation").innerHTML = `<i class="bi bi-geo-alt-fill me-2"></i>${tourLocation}`;
    document.getElementById("tourPrice").textContent = `${tourPrice} / per person`;
    document.getElementById("tourImage").src = tourImage;
  });


  // SIGN UP PAGE

  function toggleForm(userType) {
    const touristForm = document.getElementById('touristForm');
    const curatorForm = document.getElementById('curatorForm');
    const touristBtn = document.getElementById('touristBtn');
    const curatorBtn = document.getElementById('curatorBtn');

    if (userType === 'tourist') {
      touristForm.style.display = 'block';
      curatorForm.style.display = 'none';
      touristBtn.classList.add('active');
      curatorBtn.classList.remove('active');
    } else {
      touristForm.style.display = 'none';
      curatorForm.style.display = 'block';
      curatorBtn.classList.add('active');
      touristBtn.classList.remove('active');
    }
  }

  // Text Change on Form Left

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("curatorBtn").addEventListener("click", function () {
      document.getElementById('loginTitle').textContent = `Curate tours with easyGo!`;
    });
  
    document.getElementById("touristBtn").addEventListener("click", function () {
      document.getElementById('loginTitle').textContent = `Explore with easyGo!`;
    });
  });

  function handleTouristSignUp(event) {
    event.preventDefault();
  
    const name = document.getElementById('touristName').value;
    const email = document.getElementById('touristEmail').value;
    const password = document.getElementById('touristPassword').value;
  
    // Store tourist details in localStorage
    const touristData = { name, email, password, userType: 'tourist' };
    localStorage.setItem(email, JSON.stringify(touristData)); // Save by email as key
  
    // Redirect to Login Page
    window.location.href = 'login1.html';
  }
  
  function handleCuratorSignUp(event) {
    event.preventDefault();
  
    const name = document.getElementById('curatorName').value;
    const email = document.getElementById('curatorEmail').value;
    const password = document.getElementById('curatorPassword').value;
  
    // Store curator details in localStorage
    const curatorData = { name, email, password, userType: 'curator' };
    localStorage.setItem(email, JSON.stringify(curatorData)); // Save by email as key
  
    // Redirect to Login Page
    window.location.href = 'login1.html';
  }

  //LOGIN PAGE

  function handleLogin(event) {
    event.preventDefault();
  
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    // Fetch user data from localStorage
    const userData = localStorage.getItem(email);
    if (!userData) {
      alert('No account found with this email!');
      return;
    }
  
    const user = JSON.parse(userData);
  
    // Validate password
    if (user.password !== password) {
      alert('Incorrect password!');
      return;
    }
  
    // Store current logged-in user in session
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
  
    // Redirect based on userType
    if (user.userType === 'tourist') {
      window.location.href = 'experiences.html'; // Redirect to Experiences Page
    } else if (user.userType === 'curator') {
      window.location.href = 'curator_dash.html'; // Redirect to Curator Dashboard
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
  
    if (user) {
      // Update Navbar
      const navbar = document.querySelector('.navbar-collapse');
      navbar.innerHTML = `
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item mx-2"><a class="nav-link" href="index.html">Home</a></li>
          <li class="nav-item mx-2"><a class="nav-link" href="experiences.html">Experiences</a></li>
          ${user.userType === 'curator' ? `<li class="nav-item mx-2"><a class="nav-link" href="curator_dash.html">Dashboard</a></li>` : ''}
          <li class="nav-item mx-2"><a class="nav-link" href="about.html">About</a></li>
          <li class="nav-item mx-2"><a class="nav-link" href="contact.html">Contact Us</a></li>
        </ul>
        <div class="d-flex align-items-center">
          <div class="rounded-circle text-white text-center" style="width: 35px; height: 35px; line-height: 35px; font-size: 18px; margin-right: 15px; background-color: #1204B5;">
            ${user.name[0].toUpperCase()}
          </div>
          <a class="btn logout-btn px-4 py-1" id="logout-btn" href="#" style="font-size: 90%; ">Logout</a>
        </div>
      `;
  
      // Handle Logout
      document.getElementById('logout-btn').addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = 'login.html';
      });
    }
  });


  //BOOK NOW
  
  document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("bookingForm");
    const bookNowBtn = document.getElementById("bookNowBtn");
    const bookingMessage = document.getElementById("bookingMessage");

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        // Check if the user is logged in
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            alert("You must be logged in to book a tour!");
            window.location.href = "login.html"; // Redirect to login page
            return;
        }

        const user = JSON.parse(loggedInUser);

        // Disable the button to prevent multiple clicks
        bookNowBtn.disabled = true;
        bookNowBtn.textContent = "Processing...";

        // Simulate booking confirmation
        setTimeout(() => {
            // Show success message
            bookingMessage.classList.remove("d-none");
            bookingMessage.textContent = `Booking Confirmed! Thank you, ${user.name}.`;

            // Reset the form
            bookingForm.reset();

            // Re-enable the button and reset its state after 3 seconds
            setTimeout(() => {
                bookNowBtn.disabled = false;
                bookNowBtn.textContent = "Book Now";
                bookingMessage.classList.add("d-none");
            }, 3000); // Reset after 3 seconds
        }, 2000); // Simulate a 2-second delay for processing
    });
});

// Curator - Insert Welcome Message
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (user && user.userType === "curator") {
      const curatorWelcome = document.getElementById("curatorWelcome");
      
      // Check if the element exists before trying to update it
      if (curatorWelcome) {
          curatorWelcome.innerHTML = `Welcome back, ${user.name}! Here's a summary of your dashboard.`;
      } else {
          console.error("Element with ID 'curatorWelcome' not found.");
      }
  }
});
