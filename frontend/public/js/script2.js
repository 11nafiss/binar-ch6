sizeButton = document.querySelectorAll(".size-button");
console.log(sizeButton);
for (const button of sizeButton) {
  button.onclick = function() {
    button.classList.toggle("active");
  }
}

let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
}};

sideButton = document.querySelectorAll(".side-list");
console.log(sideButton);
for (const button of sideButton) {
  button.onclick = function() {
    button.classList.toggle("active");
  }
}