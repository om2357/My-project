const favoriteButton = document.querySelector('.favouriteibutton');//Favorite Button
const searchMeal = document.querySelector('.search input');//Search box value
const mealDetails = document.querySelector('.mealdetail');//Meal details window
const mealBox = document.querySelector('.mealbox');//MealList Container 
const favoriteBox = document.querySelector('.favoutieitembox');//Favorite list container
const logo = document.querySelector('.logo');//Select Page Header-Logo
const popup = document.querySelector('.alert');
// OnClick-Event

//When You click on logo reset homepage.
logo.onclick = () => {
    mealBox.innerHTML = "";
    searchMeal.value = "";
}
// When click on Favourite icon Show favourite list
favoriteButton.onclick = () => {
    if (favoriteBox.innerText == "") {
        alert("Opps your list is Empty")
    }
    else if (favoriteBox.style.width == "25%") {
        favoriteBox.style.width = "0";
    }
    else {
        favoriteBox.style.width = '25%';
    }
}

// Alert function for perform opration
function popupwindow(text, meal,favouriteBoxDiv ) {
    // create the required elemnts
    const popupdiv = document.createElement('div');
    const popupcircle = document.createElement('div');
    const questionmark = document.createElement('i');
    const popupheading = document.createElement('h1');
    const popuppara = document.createElement('p');
    const popupokbutton = document.createElement('button');
    const popupcancelbutton = document.createElement('button');

    // add the required classes
    popupdiv.classList.add('alert-box');
    popupcircle.classList.add('circle');
    questionmark.classList.add('uil', 'uil-question', 'icon-pop1');
    popupokbutton.classList.add('btn1');
    popupcancelbutton.classList.add('btn1');

    // add parent-child relationship
    popupdiv.appendChild(popupcircle);
    popupcircle.appendChild(questionmark);
    popupdiv.appendChild(popupheading);
    popupdiv.appendChild(popuppara);
    popupdiv.appendChild(popupokbutton);
    popupdiv.appendChild(popupcancelbutton);

    popup.appendChild(popupdiv)

    // add the contenets
    popupheading.innerText = text;
    popuppara.innerText = `You Want to ${text} ${meal.strMeal} in Your Favorite-List`;
    popupokbutton.innerText = "Ok";
    popupcancelbutton.innerText = "Cancel";
    if (text=='Added') {
        popupcircle.style.background="#20a8219e";
    }

    //add Event Lisner
    popupokbutton.onclick = () => {
        if (text == "Added") {
            popup.style.display = "none";
            favoriteListAdd(meal);
        }
        else {
            popup.style.display = "none";
            favoriteBox.removeChild(favouriteBoxDiv);
            if (favoriteBox.innerText == "") {
                favoriteBox.style.width = "0";
            } 
        } 
        popup.innerHTML="";   
    }
    popupcancelbutton.onclick = () => {
        popup.style.display = "none";
        popup.innerHTML="";
    }   
}

// Fecth Meal Api by url
async function fetchMealsFromApi(url, value) {
    const response = await fetch(`${url + value}`);
    const meals = await response.json();
    return meals;
}
// Create Meal By the help of getMeal function 
function getMeal() {
    mealBox.innerHTML = '';
    let value = searchMeal.value.trim();
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let meals = fetchMealsFromApi(url, value);
    meals.then(data => {
        data.meals.forEach(meal => {
            // create the required elemnts
            const mealCardDiv = document.createElement('div');
            const mealImg = document.createElement('img');
            const mealHeading = document.createElement('h1');
            const mealButtonDiv = document.createElement('div');
            const mealDetailButton = document.createElement('button');
            const mealRemoveButton = document.createElement('button');
            const mealFavouriteIcon = document.createElement('i');

            // add the required classes
            mealCardDiv.classList.add('box');
            mealImg.classList.add('img');
            mealHeading.classList.add('heading');
            mealButtonDiv.classList.add('button-box');
            mealDetailButton.classList.add('btn');
            mealRemoveButton.classList.add('btn', 'icon');
            mealFavouriteIcon.classList.add('uil', 'uil-heart-medical');

            // add parent-child relationship
            mealCardDiv.appendChild(mealImg);
            mealCardDiv.appendChild(mealHeading);
            mealCardDiv.appendChild(mealButtonDiv);
            mealButtonDiv.appendChild(mealDetailButton);
            mealButtonDiv.appendChild(mealRemoveButton);
            mealRemoveButton.appendChild(mealFavouriteIcon);

            // add the contenets
            mealCardDiv.setAttribute('data-id', meal.idMeal);
            mealImg.setAttribute('src', meal.strMealThumb);
            mealHeading.innerText = meal.strMeal;
            mealDetailButton.innerHTML = 'View Detail';

            //Final Child Append in mealBox
            mealBox.appendChild(mealCardDiv);

            //onEventLisner
            mealDetailButton.addEventListener('click', () => { getMealDetail(meal) });
            mealFavouriteIcon.addEventListener('click', () => {
                popup.style.display = "flex";
                popupwindow('Added', meal);
            });
        });
    })
}

