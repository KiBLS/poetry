// Start of dark/light toogle button for second order sites
/* eslint-env es6 */
/* jshint esversion: 6 */
const btn = document.querySelector(".btn-toggle");
const styleLink = document.querySelector("#theme-link");
const currentTheme = localStorage.getItem("theme") || "dark";
const path = styleLink.getAttribute("href").split('/').slice(0, -1).join('/');

if (currentTheme === "dark") styleLink.href = `${path}/ru_kiblsstyle.css`;
else if (currentTheme === "light") styleLink.href = `${path}/ru_kiblsstylelight.css`;

btn.addEventListener("click", () => {
  if (styleLink.getAttribute("href") !== `${path}/ru_kiblsstyle.css`) {
    styleLink.href = `${path}/ru_kiblsstyle.css`;
    localStorage.setItem("theme", "dark");
  } else {
    styleLink.href = `${path}/ru_kiblsstylelight.css`;
    localStorage.setItem("theme", "light");
  }
});

// Start of back to the top button
// Get the button:
const mybutton = document.getElementById("myBtn");
// When the user scrolls down 20px from the top of the document, show the button
window.addEventListener("scroll", function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
});
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Open and close all detail tags
function selects() {
  var detailsList = document.getElementsByTagName("details");
  for (var i = 0; i < detailsList.length; i++) {
    detailsList[i].open = true;
  }
}
function deSelect() {
  var detailsList = document.getElementsByTagName("details");
  for (var i = 0; i < detailsList.length; i++) {
    detailsList[i].open = false;
  }
}

// Shows the hashtag with id in the browser url
// Get the favicon link element
var iconsLink = document.querySelector('link[rel="icon"]');
const iconsPath = iconsLink.getAttribute("href").split('/').slice(0, -1).join('/');

var summaries = document.querySelectorAll('summary');
summaries.forEach(function(summary) {
  // Click event listener for summary tag
  summary.addEventListener('click', function() {
    var id = summary.getAttribute('id');
    // Update the browser URL without reloading the page
    history.pushState(null, null, '#' + id);
    // Reload the favicon
    var favicon = document.querySelector('head link[rel="icon"]');
  });
  // Toggle event listener for details tag
  summary.parentNode.addEventListener('toggle', function() {
    if (!summary.parentNode.open) {
      // Remove the id from the URL when the details tag is closed
      history.pushState(null, null, window.location.href.split('#')[0]);
      // Reload the favicon
      var favicon = document.querySelector('head link[rel="icon"]');
    }
  });
});

// Check if URL of browser window has hash tag and jump to it
function autostate(target) {
  if (target.hasAttribute('open')) return;
  target.setAttribute('open', 'open');
  window.scrollBy(0, target.getBoundingClientRect().top);
}
window.onload = function() {
  if (location.hash) {
    const hash = location.hash.substr(1);
    const target = document.getElementById(hash);
    if (target) {
      const summary = target.parentNode.querySelector('summary');
      if (summary) {
        const details = getAncestor(summary, 'details');
        details.setAttribute('open', 'open');
      }
      autostate(target);
    }
  }
};
function getAncestor(el, tagName) {
  tagName = tagName.toLowerCase();
  while (el) {
    el = el.parentNode;
    if (el.tagName && el.tagName.toLowerCase() === tagName) {
      return el;
    }
  }
  return null;
}

// Creates summary and img border with random effect
const selectors = ['summary', 'img'];
const elements = document.querySelectorAll(selectors.join());
function setBorders(elements) {
  function randomRadius() {
    return Math.floor(Math.random() * 8) + 5;
  }
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (!element.closest('.fader')) {
      const borderRadius1 = randomRadius();
      const borderRadius2 = randomRadius();
      const borderRadius3 = randomRadius();
      const borderRadius4 = randomRadius();
      element.style.borderRadius = `${borderRadius1}px ${borderRadius2}px ${borderRadius3}px ${borderRadius4}px/${borderRadius2}px ${borderRadius3}px ${borderRadius4}px ${borderRadius1}px`;
    }
  }
}
setBorders(elements);

// put in the year in the footer
document.getElementById("currentyear").innerHTML = new Date().getFullYear();

// Sets the correct link into the breadcrumb menu
window.addEventListener("load", () => {
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
  const breadcrumb = document.querySelector('.breadcrumb');
  const list = breadcrumb.querySelector('ul');
  const previousPage = localStorage.getItem('previousPage');
  if (currentPage === 'thvote' || currentPage === 'gift' || currentPage === 'results') {
    localStorage.removeItem('previousPage');
    return;
  }
  if (previousPage) {
    const previousPageLink = list.querySelector(`a[href='${previousPage}.html']`);
    if (previousPageLink) {
      if (previousPage.startsWith('book')) {
        previousPageLink.innerHTML = previousPage.replace('book', 'E-book ');
      } else if (previousPage.startsWith('key_')) {
        previousPageLink.innerHTML = previousPage.replace('key_', 'Keyword ');
      } else if (previousPage.startsWith('en_')) {
        previousPageLink.innerHTML = previousPage.replace('en_', 'Poem ');
      }
    }
  }
  localStorage.setItem('previousPage', currentPage);
});

// Search field - remove placeholder when clicked
function clearPlaceholderOnFocus(input) {
    if (input) { // prüft, ob das input-Element vorhanden ist
        var originalPlaceholder = input.getAttribute('placeholder');
        input.addEventListener('focus', function() {
            input.removeAttribute('placeholder');
        });
        input.addEventListener('blur', function() {
            input.setAttribute('placeholder', originalPlaceholder);
        });
    }
}
var searchInput = document.getElementById('searchinput');
clearPlaceholderOnFocus(searchInput);
