
//יצירת חלונית לתמונות שלי באופן 
const myPicturesWindow = document.createElement("div");
myPicturesWindow.id = "myPictures";
const h1 = document.createElement("h1");
h1.innerHTML = "My Pictures :)";
myPicturesWindow.append(h1);
const header = document.querySelector("header");

header.append(myPicturesWindow);

let UsersString = localStorage.getItem("usersArrDetails");
let usersarr = JSON.parse(UsersString);
let myPictures = document.querySelector("#myPictures");

//יצירת והצגת התמונות שלי
const addToMyPicturesArr = (srcpicArr) => {
    UsersString = localStorage.getItem("usersArrDetails");
    usersarr = JSON.parse(UsersString);
    myPictures = document.querySelector("#myPictures");
    myPictures.innerHTML = '';
    myPictures.append(h1);
    if (srcpicArr) {
        srcpicArr.forEach(element => {
            if (element) {
                const img = document.createElement("img");
                const trash = document.createElement("img");
                let divForI = document.createElement("div")
                divForI.class = "d";
                img.src = element;
                img.class = 'myImg';
                trash.src = '/header/trash3.svg';
                divForI.append(img);
                divForI.append(trash);
                myPictures.append(divForI);
                //מחיקת תמונה מהתמונות שלי
                trash.onclick = () => {
                    let getArr= localStorage.getItem('usersArrDetails');
                    let arr = JSON.parse(getArr);
                    
                    let  a = arr.filter((e)=> e.userEmail===JSON.parse(sessionStorage.getItem('currentUser')).userEmail);
                    let i= a[0].images.indexOf(img.src);
                    a[0].images.splice(i,1);
                    getArr = JSON.stringify(arr);
                    localStorage.setItem('usersArrDetails',getArr);
                    addToMyPicturesArr(a[0].images);
                }
            }
        });
    }
}

//בעת טעינת משתמש התמונות שלו נכנסות לחלונית התמונות שלי
if(sessionStorage.getItem('currentUser')){
    const get = usersarr.filter((element)=>element.userEmail === JSON.parse(sessionStorage.getItem('currentUser')).userEmail)[0];
if(get){
    const ar = get.images;
    addToMyPicturesArr(ar);
}
}else 
    addToMyPicturesArr([]);

//בעת לחיצה על חלונית התמונות שלי החלונית תסגר
window.onclick = function (event) {
    if (event.target === myPictures) {
        myPictures.style.display = "none";
    }
}

