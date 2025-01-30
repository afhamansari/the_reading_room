function displayBookDetails(book) {
    // Create a new subpage dynamically
    const bookDetailsPage = document.createElement('div');
    bookDetailsPage.classList.add('book-details');
    const availabilityClass = book.availability.toLowerCase().replace(/\s+/g, '-');  // Ensure class is in lowercase and replace spaces with dashes
    
    // Updated HTML structure with a synopsis and a dynamic button based on availability status
    bookDetailsPage.innerHTML = `
        <button id="back-button">Back</button>
        <img src="${book.image}" alt="${book.title}">
        <h1>${book.title}</h1>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Availability:</strong> <span class="${availabilityClass}">${book.availability}</span></p>
        <p><strong>Page Length:</strong> ${book.pageLength} pages</p>
        <p><strong>Description:</strong> ${book.description}</p>
        <p><strong>Synopsis:</strong> ${book.synopsis}</p> <!-- Added synopsis -->
        <h2>Reviews</h2>
        <ul class="reviews-list">
            ${book.reviews.map(review => `<li>"${review}"</li>`).join('')}
        </ul>

        <!-- Button based on availability status -->
        <button id="availability-button" class="${availabilityClass}">
            ${book.availability === 'Available' ? 'Get' : 'Unavailable'}
        </button>
    `;

    // Replace the current content with the book details
    document.body.innerHTML = '';
    document.body.appendChild(bookDetailsPage);

    // Add functionality to the back button
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', () => location.reload()); // Reload to go back

    // Add functionality to the button (for now, it's a placeholder)
    const availabilityButton = document.getElementById('availability-button');
    if (availabilityButton) {
        availabilityButton.addEventListener('click', () => {
            console.log('Get button clicked');
            // Save the book info and navigate to a form submission page
            localStorage.setItem('bookRequested', JSON.stringify(book));  // Save the book details in localStorage
            window.location.href = "book-request-form.html";  // Redirect to the new page
        });
    } else {
        console.error('Get button not found');
    }
}
