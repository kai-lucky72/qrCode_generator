const quoteText = document.querySelector(".quote"),
quoteName = document.querySelector(".author .name"),
quoteBtn = document.querySelector("button");
soundBtn = document.querySelector(".sound"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter");

// random quote function
function randomQuote() {
   quoteBtn.classList.add("loading");
   quoteBtn.innerText = "Loading Quote...";
   const apiUrl = `https://quotes-api-self.vercel.app/quote`;
 // Include API key in the query parameters

   // Fetching random quote from the API and parsing it into a JavaScript object
   fetch(apiUrl)
   .then(res => res.json())
   .then(result => {
      quoteText.innerText = result.quote;
      quoteName.innerText = result.author;
      quoteBtn.innerText = "New Quote";
      quoteBtn.classList.remove("loading");
   })
   .catch(error => console.error('Error fetching quote:', error));  // Handle any errors
}
soundBtn.addEventListener("click", () => {
   // the SpeechSynthesisUtterance is a web api that allows us to speak the quote
   let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${quoteName.innerText}`);
   speechSynthesis.speak(utterance); // speak method of speechSynthesis speaks the utterance
});

copyBtn.addEventListener("click", () => {
   //copying the quote text to the clipboard
   // writeText() property of the specified text to the clipboard
   navigator.clipboard.writeText(quoteText.innerText);
   alert("Quote copied to clipboard");
});
twitterBtn.addEventListener("click", () => {
   let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
   window.open(tweetUrl, "_blank");//opening a new twitter tab with the quote text
});
quoteBtn.addEventListener("click", randomQuote);
