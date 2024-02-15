const apikey = "23Ck0LaoqhgM4SLZuUkYeg38rS1V2tJI";

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const gifList = document.getElementById("gifList");

searchButton.addEventListener("click", perfomSearch);

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    perfomSearch();
  }
});

function perfomSearch() {
  const searchQuery = searchInput.value.trim();

  if (searchQuery !== "") {
    fetchGifts(searchQuery);
  }
}

function fetchGifts(query) {
  const endpointURL = "https://api.giphy.com/v1/gifs/search";
  const apiurl = new URL(endpointURL);

  apiurl.searchParams.append("api_key", apikey);
  apiurl.searchParams.append("q", query);

  fetch(apiurl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.error}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayGifs(data.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayGifs(gifs) {
  gifList.innerHTML = "";

  const li = document.createElement("li");
  const img = document.createElement("img");

  gifs.forEach((gif) => {
    const li = document.createElement("li");
    const img = document.createElement("img");

    img.src = gif.images.original.url;

    li.appendChild(img);
    gifList.appendChild(li);
  });
}
