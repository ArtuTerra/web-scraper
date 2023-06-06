const display = document.getElementsByClassName("content")[0];

fetch("http://127.0.0.1:8000")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    for (let i = 0; i < 20; i++) {
      var article = `<a class="link" href=" ${data[i].url} "> ${data[i].title} <br>`;
      display.insertAdjacentHTML("beforeend", article);
    }
  })
  .catch((err) => console.log(err));
