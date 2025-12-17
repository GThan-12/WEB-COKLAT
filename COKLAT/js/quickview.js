// Quick View untuk 3 produk signature (landing page)
// Menggunakan data bersama (window.dataProdukSignature) kalau tersedia,
// supaya link & isi modal konsisten dengan halaman produk.

function ambilDataProdukSignature(kode) {
  const shared = (window.dataProdukSignature || {})[kode];
  if (shared) {
    return {
      nama: shared.namaProduk,
      harga: shared.hargaProduk,
      gambar: shared.urlGambarProduk,
      link: shared.urlHalamanProduk,
      ringkasanHtml: shared.ringkasanHtml,
    };
  }

  // Fallback lokal (kalau data shared belum dimuat)
  const fallback = {
    original: {
      nama: "Original Chocolate",
      harga: "IDR 12,000",
      gambar:
        "images/Gemini_Generated_Image_9ftlek9ftlek9ftl.png",
      link: "produk-original.html",
      ringkasanHtml: `
        <div style="font-size:.8rem; letter-spacing:.14em; text-transform:uppercase; color:#888;">Signature Menu</div>
        <h4 style="margin:8px 0 6px; font-weight:800;">Original Chocolate</h4>
        <div style="color:#777; margin-bottom:14px;">IDR 12,000</div>
        <p style="margin:0;">Classic chocolate drink with a smooth, comforting taste. Perfect for everyday mood booster.</p>
      `,
    },
    oreo: {
      nama: "Oreo Chocolate",
      harga: "IDR 15,000",
      gambar:
        "images/Gemini_Generated_Image_3cjk7f3cjk7f3cjk.png",
      link: "produk-oreo.html",
      ringkasanHtml: `
        <div style="font-size:.8rem; letter-spacing:.14em; text-transform:uppercase; color:#888;">Signature Menu</div>
        <h4 style="margin:8px 0 6px; font-weight:800;">Oreo Chocolate</h4>
        <div style="color:#777; margin-bottom:14px;">IDR 15,000</div>
        <p style="margin:0;">Rich chocolate blended with Oreo flavour for a fun, crunchy twist.</p>
      `,
    },
    cheese: {
      nama: "Cheese Chocolate",
      harga: "IDR 15,000",
      gambar:
        "images/Gemini_Generated_Image_g9td01g9td01g9td.png",
      link: "produk-cheese.html",
      ringkasanHtml: `
        <div style="font-size:.8rem; letter-spacing:.14em; text-transform:uppercase; color:#888;">Signature Menu</div>
        <h4 style="margin:8px 0 6px; font-weight:800;">Cheese Chocolate</h4>
        <div style="color:#777; margin-bottom:14px;">IDR 15,000</div>
        <p style="margin:0;">Creamy chocolate topped with a cheesy note—sweet and savory in one cup.</p>
      `,
    },
  };

  return fallback[kode] || null;
}

// Elemen modal (landing page)
const judulQuickView = document.getElementById("judulQuickView");
const gambarQuickView = document.getElementById("gambarQuickView");
const isiQuickView = document.getElementById("isiQuickView");
const linkProduk = document.getElementById("linkProduk");

// Klik tombol quickview
document.addEventListener("click", function (e) {
  const tombol = e.target.closest(".tombol-quickview");
  if (!tombol) return;

  const kode = tombol.getAttribute("data-produk");
  const data = ambilDataProdukSignature(kode);
  if (!data) return;

  if (judulQuickView) judulQuickView.textContent = data.nama;

  if (gambarQuickView) {
    gambarQuickView.src = data.gambar;
    gambarQuickView.alt = data.nama;
  }

  if (isiQuickView) {
    isiQuickView.innerHTML = data.ringkasanHtml;
  }

  if (linkProduk) {
    linkProduk.href = data.link;
  }
});
