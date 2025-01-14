   
   //LOGIN PAGE
   

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

  

   // JavaScript for Dynamic Tour Updates on Details page
   
   document.addEventListener("DOMContentLoaded", function () {
    const queryParams = new URLSearchParams(window.location.search);
    const tourTitle = queryParams.get("title") || "Tour Title";
    const tourLocation = queryParams.get("location") || "Location";
    const tourPrice = queryParams.get("price") || "GH₵2,500";
    const tourImage = queryParams.get("image") || "assets/images/sample-tour.jpg";

    console.log("Title:", tourTitle);
    console.log("Location:", tourLocation);
    console.log("Price:", tourPrice);
    console.log("Image:", tourImage);

    document.getElementById("tourTitle").textContent = tourTitle;
    document.getElementById("tourLocation").innerHTML = `<i class="bi bi-geo-alt-fill me-2"></i>${tourLocation}`;
    document.getElementById("tourPrice").textContent = `${tourPrice} / per person`;
    document.getElementById("tourImage").src = tourImage;
  });
