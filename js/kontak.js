const formKontak = document.getElementById("formKontak");
const kotakPesan = document.getElementById("pesanResponForm");
const spinner = document.getElementById("spinnerKirim");
const teksTombol = document.getElementById("teksTombolKirim");

const inputNama = document.getElementById("inputNama");
const inputEmail = document.getElementById("inputEmail");
const inputSubjek = document.getElementById("inputSubjek");
const inputPesan = document.getElementById("inputPesan");

let resetOtomatis = false;

function tampilkanKotakPesan(jenis, teks) {
  kotakPesan.classList.remove("d-none", "pesan-sukses", "pesan-gagal");
  kotakPesan.classList.add(jenis === "sukses" ? "pesan-sukses" : "pesan-gagal");
  kotakPesan.textContent = teks;
}

function sembunyikanKotakPesan() {
  kotakPesan.classList.add("d-none");
  kotakPesan.textContent = "";
  kotakPesan.classList.remove("pesan-sukses", "pesan-gagal");
}

function ambilError(el) {
  return el.parentElement.querySelector(".teks-error");
}

function setError(el, tampil) {
  const error = ambilError(el);
  if (!error) return;
  if (tampil) error.classList.remove("d-none");
  else error.classList.add("d-none");
}

function bersihkanSemuaError() {
  [inputNama, inputEmail, inputSubjek, inputPesan].forEach((el) =>
    setError(el, false)
  );
}

function formatEmailBenar(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function mulaiLoading() {
  spinner.classList.remove("d-none");
  teksTombol.textContent = "Sending...";
}

function stopLoading() {
  spinner.classList.add("d-none");
  teksTombol.textContent = "Submit";
}

function cekValid() {
  let valid = true;
  bersihkanSemuaError();

  if (!inputNama.value.trim()) {
    setError(inputNama, true);
    valid = false;
  }
  if (!formatEmailBenar(inputEmail.value.trim())) {
    setError(inputEmail, true);
    valid = false;
  }
  if (!inputSubjek.value.trim()) {
    setError(inputSubjek, true);
    valid = false;
  }
  if (!inputPesan.value.trim()) {
    setError(inputPesan, true);
    valid = false;
  }

  return valid;
}

formKontak.addEventListener("reset", function () {
  if (resetOtomatis) {
    bersihkanSemuaError();
    stopLoading();
    return;
  }
  sembunyikanKotakPesan();
  bersihkanSemuaError();
  stopLoading();
});

formKontak.addEventListener("submit", async function (e) {
  e.preventDefault();

  sembunyikanKotakPesan();

  if (!cekValid()) {
    tampilkanKotakPesan(
      "gagal",
      "One or more fields have an error. Please check and try again."
    );
    return;
  }

  mulaiLoading();

  // simulasi kirim
  await new Promise((selesai) => setTimeout(selesai, 900));

  stopLoading();
  tampilkanKotakPesan(
    "sukses",
    "Thank you for your message. It has been sent."
  );

  resetOtomatis = true;
  formKontak.reset();
  resetOtomatis = false;
});
