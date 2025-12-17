(function () {
  function initThumbnailSwitcher() {
    const gambarUtama = document.getElementById("gambarProdukUtama");
    const wadahThumbnail = document.getElementById("wadahThumbnailProduk");
    if (!gambarUtama || !wadahThumbnail) return;

    wadahThumbnail.addEventListener("click", function (event) {
      const thumb = event.target.closest(".thumbnail-produk");
      if (!thumb) return;

      const urlBaru = thumb.getAttribute("data-url-gambar");
      if (!urlBaru) return;

      gambarUtama.src = urlBaru;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThumbnailSwitcher);
  } else {
    initThumbnailSwitcher();
  }
})();
