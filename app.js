const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");

const apiKey = "aOPEVDN1LEC0L2OuU1uuKQ==DMVC9kkfbj7KiGP8";
const urlKey = "https://api.api-ninjas.com/v1/dadjokes?limit=1";

const opsition = {
  method: "GET",
  headers: {
    "x-api-Key": apiKey,
  },
};

function jokeUp() {
  jokeEl.classList.add("updating");
  btnEl.classList.add("loading");
  btnEl.textContent = "Loading...";

  const xhr = new XMLHttpRequest();
  xhr.open(opsition.method, urlKey);
  xhr.setRequestHeader("x-api-Key", apiKey);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      jokeEl.textContent = data[0].joke;
      btnEl.textContent = "TELL ME A JOKE";
    } else {
      jokeEl.textContent = "İnternet Bağlantısı Yok";
      btnEl.textContent = "TELL ME A JOKE";
      btnEl.disabled = true;
    }
    jokeEl.classList.remove("updating");
    btnEl.classList.remove("loading");
  };
  xhr.onerror = function () {
    jokeEl.textContent = "İnternet Bağlantısı Yok";
    btnEl.textContent = "TELL ME A JOKE";
    btnEl.disabled = true;
    jokeEl.classList.remove("updating");
    btnEl.classList.remove("loading");
  };
  xhr.send();
}

function checkInternetConnection() {
  if (!navigator.onLine) {
    jokeEl.textContent = "İnternet Bağlantısı Yok";
    btnEl.textContent = "TELL ME A JOKE";
    btnEl.disabled = true;
  }
}

btnEl.addEventListener("click", jokeUp);
window.addEventListener("online", checkInternetConnection);
window.addEventListener("offline", checkInternetConnection);

checkInternetConnection();
