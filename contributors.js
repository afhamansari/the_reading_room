document.addEventListener("DOMContentLoaded", () => {
    const contributorsContainer = document.getElementById("contributors");

    // Fetch contributors.json and load the data
    fetch("contributors.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch contributors data.");
            }
            return response.json();
        })
        .then((contributors) => {
            displayContributors(contributors);
        })
        .catch((error) => {
            console.error("Error loading contributors:", error);
            contributorsContainer.innerHTML = "<p>Failed to load contributors. Please try again later.</p>";
        });

    function displayContributors(contributors) {
        contributors.forEach((contributor) => {
            const contributorCard = document.createElement("div");
            contributorCard.classList.add("contributor");

            contributorCard.innerHTML = `
                <img src="${contributor.photo}" alt="Photo of ${contributor.name}">
                <h3>${contributor.name}</h3>
                <p><strong>Contact:</strong> ${contributor.contact}</p>
                <p><strong>Contributions:</strong> ${contributor.contributions}</p>
            `;

            contributorsContainer.appendChild(contributorCard);
        });
    }
});
