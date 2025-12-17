(function () {
  function initReviewForm() {
    const form = document.getElementById("formUlasanProduk");
    const pesan = document.getElementById("pesanResponUlasan");
    if (!form || !pesan) return;

    const inputUlasan = document.getElementById("inputUlasanTeks");
    const inputNama = document.getElementById("inputNamaPengulas");
    const inputEmail = document.getElementById("inputEmailPengulas");

    const errRating = document.getElementById("errorRating");
    const errUlasan = document.getElementById("errorUlasan");
    const errNama = document.getElementById("errorNama");
    const errEmail = document.getElementById("errorEmail");

    const spinner = document.getElementById("spinnerKirimUlasan");

    function showMessage(type, text) {
      pesan.classList.add("tampil");
      pesan.classList.remove("pesan-ulasan-sukses", "pesan-ulasan-gagal");
      pesan.classList.add(
        type === "sukses" ? "pesan-ulasan-sukses" : "pesan-ulasan-gagal"
      );
      pesan.textContent = text;
    }

    function hideMessage() {
      pesan.classList.remove(
        "tampil",
        "pesan-ulasan-sukses",
        "pesan-ulasan-gagal"
      );
      pesan.textContent = "";
    }

    function toggleError(el, on) {
      if (!el) return;
      el.classList.toggle("tampil", !!on);
    }

    function emailValid(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    function getRating() {
      const radio = form.querySelector('input[name="ratingBintang"]:checked');
      return radio ? radio.value : "";
    }

    function setLoading(on) {
      if (!spinner) return;
      spinner.classList.toggle("d-none", !on);
    }

    function clearErrors() {
      toggleError(errRating, false);
      toggleError(errUlasan, false);
      toggleError(errNama, false);
      toggleError(errEmail, false);
    }

    function clearFieldsTanpaResetEvent() {
      // Clear text fields
      if (inputUlasan) inputUlasan.value = "";
      if (inputNama) inputNama.value = "";
      if (inputEmail) inputEmail.value = "";

      // Uncheck rating
      const checked = form.querySelector('input[name="ratingBintang"]:checked');
      if (checked) checked.checked = false;
    }

    function validate() {
      let ok = true;

      const rating = getRating();
      toggleError(errRating, !rating);
      if (!rating) ok = false;

      const ulasan = (inputUlasan?.value || "").trim();
      toggleError(errUlasan, !ulasan);
      if (!ulasan) ok = false;

      const nama = (inputNama?.value || "").trim();
      toggleError(errNama, !nama);
      if (!nama) ok = false;

      const email = (inputEmail?.value || "").trim();
      const emailOk = emailValid(email);
      toggleError(errEmail, !emailOk);
      if (!emailOk) ok = false;

      return ok;
    }

    // Reset button (native) tetap berfungsi: bersihin pesan + error
    form.addEventListener("reset", function () {
      hideMessage();
      clearErrors();
      setLoading(false);
    });

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      hideMessage();

      const ok = validate();
      if (!ok) {
        showMessage(
          "gagal",
          "One or more fields have an error. Please check and try again."
        );
        return;
      }

      setLoading(true);
      await new Promise((done) => setTimeout(done, 900));
      setLoading(false);

      // Penting: jangan panggil form.reset() setelah sukses,
      // karena event reset akan menghapus pesan sukses.
      showMessage("sukses", "Thank you for your review. It has been sent.");
      clearFieldsTanpaResetEvent();
      clearErrors();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReviewForm);
  } else {
    initReviewForm();
  }
})();
