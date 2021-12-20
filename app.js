const apiURL = 'https://pixabay.com/api?key=23746636-55ee33f792fb23acfe5b7eff5'
const params = {
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  category: 'backgrounds',
  min_width: 1920,
  colors:"blue,green,red,yellow,orange,purple,pink,brown,grey,black,white",
  editors_choice: true,
  safesearch: true,
  order: 'popular',
}

apiURL.search = new URLSearchParams(params).toString();

// fetch images and save them in localstorage
if ( localStorage.getItem('kia-theme-pixabay-hits') === null ) {
fetch(apiURL)
  .then(response => { 
    return response.json();
    }).then(data => {
        console.log(data.hits);
        localStorage.setItem('kia-theme-pixabay-hits', JSON.stringify(data.hits));
    }).catch(error => {
        console.log(error);
    });
  }

// get body element 
const body = document.querySelector('body');

// get hits from localstorage
const hits = JSON.parse(localStorage.getItem('kia-theme-pixabay-hits'));

// set body background image to random image from hits.webformatURL
let imgUrl = hits[Math.floor(Math.random() * hits.length)].webformatURL;
body.style.backgroundImage = `url()`;
body.textContent += imgUrl;