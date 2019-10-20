var section = getElementsByClassName("collapsible")
var selection = getElementsByName("choice")

for (i=0;i<section.length;i++) {
  section[i].style.display = "none"
}

/*coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });*/
