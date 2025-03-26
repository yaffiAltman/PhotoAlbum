


let divImg = document.querySelector(".images");
if (sessionStorage.getItem('currentUser'))
    addToMyPicturesArr(usersarr.map((element) => element.userEmail === JSON.parse(sessionStorage.getItem('currentUser')).userEmail));
$.ajax({
    url: '/data/imagesDetails.json',
    success: (data) => {
        const { images } = data;
        createImages(images);
    }
})

let f = false;
const w = document.querySelector("#myPictures");
const selectTarget = document.querySelector("#sort");


const createImages = (images) => {
    if (selectTarget.value != '') {
        images = images.filter((img) => img.types.includes(selectTarget.value));
    }
    images.forEach(image => {
        let d = document.createElement("div");
        let newImg = document.createElement("img");
        newImg.class = 'newImg';
        let btn = document.createElement("button");
        btn.innerHTML = "הוסף";
        newImg.src = `./images/Pictures/${image.pictureNum}.JPG`;
        d.append(newImg);
        d.append(btn);
        divImg.append(d);
        // כאשר לוחצים על תמונה
        newImg.onclick = () => {
            if (!sessionStorage.getItem('currentUser')) {
                modal.style.display = 'block';
            }
            stringUsersArr = localStorage.getItem('usersArrDetails');
            let srcPic = JSON.parse(stringUsersArr);
            let arr;
            if (sessionStorage.getItem('currentUser')) {
                arr = srcPic.filter((e) => e.userEmail === JSON.parse(sessionStorage.getItem('currentUser')).userEmail);
                if (arr[0]) {
                    arr[0].images.forEach(element => {
                        if (element === newImg.src)
                            f = true;
                    });
                    if (f === false)
                        arr[0].images.push(newImg.src);
                    addToMyPicturesArr(arr[0].images);
                }

            }

            f = false;
            stringSrcPicture = JSON.stringify(srcPic);
            localStorage.setItem('usersArrDetails', stringSrcPicture);
            // if (location.href.includes('flag'))
            //     location.href = `/create album/create album.html?url=${newImg.src}`;
        }
    });

}
selectTarget.onchange = () => {
    divImg.innerHTML = '';
    $.ajax({
        url: '/data/imagesDetails.json',
        success: (data) => {
            const { images } = data;
            createImages(images);
        }
    })
}



// Get the modal
var modal = document.getElementById('id01');


const submitBtn = document.querySelector(".container button");

const inputsContainer = document.querySelector(".container");
let flg = true;

submitBtn.onclick = (e) => {
    flg = true;
    // e.preventDefault();
    console.log("im working");
    const currentUser = {
        userName: inputsContainer.children[1].value,
        userEmail: inputsContainer.children[3].value,
        images: []
    }
    if (localStorage.getItem('usersArrDetails')) {
        JSON.parse(localStorage.getItem('usersArrDetails')).forEach(element => {
            if (element.userEmail === currentUser.userEmail && element.userName !=currentUser.userName || element.userEmail != currentUser.userEmail && element.userName ===currentUser.userName) {
                alert("שם המשתמש או המייל אינם תקינים.");
                flg = false;
            }
        });
        if (flg) {
            let usersString = localStorage.getItem('usersArrDetails');
            let usersArr = JSON.parse(usersString);

            usersArr.map((element) => element.userName).forEach(element => {
                if (element === currentUser.userName)
                    flag = true;
            });
            if (!flag)
                usersArr.push(currentUser);
            console.log(usersArr);
            usersString = JSON.stringify(usersArr);
            localStorage.setItem('usersArrDetails', usersString);
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }
    else
        localStorage.setItem('usersArrDetails', JSON.stringify([currentUser]));

    modal.style.display = 'none';

};


// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }