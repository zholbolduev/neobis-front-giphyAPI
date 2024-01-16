const apikey = "23Ck0LaoqhgM4SLZuUkYeg38rS1V2tJI";

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const gifList = document.getElementById("gifList");

searchButton.addEventListener("click", perfomSearch);

function perfomSearch() {
  const searchQuery = searchInput.value.trim();

  if (searchQuery !== "") {
    fetchGifs(searchQuery);
  }
}

function fetchGifs(query) {
  const endpointUrl = "https://api.giphy.com/v1/gifs/search";
  const apiUrl = new URL(endpointUrl);

  apiUrl.searchParams.append("api_key", apikey);
  apiUrl.searchParams.append("q", query);

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.error}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Successful GIPHY API request:", data);
      displayGifs(data.data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
function displayGifs(gifs) {
  gifList.innerHTML = "";

  gifs.forEach((gif) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = gif.images.original.url;
    li.appendChild(img);
    gifList.appendChild(li);
  });
}
