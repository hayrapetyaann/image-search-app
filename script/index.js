const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form"); 
const searchInputEl = document.getElementById("inputSearch"); 
const searchResultsEl = document.querySelector(".search_results");
const searchButton = document.querySelector("#searchButton");

let inputData = "";
let page = 1;

async function searchImages() {
  try{
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (page === 1) {
      searchResultsEl.innerHTML = "";
    }
  
    const results = data.results;
      
      results.forEach((result) => {
  
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("search-result");
        const img = document.createElement("img");
        img.src = result.urls.small;
        img.alt = result.alt_description;
        const imgLink = document.createElement("a");
        imgLink.href = result.links.html;
        imgLink.target = "_blank";
        imgLink.textContent = result.alt_description;
    
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(imgLink);
        searchResultsEl.appendChild(imgWrapper);
  
      });
      
      
      page++;
  } catch(err){
      console.error(err)
  }
  
  }



  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages(); 
  });
  

function handleScroll() {
    const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

    const scrollPosition = window.pageYOffset 
     document.documentElement.scrollTop  
     document.body.scrollTop;
    
    const scrollPositionPercentage = (scrollPosition / totalScrollableHeight) * 100;

    if(scrollPositionPercentage > 71.4){
        searchImages();
    }

}

window.onscroll = handleScroll;
