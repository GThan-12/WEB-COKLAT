(function () {
  function initQuickViewModal() {
    const judul = document.getElementById("judulModalQuickView");
    const gambar = document.getElementById("gambarModalQuickView");
    const isi = document.getElementById("isiModalQuickView");
    const tautan = document.getElementById("tautanKeHalamanProduk");

    if (!judul || !gambar || !isi || !tautan) return;

    document.addEventListener("click", function (event) {
      const btn = event.target.closest(".tombol-quick-view");
      if (!btn) return;

      const idProduk = btn.getAttribute("data-id-produk");
      const data = (window.dataProdukSignature || {})[idProduk];
      if (!data) return;

      judul.textContent = data.namaProduk;
      gambar.src = data.urlGambarProduk;
      gambar.alt = data.namaProduk;
      isi.innerHTML = data.ringkasanHtml;
      tautan.href = data.urlHalamanProduk;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initQuickViewModal);
  } else {
    initQuickViewModal();
  }
})();
