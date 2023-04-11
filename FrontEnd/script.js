let allWorks = null
const token = localStorage.getItem('token');

async function fetchWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    allWorks = works
    return works;
}

function displayWorks(figure) {
    figure.forEach(element => {
        const figElement = document.createElement('figure');
        const imageElement = document.createElement('img');
        imageElement.src = element.imageUrl;
        const figCaptionElement = document.createElement('figcaption');
        figCaptionElement.innerText = element.title;

        const sectionFigures = document.querySelector('.gallery');
        sectionFigures.appendChild(figElement)
        figElement.appendChild(imageElement)
        figElement.appendChild(figCaptionElement)

    });
}

fetchWorks().then(works => {
    displayWorks(works);
    async function fetchCategories() {
        const responses = await fetch('http://localhost:5678/api/categories');
        const categories = await responses.json();
        return categories;
    }

    fetchCategories().then(categories => {
        categories.forEach(categorie => {
                const nouveauBouton = document.createElement('button');
                nouveauBouton.textContent = categorie.name;
                nouveauBouton.id = categorie.categoryId;
                nouveauBouton.addEventListener('click', function() {

                    const result = works.filter(work => work.categoryId === categorie.id)
                    document.querySelector(".gallery").innerHTML = "";
                    displayWorks(result);

                });

                const boutonsDiv = document.querySelector('.allbutton');
                boutonsDiv.appendChild(nouveauBouton);
        });
    })

});

function getAllWorks() {
    document.querySelector(".gallery").innerHTML = "";
    displayWorks(allWorks);
}

function logout() {
    localStorage.clear();
}

function hideElement() {
    if (token) {
        const elementWhenUserLogged = document.querySelectorAll('.loggedIn');
        elementWhenUserLogged.forEach(element => {
            element.style.display ='block';
        })

        const elementToHideWhenUserLogged = document.querySelectorAll('.hideLoggedIn');
        elementToHideWhenUserLogged.forEach(element =>{
            element.style.display ='none';
        })

        const elementLoggedInFlex = document.querySelectorAll('.loggedInFlex');
        elementLoggedInFlex.forEach(element =>{
            element.style.display ='flex';
        })

        const marginTopHeader=document.querySelector('.head')
        marginTopHeader.style.marginTop ='60px';

    }
}

hideElement();

        

