
//פתיחת חלונית הכניסה - אם אין עדיין משתמש
if (sessionStorage.getItem('currentUser'))
  clearTimeout(mod);
else
  mod = setTimeout(() => {
    modal.style.display = 'block';
  }, 2000);

let typesDiv = document.querySelector("#typePaper div");
//מערך סוגי הדפים
let typesArr = ['0', '4', '1', '3', '1t', '0'];
let index = 0;
let currentPaper;
let imagesd;
let child;
let images;

// const h1 = document.createElement("h1");
// h1.innerHTML = "My Pictures :)";

// let PicturesString = sessionStorage.getItem("srcPicture");
// let picturesarr = JSON.parse(PicturesString);
// let myPictures = document.querySelector("#myPictures");

//פעולה שמציגה בכל שלב  3 סוגי דפים אופציונלים
const showTypes = (index) => {

  typesDiv.innerHTML = '';
  for (let i = index; i < index + 3; i++) {

    newImg = document.createElement("img");
    if (typesArr[i] === '0') {
      newImg.style = 'opacity: 0;';
    } else
      newImg.src = `./images/typesPapers/${typesArr[i]}.png`;
    if (i === index + 1)
      currentPaper = newImg;
    typesDiv.append(newImg);
    let updateIndex = sessionStorage.getItem('myPaper');
    if (!(updateIndex === undefined || updateIndex === null)) {
      let update = JSON.parse(updateIndex);
      update.index = index;
      sessionStorage.setItem('myPaper', JSON.stringify(update));
    }
    else
      sessionStorage.setItem('myPaper', JSON.stringify({ 'index': index }));

  }
}
showTypes(index);

//בעת לחיצה על ההבא והקודם משתנה התצוגה
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");

next.onclick = (e) => {
  if (index < typesArr.length - 3)
    index++;
  showTypes(index);
  if (index === typesArr.length - 3) {
    next.style = 'opacity: 0;';
  }
  previous.style = 'opacity: 1;';
  currentPaper.onclick = changePaper();
}

previous.onclick = (e) => {
  if (!(index === 0))
    index--;
  showTypes(index);

  if (index === 0) {
    e.target.style = 'opacity: 0;';
  }
  next.style = 'opacity: 1;';

  currentPaper.onclick = changePaper();
}

//מציג את התמונה הנוכחית בתצוגה מקדימה
const changePaper = () => {
  location.hash = '#a';
  const a = document.querySelectorAll(".p");
  a.forEach(e => {
    e.style = 'display: none;';
  });
  const p = document.querySelector(`.paper${index + 1}`);
  if (index + 1 === 4)
    p.style = 'display: block';
  else if (index + 1 === 3)
    p.style = 'display: grid';
  else
    p.style = 'display: flex';
  child = document.querySelector(`.paper${index + 1} .img`);
  imagesd = document.querySelectorAll(`.paper${index + 1}`);
  // images = document.querySelectorAll(`.paper${index + 1} .img img`);
  images = document.querySelectorAll(`.p img`);
  changeFcolor();
  
  initImages();
  document.getElementById('captureButton').addEventListener('click', function () {
    html2canvas(document.getElementById(`paper${index + 1}`)).then(canvas => {
      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL('image/png');
      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'screenshot.png';
      link.click();
    });
  }, { once: true });
}

currentPaper.onclick = () => {
  const a = document.querySelector('.a');
  changePaper();

};


const responsivp = document.querySelector("#myPicturesResponsiv");


let ifOpenP = false;
responsivp.onclick = () => {

  if (ifOpenP === false) {
    w.style = 'display: flex';
    ifOpenP = true;
  }
  else {
    w.style = 'display: none';
    ifOpenP = false;
  }
}

//ברספונסיביות - כשהאתר נפתח במכשיר קטן יש כפתור שלחיצה עליו מציגה את האופציות לעיצוב
const responsivo = document.querySelector("#optionsResponsiv")
let ifOpenO = true;
responsivo.onclick = () => {
  const w = document.querySelector("#options");
  if (ifOpenO === false) {
    w.style = 'display: none';
    ifOpenO = true;
  }
  else {
    w.style = 'display: flex';
    location.hash = "#options";
    ifOpenO = false;
  }
}

const responsivc = document.querySelector("#capturerespon");
responsivc.onclick = () => {
  html2canvas(document.getElementById(`paper${index + 1}`)).then(canvas => {
    // Convert the canvas to a data URL
    const dataUrl = canvas.toDataURL('image/png');
    // Create a link element and trigger a download
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'screenshot.png';
    link.click();
  });
}

const w = document.querySelector("#myPictures");

