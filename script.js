document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://fakestoreapi.com/products';
    const tableBody = document.getElementById('tableBody');
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close-btn');

    // Fetch products from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            renderTable(products);
        })
        .catch(error => console.error('Error fetching products:', error));

    // Render the table rows dynamically
    function renderTable(products) {
        products.forEach(product => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.category}</td>
                <td><img src="${product.image}" alt="${product.title}" class="thumb-img"></td>
            `;

            // Add click event to open the modal
            row.addEventListener('click', () => {
                openModal(product);
            });

            tableBody.appendChild(row);
        });
    }

    // Populate and display the modal
    function openModal(product) {
        document.getElementById('modalTitle').textContent = product.title;
        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalPrice').textContent = product.price.toFixed(2);
        document.getElementById('modalCategory').textContent = product.category;
        document.getElementById('modalRating').textContent = product.rating.rate;
        document.getElementById('modalCount').textContent = product.rating.count;
        document.getElementById('modalDescription').textContent = product.description;

        modal.style.display = 'block';
    }

    // Close the modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});