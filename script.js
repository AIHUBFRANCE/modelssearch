// script.js
async function search() {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = ''; // Nettoyer les résultats précédents
    const input = document.getElementById('searchBox').value;
    if (input === '') {
        displayError("Comment faire une recherche si rien n'est demandé ?"); // Veuillez entrer une requête de recherche
        return;
    }
    if (input.length < 3) {
        displayError('Tu as déjà vu un nom avec moins de 3 lettres ? Mets en plus !'); // Veuillez entrer au moins 3 caractères
        return;
    }
    const apiKey = 'd13b8b0e-c27a-4bf8-a4bc-e2cd9cdbbd1a'; // Remplacez ceci par votre clé API
    const apiUrl = `https://api.applio.org/key=${apiKey}/models/search?name=${encodeURIComponent(input)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // Gestion des erreurs HTTP
        }
        const data = await response.json();
        if (data.length === 0) {
            displayError('No model found for your query.'); // Aucun modèle trouvé
            return;
        }
        displayResults(data); // Afficher les résultats
    } catch (error) {
        displayError(`Fetch error: ${error.message}`); // Afficher les erreurs de réseau ou autres
    }
}

function displayResults(data) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = ''; // Nettoyer les résultats précédents
    container.innerHTML = '<p  class="info-box">Vous pouvez télécharger les modèles en cliquant sur le bouton de "Télécharger" ou copier en faisant un clic droit sur le lien et en cliquant sur "Copier l\'adresse du Lien".</p>';
    data.forEach(item => {
        const itemHTML = `
            <div class="result-item">
                <div>
                    <h4 title="${item.name}">${item.name}</h4>
                    <p class="epochs-info">Epochs: ${item.epochs}</p>
                </div>
                <p><a href="${item.link}" class="download-btn">Télécharger</a></p>
            </div>
        `;
        container.innerHTML += itemHTML;
    });
}

function displayError(message) {
    const container = document.getElementById('resultsContainer');
    if (message === 'Fetch error: HTTP error! Status: 404') {
        const itemHTML = `
            <div class="result-item">
                <h4>Je crois que c'est pas ici :(</h4>
                <p><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="download-btn">Télécharger</a></p>
            </div>
        `;
        container.innerHTML += itemHTML;
    } else {
        container.innerHTML = `<h3>${message}</h3>`;
    }
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const mode = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', mode); // Save theme preference
}

// Check for saved user preferences
window.onload = function() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

document.getElementById('toggleMode').addEventListener('click', toggleDarkMode);
