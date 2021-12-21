

const body = document.querySelector('body');
// const pixabayLogo = document.querySelector('.pixabay-logo');
// const mainImg = document.querySelector('.main-image');
// const pixabayLink = document.querySelector('.pixabay-logo a');
const lblGregorianDate = document.getElementById('gregorian-date');
const lblPersianDate = document.getElementById('persian-date');
const lblTime = document.getElementById('time');
const lblPartOfDay = document.getElementById('part-of-day');

// const apiURL = new URL('https://pixabay.com/api?key=23746636-55ee33f792fb23acfe5b7eff5');

// const params = {
//   q: '',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   category: 'backgrounds',
//   min_width: 1080,
//   colors: "blue,green,red,yellow,orange,purple,pink,brown,grey,black",
//   editors_choice: true,
//   safesearch: true,
//   order: 'popular',
// }

// apiURL.search = new URLSearchParams(params).toString();

// fetch(apiURL, {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     "allow-control-allow-origin": "*",
//   }
// })
//   .then(response => {
// return response.json();

//   })
//   .then(data => {
//     if ( data.hits != null && data.hits.length > 0) {
     
//       const randomIndex = Math.floor(Math.random() * data.hits.length);
//       const randomImage = data.hits[randomIndex];
      
//       const imgUrl = randomImage.largeImageURL;
//       const imgPixabayURL = randomImage.pageURL;
  
//       body.style.backgroundImage = `url(${imgUrl})`;
//       mainImg.style.backgroundImage = `url(${imgUrl})`;
      
//       pixabayLink.href = imgPixabayURL;
//     }
//   })
//   .catch(error => console.log(error));

const getDateTime = (locale = 'default' ) => {
  const today = new Date();
  const weekDay = today.toLocaleDateString(locale, { weekday: 'long' });
  const month = today.toLocaleDateString(locale, { month: 'long' });
  const day = today.toLocaleDateString(locale, { day: 'numeric' });
  const year = today.toLocaleDateString(locale, { year: 'numeric' });

  const Hour = today.getHours();
  const Minutes = today.getMinutes();
  const Seconds = today.getSeconds();
  
  return {
    weekDay,
    month,
    day,
    year,
    Hour,
    Minutes,
    Seconds,
  };
}


const getPartOfDay = (hour) => {
  if (hour >= 6 && hour < 12) {
    return 'Morning';
  } else if (hour >= 12 && hour < 18) {
    return 'Afternoon';
  } else if (hour >= 18 && hour < 24) {
    return 'Evening';
  } else {
    return 'Night';
  }
}

setInterval(() => {
    
  lblGregorianDate.textContent = `
  ${getDateTime().weekDay}, 
  ${getDateTime().month} 
  ${getDateTime().day}, 
  ${getDateTime().year} `;
  
  lblTime.textContent = `${( getDateTime().Hour < 10 ) ? '0' + getDateTime().Hour:getDateTime().Hour }:${( getDateTime().Minutes < 10 ) ? '0' + getDateTime().Minutes:getDateTime().Minutes }:${( getDateTime().Seconds < 10 ) ? '0' + getDateTime().Seconds:getDateTime().Seconds }`;

  lblPersianDate.textContent = `
  ${getDateTime('fa-IR').weekDay},
  ${getDateTime('fa-IR').day}
  ${getDateTime('fa-IR').month}
  ${getDateTime('fa-IR').year} `;


  lblPartOfDay.textContent = `Good ${getPartOfDay(getDateTime().Hour)}`;

}, 1000);
