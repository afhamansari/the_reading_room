document.addEventListener("DOMContentLoaded", function () {
    const booksList = document.getElementById('books-list');
    const genreFilter = document.getElementById('genre-filter');

    // Fetch the books data from a JSON file
    fetch('books.json')
        .then(response => response.json())
        .then(books => {
            // Extract genres from the books data and populate the filter dropdown
            const genres = new Set();
            books.forEach(book => genres.add(book.genre));

            // Populate the genre filter dropdown
            genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre;
                option.textContent = genre;
                genreFilter.appendChild(option);
            });

            // Display all books initially
            displayBooks(books);

            // Add event listener for genre filter dropdown
            genreFilter.addEventListener('change', function () {
                const selectedGenre = this.value;
                const filteredBooks = selectedGenre === 'all' ? books : books.filter(book => book.genre === selectedGenre);
                displayBooks(filteredBooks);
            });
        })
        .catch(error => {
            console.error("Error loading the books JSON:", error);
        });

    function displayBooks(books) {
        booksList.innerHTML = ''; // Clear current books

        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            const availabilityClass = book.availability.toLowerCase().replace(/\s+/g, '-');  // Ensure class is in lowercase and replace spaces with dashes
            bookElement.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>by ${book.author}</p>
                <p class="availability ${availabilityClass}">${book.availability}</p>
            `;

            // Add click event listener to each book tile
            bookElement.addEventListener('click', () => {
                displayBookDetails(book);
            });

            booksList.appendChild(bookElement);
        });
    }

    function displayBookDetails(book) {
        // Create a new subpage dynamically
        const bookDetailsPage = document.createElement('div');
        bookDetailsPage.classList.add('book-details');
        const availabilityClass = book.availability.toLowerCase().replace(/\s+/g, '-');  // Ensure class is in lowercase and replace spaces with dashes
        bookDetailsPage.innerHTML = `
            <button id="back-button">Back</button>
            <img src="${book.image}" alt="${book.title}">
            <h1>${book.title}</h1>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Availability:</strong> <span class="${availabilityClass}">${book.availability}</span></p>
            <p><strong>Page Length:</strong> ${book.pageLength} pages</p>
            <p><strong>Description:</strong> ${book.description}</p>
            <h2>Reviews</h2>
            <ul class="reviews-list">
                ${book.reviews.map(review => `<li>"${review}"</li>`).join('')}
            </ul>
        `;

        // Replace the current content with the book details
        document.body.innerHTML = '';
        document.body.appendChild(bookDetailsPage);

        // Add functionality to the back button
        const backButton = document.getElementById('back-button');
        backButton.addEventListener('click', () => location.reload()); // Reload to go back
    }
});
