

const body = document.querySelector('body');

const lblGregorianDate = document.getElementById('gregorian');
const lblMuscatDate = document.querySelector("#muscat #date");
const lblMuscatTime = document.querySelector("#muscat #time");
const lblTehranDate = document.querySelector("#tehran #date");
const lblTehranTime = document.querySelector("#tehran #time");
const lblPartOfDay = document.getElementById('part-of-day');


const getTehranTime = async (timezone = "Asia/Tehran") => {
  const response = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)

  const data = await response.json();
  const splittedDatetime = data.datetime.split('T');
  const tehranDate = splittedDatetime[0];
  const tehranTime = splittedDatetime[1].split('.')[0];
  return `${tehranDate} ${tehranTime}`;

}



const getDateTime = (locale = 'default', today = new Date()) => {

  // console.log(today.toLocaleDateString('fa-IR', { weekday: 'long' }));
  // return;
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

displayGregorianDate();
displayTehranTime();
displayMuscatTime();


setInterval(() => {
  displayGregorianDate();
  displayMuscatTime();
  displayTehranTime();
}, 30000);

function displayTehranTime() {
  getTehranTime().then(result => {
    // console.log(result); return;
    const freshTehranTime = getDateTime("fa-IR", new Date(result));
 

    /**
     *
     * Tehran Time
     */
    lblTehranTime.textContent = `
    ${(freshTehranTime.Hour < 10) ? '0' + freshTehranTime.Hour : freshTehranTime.Hour}:${(freshTehranTime.Minutes < 10) ? '0' + freshTehranTime.Minutes : freshTehranTime.Minutes}`;

    lblTehranDate.textContent = `
    ${freshTehranTime.weekDay},
    ${freshTehranTime.day}
    ${freshTehranTime.month}
    ${freshTehranTime.year} `;
  });
}

function displayGregorianDate() {
  const freshTime = getDateTime();
  lblGregorianDate.textContent = `
  ${freshTime.weekDay}, 
  ${freshTime.month} 
  ${freshTime.day}, 
  ${freshTime.year} `;

  lblMuscatTime.textContent = `
  ${(freshTime.Hour < 10) ? '0' + freshTime.Hour : freshTime.Hour}:${(freshTime.Minutes < 10) ? '0' + freshTime.Minutes : freshTime.Minutes}`;

  lblPartOfDay.textContent = `Good ${getPartOfDay(freshTime.Hour)}`;

  return freshTime;
}


function displayMuscatTime() {
  const muscatFreshTime = getDateTime('fa-IR', new Date());
  lblMuscatDate.textContent = `
  ${muscatFreshTime.weekDay},
  ${muscatFreshTime.day}
  ${muscatFreshTime.month}
  ${muscatFreshTime.year} `;
}