document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector(".customBtn"); // Search button
    const searchInput = document.getElementById("tourSearch"); // Search text input
    const locationFilter = document.getElementById("location"); // Location dropdown
    const priceFilter = document.getElementById("price"); // Price dropdown
    const categoryFilter = document.getElementsByName("category"); // Category radio buttons
    const experiencesContainer = document.querySelector(".tourGroup"); // Tour cards container

    // List of experience pages to search
    const experiencePages = ["experiences.html", "experiences-two.html", "experiences-three.html"];

    let allTourCards = []; // Store all tour cards from multiple pages

    // Function to fetch tour cards from each page
    async function loadAllTours() {
        allTourCards = []; // Reset before fetching

        for (const page of experiencePages) {
            try {
                const response = await fetch(page);
                const text = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, "text/html");
                const tours = [...doc.querySelectorAll(".col")]; // Extract tour cards
                
                allTourCards.push(...tours);
            } catch (error) {
                console.error(`Error loading ${page}:`, error);
            }
        }
    }

    // Function to get selected category from dropdown
    function getSelectedCategory() {
        const categoryDropdown = document.getElementById("category"); // Get the category dropdown
        return categoryDropdown.value || ""; // Return the selected value, or empty string if none selected
    }


    // Function to determine which filter is active
    function getActiveFilter() {
        let selectedLocation = locationFilter.value;
        let selectedCategory = getSelectedCategory();
        let selectedPrice = priceFilter.value;
        let searchText = searchInput.value.trim();

        if (searchText) return "search";
        if (selectedLocation) return "location";
        if (selectedCategory) return "category";
        if (selectedPrice) return "price";
        
        return null; // No filter selected
    }

    // Function to filter tour cards
    function filterTours() {
        let filterType = getActiveFilter();
        if (!filterType) {
            alert("Please select a search filter before searching!");
            return;
        }

        let searchText = searchInput.value.toLowerCase();
        let selectedLocation = locationFilter.value.toLowerCase();
        let selectedCategory = getSelectedCategory().toLowerCase();
        let selectedPrice = parseInt(priceFilter.value);

        // Clear current display
        experiencesContainer.innerHTML = "";

        let filteredCards = allTourCards.filter(card => {
            let title = card.querySelector(".card-title").textContent.toLowerCase();
            let location = card.querySelector(".perPerson").textContent.toLowerCase();
            let priceText = card.querySelector(".cardPrice").textContent.replace(/[^\d]/g, ""); // Extract numbers only
            let price = parseInt(priceText);

            // Only apply ONE active filter
            if (filterType === "search") return title.includes(searchText) || location.includes(searchText);
            if (filterType === "location") return location.includes(selectedLocation);
            if (filterType === "category") return title.includes(selectedCategory);
            if (filterType === "price") return !isNaN(selectedPrice) && price <= selectedPrice;
        });

        // Display filtered results
        if (filteredCards.length > 0) {
            filteredCards.forEach(card => experiencesContainer.appendChild(card));
        } else {
            experiencesContainer.innerHTML = "<p class='text-center mt-3'>No results found.</p>";
        }
    }

    // Load all tours before enabling search
    loadAllTours().then(() => {
        searchButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent form submission
            filterTours();
        });
    });
});
