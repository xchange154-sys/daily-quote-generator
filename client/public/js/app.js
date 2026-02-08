let currentQuote = null;

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteButton = document.getElementById("new-quote-btn");
const loadingText = document.getElementById("loading-message");

const QUOTABLE_API = "https://api.api-ninjas.com/v1/quotes";

async function fetchNewQuote() {
    const response = await fetch(QUOTABLE_API, {
        headers: {"X-Api-Key": "kWzmxL5YAxdALy2geS5tJNmr0ZkaA518p0TH8XSC"}
    });
    
    if (!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`);
    }

    const quoteData = await response.json();

    return quoteData;
}

function updateQuoteDisplay(quoteData) {
    quoteText.textContent = quoteData[0].quote;
    quoteAuthor.textContent = `- ${quoteData[0].author}`
}

function setLoadingState(isLoading) {
if (isLoading) {
    newQuoteButton.disabled = true;
    quoteText.style.display = "none";
    quoteAuthor.style.display = "none";
    loadingText.style.display = "block";
} else {
    newQuoteButton.disabled = false;
    quoteText.style.display = "block";
    quoteAuthor.style.display = "block";
    loadingText.style.display = "none";
}
}

async function handleNewQuoteClick() {
    setLoadingState(true);
    
    try {
        const quoteData = await fetchNewQuote();
        currentQuote = quoteData;
        updateQuoteDisplay(quoteData);
    } catch (error) {
        console.error('Failed to fetch quote:', error);
        quoteText.textContent = "Oops! Couldn't load a quote. Please try again.";
        quoteText.style.display = 'block';
        quoteAuthor.style.display = 'block';
    } finally {
        setLoadingState(false);
    }
}

function init() {
newQuoteButton.addEventListener("click", handleNewQuoteClick);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}