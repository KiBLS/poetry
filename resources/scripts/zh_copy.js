// copy link to the specific poem to clipboard (newversion-zh)
// Keep track of the time of the last click
var lastClickTime = 0;
var oldvalue;
function copyDivToClipboard(element) {
  var currentTime = new Date().getTime();
  var timeInterval = 1000;  // 1 second
  if (currentTime - lastClickTime < timeInterval) {
    // Ignore this click
    return;
  }
  lastClickTime = currentTime;
  var range = document.createRange();
  oldvalue = element.innerHTML;
  range.selectNode(element);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  // Get the poem text
  var poemText = element.innerHTML.trim();
  poemText = poemText.replace(/&nbsp;/g, '');
  if (element.classList.contains("copypoem")) {
    var license = "许可证： CC BY-SA";
    poemText += license;
  }
  
  // Add the license at the end if the element has the class "copypoem"
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = poemText;
  document.body.appendChild(tempDiv);
  range.selectNode(tempDiv);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  document.body.removeChild(tempDiv);
  if (element.classList.contains("copypoem")) {
    element.innerHTML = "诗歌已成功复制！<br><br><span class='wrapper'><span class='triangleleft'></span><span class='circle'></span><span class='triangleright'></span></span>";
  } else {
    element.innerHTML = "链接已被成功复制!";
  }
  setTimeout(function(){element.innerHTML = oldvalue; }, 1650);
  setTimeout(function(){lastClickTime = 0;}, timeInterval);
}
function addClickListener(element) {
  element.addEventListener('click', function() {
    copyDivToClipboard(element);
  });
}
var sections = document.querySelectorAll('article.copypoem, div.plink');
for (var i = 0; i < sections.length; i++) {
  addClickListener(sections[i]);
}
