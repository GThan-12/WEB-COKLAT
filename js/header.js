// Header menyusut pas scroll
const headerUtama = document.getElementById("headerUtama");

function aturHeader() {
  if (!headerUtama) return;

  if (window.scrollY > 20) headerUtama.classList.add("header-menyusut");
  else headerUtama.classList.remove("header-menyusut");
}

window.addEventListener("scroll", aturHeader);
aturHeader();
