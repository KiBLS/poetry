// filter poems by hashtag/category on the main sites
const categorySelect = document.getElementById('category-select');
const detailsElements = document.querySelectorAll('details');

categorySelect.addEventListener('change', () => {
  const selectedValue = categorySelect.value;
  for (let details of detailsElements) {
    if (selectedValue === 'alle' || details.classList.contains(selectedValue)) {
      details.style.display = 'block';
    } else {
      details.style.display = 'none';
    }
  }
});