//חלונית הבחירה נסגרת העת לחיצה על האיקס
const x = document.querySelector("#x");
const choose = document.querySelector("#choose");
x.onclick = () => {
  choose.style = 'display: none;';
}
let f = false;
const updatePaper = () => {
  if (sessionStorage.getItem('currentUser') && sessionStorage.getItem('myPaper')) {
    const a = sessionStorage.getItem('myPaper');
    const b = JSON.parse(a);
    const keys = Object.keys(b);
    keys.forEach(id => {
      if (id != 'index') {
        let picture = document.getElementById([id]);
        document.getElementById(`${id}`).style.opacity = '0';
        picture.parentElement.style = `background: url(${JSON.stringify(b[id])}) center / cover no-repeat`;
      }
    });
  }
}

//הפעולה מתבצעת בעת הצגת הדף הנבחר
//משנה את הרקע של התמונה הנבחרת לתמונה שהתקבלה ככתובת
function initImages() {
  if (sessionStorage.getItem('currentUser')) {
    for (let i = 0; i < images.length; i++) {
      
      updatePaper();
      const element = document.getElementById(i);
      if (element != null)
        element.onclick = (e) => {
          
          updatePaper();
          choose.style = 'display: block;';
          const myInput = document.getElementById("myInput");
          myInput.addEventListener("change", () => {
            const [file] = myInput.files;
            if (file) {
              // e.target.parentElement.style = `background: url(${URL.createObjectURL(file)}) center / cover no-repeat`;
              // e.target.style = `opacity: 0;`;

              //sessionStorage הכנסת כתובת התמונה ל 
              let k = e.target.id;
              const getpaper = JSON.parse(sessionStorage.getItem('myPaper'));
              getpaper[k] = URL.createObjectURL(file);
              sessionStorage.setItem('myPaper', JSON.stringify(getpaper));
              updatePaper();
              //localStorage עדכון התמונה במערך התמונות ב 
              let stringUsers = localStorage.getItem('usersArrDetails');
              const usersArr = JSON.parse(stringUsers);
              const arr = usersArr.filter((element) => element.userEmail === JSON.parse(sessionStorage.getItem('currentUser')).userEmail);
              if (arr) {
                arr[0].images.forEach(el => {
                  if (el === URL.createObjectURL(file)) {
                    f = true;
                  }
                });

                if (f === false)
                  arr[0].images.push(URL.createObjectURL(file));
              }
              f = false;
              stringUsers = JSON.stringify(usersArr);
              localStorage.setItem('usersArrDetails', stringUsers);
              addToMyPicturesArr(arr[0].images);
            }

            choose.style = 'display: none;';
          }, { once: true });

          const galeryBtn = document.querySelector("#galeryBtn")
          galeryBtn.onclick = () => {
            choose.style = 'display: none;';
            myPictures.style.display = 'flex';
            if (localStorage.getItem('usersArrDetails')) {
              // const abc = localStorage.getItem('usersArrDetails');
              // const ab = JSON.parse(abc);
              // let piarr = ab.filter((element) => element.userEmail === JSON.parse(sessionStorage.getItem('currentUser')).userEmail);
              const abc = document.querySelectorAll("#myPictures div:nth-child(even) img");
              abc.forEach(element => {
                element.onclick = () => {
                  //sessionStorage הכנסת כתובת התמונה ל 
                  let k = e.target.id;
                  const getpaper = JSON.parse(sessionStorage.getItem('myPaper'));
                  getpaper[k] = element.src;
                  sessionStorage.setItem('myPaper', JSON.stringify(getpaper));
                  updatePaper();
                }
              });
            }
          }
        }
    }
  }
  else
    modal.style.display = 'block';
}


window.onload = () => {
  updatePaper();
}
const backgroundColor = document.querySelectorAll("#backgroundColor input");

backgroundColor.forEach(element => {

  element.onchange = () => {
    if (index + 1 === 4)
      child.parentElement.style = `background: ${element.value}; display: block`;
    if (index + 1 === 3) {
      child.parentElement.style = `background: ${element.value}; display: grid;
    grid-template-columns: 53% 44%;
    grid-column-gap: 1%;`;
    }

    else {
      if (index + 1 === 1)
        child.parentElement.parentElement.style = `background: ${element.value};display: flex`;
      else
        child.parentElement.style = `background: ${element.value};display: flex`;
      if(index+1 === 4)
      child.parentElement.style = `background: none; display: block`;
      }

  }
});

//פונקציה שמשנה את צבע הפונט בעמוד בו יש כיתוב לפי הבחירה
const changeFcolor = () => {
  if ((index + 1) === 4) {
    const fontColor = document.querySelectorAll("#fontColor input");
    const fcolor = document.querySelector(`.paper4 input`);
    fontColor.forEach(element => {
      element.onchange = () => {
        fcolor.style = `color: ${element.value};border: none;`;
      }
    })
  }
}

const openP = document.querySelector("#open");
openP.onclick = (e) => {
  document.querySelector("#myPictures").style.display = 'flex';

};


document.querySelector("#options button").onclick = () => { location.href = `./sendAndPrint.html` };

