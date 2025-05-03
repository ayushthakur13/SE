async function fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        document.getElementById('quoteText').textContent = `"${data.content}"`;
        document.getElementById('quoteAuthor').textContent = `— ${data.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        document.getElementById('quoteText').textContent = "Stay motivated and keep pushing forward!";
        document.getElementById('quoteAuthor').textContent = "";
    }
}

// Fetch quote on page load
fetchQuote();
