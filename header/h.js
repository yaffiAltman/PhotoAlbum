

// let paper = {
//     // fontColor: 'black',
//     // backgroundColor:  'white'
// };
// sessionStorage.setItem('myPaper', JSON.stringify(paper));


//יצירת משתמש והכנסת שם משתמש לפי המשמש הנוכחי
const imgUser = document.createElement("img");
imgUser.src = '/header/person.svg';
imgUser.id='imgUser';
let Uname = document.createElement('a');
Uname.id='Uname';
let getUname = sessionStorage.getItem('currentUser');
if (getUname)
    Uname.innerHTML = JSON.parse(getUname).userName;
    const heder = document.querySelector('header');
    heder.append(Uname);
    heder.append(imgUser);

//heder responsivy הוספת המשתמש ל 
if(window.innerWidth<768){
    let person = document.createElement("div");
let hrespon = document.querySelector('#headerRespon');
person.prepend(Uname);
person.prepend(imgUser);
hrespon.prepend(person);
}

    





// sessionStorage.removeItem('currentUser');
// localStorage.removeItem('users');

//במערך פריטים ריק local storegאתחול ה 
if (!localStorage.getItem('usersArrDetails')) {
    const srcPicture = [];
    let stringSrcPicture = JSON.stringify(srcPicture);
    localStorage.setItem('usersArrDetails', stringSrcPicture);
}

//הגדרת הבורגר  שנפתח בלחיצה - ברספונסיבי
const burger = document.querySelector("#burger");
let respon = document.querySelector("#responsivy");
let flag = false;

burger.addEventListener("click", () => {
    if (flag) {
        respon.style = `display: none`;
        flag = false;
    }
    else {
        respon.style = `display: inline`;
        flag = true;
    }
    // respon.addEventListener("mouseout", () => {
    //     setTimeout(() => {
    //         respon.style = `display: none`;
    //     }, 3000);
    // });
    

});

//מציג בעת לחיצה על התמונות שלי את התמונות של המשתמש הנוכחי
let ifOpenMyPictures = false;
const myPicture = document.querySelector(".myPictures");//bottom
myPicture.onclick = (e) => {
    const w = document.querySelector("#myPictures");//div
    if (sessionStorage.getItem('currentUser')) {
        //usersarr - Localstoreg מערך המשתמשים מה 
        const ar = usersarr.filter((element) => element.userEmail === JSON.parse(sessionStorage.getItem('currentUser')).userEmail)[0].images;
        addToMyPicturesArr(ar);
    } else
        addToMyPicturesArr([]);
    if (ifOpenMyPictures === false) {
        w.style = 'display: flex';
        ifOpenMyPictures = true;
    }
    else {
        w.style = 'display: none';
        ifOpenMyPictures = false;
    }

};
