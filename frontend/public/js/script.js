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
  }
}

const optionMenu = document.querySelector(".select-menu");
selectBtn = optionMenu.querySelector(".select-btn");
options = optionMenu.querySelectorAll(".option");
sBtn_text = optionMenu.querySelector(".sBtn_text");
inputSize = document.getElementById("size");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));
options.forEach(option => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option_text").innerText;
    sBtn_text.innerText = selectedOption;
    optionMenu.classList.remove("active");
    inputSize.value = selectedOption;
  });
});


uploadBtn = document.getElementById("image");
uploadText = document.querySelector(".uploadLabel");
uploadBtn.onchange = function() {
  uploadText.innerHTML = uploadBtn.files[0].name;
}

sideButton = document.querySelectorAll(".side-list");
console.log(sideButton);
for (const button of sideButton) {
  button.onclick = function() {
    button.classList.toggle("active");
  }
}