// Create Meal Detail page by the help of getMealDetail function
function getMealDetail(meal) {
    // create the required elemnts for Details
    const detailBox = document.createElement('div');
    const detailCrossIcon = document.createElement('i');
    const detailHeading = document.createElement('h1');
    const detailCategory = document.createElement('h4');
    const detailInstruction = document.createElement('h2');
    const detailParagraph = document.createElement('p');
    const detailImage = document.createElement('img');
    const detailButtonDiv = document.createElement('div');
    const detailVideoButton = document.createElement('button');
    const detailVideoLinkTag = document.createElement('a');

    // add the required classes and Attribute
    detailCrossIcon.classList.add('crossbut', 'icon', 'uil', 'uil-times');
    detailHeading.classList.add('text');
    detailCategory.classList.add('text', 'para');
    detailInstruction.classList.add('text');
    detailParagraph.classList.add('text', 'para');
    detailImage.classList.add('img');
    detailVideoButton.classList.add('video-btn');
    detailImage.setAttribute('src', meal.strMealThumb);
    detailVideoLinkTag.setAttribute('href', meal.strYoutube);

    // add the contenets
    detailHeading.innerText = "Name- " + meal.strMeal;
    detailCategory.innerText = "Categoty- " + meal.strCategory;
    detailInstruction.innerText = "Instruction";
    detailParagraph.innerText = meal.strInstructions;
    detailVideoLinkTag.innerText = "Watch Video";

    //add event lisner
    detailCrossIcon.addEventListener('click', () => {
        mealDetails.removeChild(detailBox);
        mealDetails.style.display = "none";

    });

    //add parent-child relationship
    detailBox.appendChild(detailCrossIcon);
    detailBox.appendChild(detailHeading);
    detailBox.appendChild(detailCategory);
    detailBox.appendChild(detailInstruction);
    detailBox.appendChild(detailParagraph);
    detailBox.appendChild(detailImage);
    detailBox.appendChild(detailButtonDiv);
    detailButtonDiv.appendChild(detailVideoButton);
    detailVideoButton.appendChild(detailVideoLinkTag);

    mealDetails.appendChild(detailBox);
    mealDetails.style.display = "block";
}

// Add meal in favorite list by the help of favoriteListAdd function
function favoriteListAdd(meal) {
    // create the required elemnts for Details
    const favouriteBoxDiv = document.createElement('div');
    const favouriteHeading = document.createElement('h1');
    const favouriteImage = document.createElement('img');
    const favorurteButtonBox = document.createElement('div');
    const favouriteDetailButton = document.createElement('button');
    const favoriteRemoveButton = document.createElement('button');

    //add Class in element 
    favouriteBoxDiv.classList.add('favbox');
    favouriteBoxDiv.setAttribute('data-id', meal.idMeal);
    favouriteHeading.classList.add('favheading');
    favouriteImage.setAttribute('src', meal.strMealThumb);
    favorurteButtonBox.classList.add('button-box');
    favouriteDetailButton.classList.add('btn', 'button');
    favoriteRemoveButton.classList.add('btn', 'button');

    //add the contents
    favouriteHeading.innerText = meal.strMeal;
    favouriteDetailButton.innerText = "View Detail";
    favoriteRemoveButton.innerText = "Remove";

    //add parent-child relationship
    favouriteBoxDiv.appendChild(favouriteHeading);
    favouriteBoxDiv.appendChild(favouriteImage);
    favouriteBoxDiv.appendChild(favorurteButtonBox);
    favorurteButtonBox.appendChild(favouriteDetailButton);
    favorurteButtonBox.appendChild(favoriteRemoveButton);
    favoriteBox.appendChild(favouriteBoxDiv);

    //Event Listner on Button
    favouriteDetailButton.addEventListener('click', () => { getMealDetail(meal); });
    favoriteRemoveButton.addEventListener('click', () => {
        popup.style.display = "flex";
        popupwindow('Remove', meal,favouriteBoxDiv );
        if (favoriteBox.innerText == "") {
            favoriteBox.style.width = "0";
        }
    });
}