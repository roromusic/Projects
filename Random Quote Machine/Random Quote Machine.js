//quotes
var quotes = ["Life is about making an impact, not making an income.", 
              "Whatever the mind of man can conceive and believe, it can achieve.", 
              "Strive not to be a success, but rather to be of value.", 
              "Im-a-Wario! Ima gonna win!",
              "Thank you Mario! But our princess is in another castle!",
              "You have died of dysentery",
              "I am the great mighty poo, and Im going to throw my shit at you.",
              "Finish Him!!", 
              "Sonic Boom!", 
              "Hadouken!",
              "Show me your moves!",
              "Do a barrel roll!"
             ];

var authors = ["- Kevin Kruse", "- Napoleon Hill", "- Albert Einstein", "- Mario Kart 64",
              "- Super Mario Bros.", "- Oregon Trail", "- Conkers Bad Fur Day", "- Mortal Kombat",
              "- Street Fighter II", "- Street Fighter II", "-Super Smash Bros.", "- Star Fox"
              
             ];

//random background color generator
function changeColor() {
  var color = '#' + Math.floor(Math.random()*14540032).toString(16);
  document.getElementById("niceBod").style.background = color;
  document.getElementById("quote").style.color = color;
  document.getElementById("source").style.color = color;
  document.getElementById("newQuote").style.background = color;
  document.getElementById("twitter").style.background = color;
};

window.onload = newQuote();

function newQuote() {
  var quoteNumber = Math.ceil(quotes.length * Math.random()) - 1;
  var quote = "<i class=\"fa fa-quote-left\" aria-hidden=\"true\"></i> " + quotes[quoteNumber] + " <i class=\"fa fa-quote-right\" aria-hidden=\"true\"></i>";
  var author = authors[quoteNumber];
  document.getElementById("quote").innerHTML = quote;
  document.getElementById("source").innerHTML = author;
  
  changeColor();
  
  var uri = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=\"" + quotes[quoteNumber] + "\" " + author;
  document.getElementById("twitter").setAttribute("href", uri);
  
  document.getElementById("quote").style.opacity = 1;
  document.getElementById("source").style.opacity = 1;
};

document.getElementById("newQuote").onclick = function() {
  document.getElementById("quote").style.opacity = 0;
  document.getElementById("source").style.opacity = 0;
  setTimeout(function(){ newQuote(); }, 1000);
  
}
