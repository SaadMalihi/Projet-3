let workToDelete = null;
const modalDeleteContent = document.querySelector('.modal_delete_content');

initModal();

function initModal() {
    initModalContent()
    openModal()
    closeModalWithCrossAndModalShadow()
    modalToAddWorks()
    openModalWork()
    fetchCategorieForm()
    clickButtonPost()
}

function openModal() {
    const buttonEdit = document.querySelector('.openModal')
    const modal = document.querySelector('.modal');
    buttonEdit.addEventListener('click', function () {
        modal.style.display = "flex"
    })
};

function closeModalWithCrossAndModalShadow() {
    const modalShadow = document.querySelector('.modal_shadow');
    const cross = document.querySelector('.fa-xmark');
    const modal = document.querySelector('.modal');
    cross.addEventListener('click', function () {
        modal.style.display = "none";
    })
    modalShadow.addEventListener('click', function () {
        modal.style.display = "none";
    })
}

function initModalContent() {
    const modalContent = document.querySelector('.modal_content');
    const cross = document.createElement('i')
    cross.classList = 'fas fa-xmark'
    modalContent.appendChild(cross)
    const modalIndex = document.createElement('div')
    modalIndex.classList = 'modal_index'
    modalContent.appendChild(modalIndex)

    const title = document.createElement('h3')
    title.innerHTML = 'Galerie photo'
    modalIndex.appendChild(title)

    const gallery = document.createElement('div')
    gallery.classList = 'gallery_modal'
    modalIndex.appendChild(gallery)

    const modalBottom = document.createElement('div')
    modalBottom.classList = 'modal_bottom'
    const button = document.createElement('button')
    button.classList = 'add_photo'
    const text = document.createElement('p')
    text.innerHTML = 'Supprimer la galerie'
    button.innerHTML = 'Ajouter une photo'
    modalIndex.appendChild(modalBottom)
    modalBottom.appendChild(button)
    modalBottom.appendChild(text)

};

function fetchWorksModal() {
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            console.log('data', data)
            displayWorksModal(data)
        })
}

fetchWorksModal()

function displayWorksModal(figureModal) {
    figureModal.forEach(element => {
        displayWorkModal(element)
    });
}

function displayWorkModal(element) {
    const modalDelete = document.querySelector('.modal_delete');
    const figModal = document.createElement('figure')
    figModal.setAttribute('id', element.id)
    figModal.classList = 'travaux'
    const imageModal = document.createElement('img')
    imageModal.src = element.imageUrl
    const buttonTrashFigure = document.createElement('button')
    buttonTrashFigure.classList = 'trash_button'

    buttonTrashFigure.addEventListener('click', function () {
        modalDelete.style.display = "block";
    })

    setWorkToDelete(buttonTrashFigure, element.id)
    const iconTrashButton = document.createElement('i')
    const buttonMoveFigure = document.createElement('button')
    buttonMoveFigure.classList = 'button_move'
    const iconMoveButton = document.createElement('i')
    iconMoveButton.classList = 'fa-solid fa-up-down-left-right'
    iconTrashButton.classList = 'fa-solid fa-trash-can'

    figModal.appendChild(buttonMoveFigure)
    figModal.appendChild(buttonTrashFigure)
    buttonMoveFigure.appendChild(iconMoveButton)
    buttonTrashFigure.appendChild(iconTrashButton)

    const figCaptionModal = document.createElement('figcaption')
    figCaptionModal.innerHTML = 'editer'

    const modalFigures = document.querySelector('.gallery_modal')
    modalFigures.appendChild(figModal)
    figModal.appendChild(imageModal)
    figModal.appendChild(figCaptionModal)
}

function closeModalDelete() {
    const deleteIndex = document.querySelector('.deleteIndex')
    const clickShadow = document.querySelector('.modal_delete_shadow');
    const buttonCancel = document.querySelector('.button_cancel');
    const clickArrow = document.querySelector('.popupArrow');
    const modal = document.querySelector('.modal_delete');

    clickShadow.addEventListener('click', function () {
        modal.style.display = "none";
        deleteIndex.remove();
        clickArrow.remove();
    })

    clickArrow.addEventListener('click', function () {
        modal.style.display = "none";
        deleteIndex.remove();
        clickArrow.remove();
    })

    buttonCancel.addEventListener('click', function () {
        modal.style.display = "none";
        deleteIndex.remove();
        clickArrow.remove();
    })
}

function modalDeleteConfirmation(id) {
    const modalDeleteIndex = document.createElement('div');
    modalDeleteIndex.classList = 'deleteIndex'

    modalDeleteContent.appendChild(modalDeleteIndex)
    const leftArrow = document.createElement('i')
    leftArrow.classList = 'fa-solid fa-arrow-left popupArrow'
    modalDeleteContent.appendChild(leftArrow)
    const titleDelete = document.createElement('h3')
    titleDelete.innerHTML = 'Êtes-vous sûr de vouloir supprimer?'
    modalDeleteIndex.appendChild(titleDelete)

    const modalDeleteBottom = document.createElement('div')
    modalDeleteBottom.classList = 'modal_delete_bottom'
    const buttonDelete = document.createElement('button')
    buttonDelete.innerHTML = 'Supprimer'
    buttonDelete.classList = 'button_delete'
    buttonDelete.addEventListener('click', function (e) {

        e.preventDefault()
        deleteWork(id)
        const deleteFigure = document.querySelectorAll('[id=\'' + id + '\']')
        deleteFigure.forEach(element => element.remove())
        const clickArrow = document.querySelector('.popupArrow');
        const deleteIndex = document.querySelector('.deleteIndex')
        const modal = document.querySelector('.modal_delete');
        modal.style.display = "none";
        deleteIndex.remove();
        clickArrow.remove();;
    });

    const buttonCancel = document.createElement('button')
    buttonCancel.innerHTML = 'Annuler'
    buttonCancel.classList = 'button_cancel'
    modalDeleteIndex.appendChild(modalDeleteBottom)
    modalDeleteBottom.appendChild(buttonCancel)
    modalDeleteBottom.appendChild(buttonDelete)
}

function setWorkToDelete(buttonTrash, id) {
    buttonTrash.addEventListener('click', function () {
        modalDeleteConfirmation(id)
        closeModalDelete()
        workToDelete = id
        console.log(workToDelete)
    })
}

function deleteWork(id) {
    fetch('http://localhost:5678/api/works/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
        }

    })
        .then(response => {
            if (response.ok) {
                console.log(response)

            } else {
                Error('La suppression de la ressource a échoué');
                console.log(token)

            }

        })
        .catch(error => {
            console.error('Erreur lors de la suppression de la ressource:', error);
        });

}

function modalToAddWorks() {
    const modalContent = document.querySelector('.modal_content');
    const modalIndexWork = document.createElement('div');
    modalIndexWork.classList = 'modal_index_work';
    modalContent.appendChild(modalIndexWork);

    const leftArrowWork = document.createElement('i')
    leftArrowWork.classList = 'fa-solid fa-arrow-left popupArrowWork'
    modalIndexWork.appendChild(leftArrowWork);

    const titleAddWork = document.createElement('h3');
    titleAddWork.innerHTML = 'Ajout photo'
    modalIndexWork.appendChild(titleAddWork);

    const formPhoto = document.createElement('form');
    formPhoto.classList = 'form_photo';
    modalIndexWork.appendChild(formPhoto);

    const divForLabelTitle = document.createElement('div');
    divForLabelTitle.classList = 'titleLabelDiv';
    formPhoto.appendChild(divForLabelTitle);

    const imageToPreview = document.createElement('img');
    imageToPreview.classList = 'image_preview';
    divForLabelTitle.appendChild(imageToPreview);

    const iconForTitle = document.createElement('i');
    iconForTitle.classList = 'fa-sharp fa-regular fa-image'
    divForLabelTitle.appendChild(iconForTitle);

    const labelPhoto = document.createElement("label");
    labelPhoto.for = "photo";
    labelPhoto.textContent = "+ Ajouter photo";
    labelPhoto.classList = 'photo_button';
    divForLabelTitle.appendChild(labelPhoto);

    const inputPhoto = document.createElement("input");
    inputPhoto.type = "file";
    inputPhoto.classList = 'input_photo';
    inputPhoto.setAttribute('onchange', 'previewPhotoOnForm(this)')
    inputPhoto.id = "photo"
    inputPhoto.name = "photo";
    inputPhoto.required = true;
    labelPhoto.appendChild(inputPhoto);

    const paragraphPhoto = document.createElement("p");
    paragraphPhoto.textContent = 'jpg, png : 4mo max';
    divForLabelTitle.appendChild(paragraphPhoto);

    const labelTitreForm = document.createElement('label');
    labelTitreForm.for = 'titre';
    labelTitreForm.textContent = 'Titre';
    labelTitreForm.classList = 'label_titre';
    formPhoto.appendChild(labelTitreForm);

    const inputTitre = document.createElement('input');
    inputTitre.type = 'text';
    inputTitre.addEventListener('change', function () {
        submitButton.disabled = false;
    })
    inputTitre.required = true;
    inputTitre.classList = 'input_titre';
    inputTitre.name = 'titre';
    formPhoto.appendChild(inputTitre);

    const labelCategorie = document.createElement("label");
    labelCategorie.for = "categorie";
    labelCategorie.textContent = "Catégorie:";
    formPhoto.appendChild(labelCategorie);

    const selectCategorie = document.createElement("select");
    selectCategorie.classList = "categorie_form";
    selectCategorie.required = true;
    formPhoto.appendChild(selectCategorie);

    const divForButtonBottom = document.createElement('div');
    divForButtonBottom.classList = 'bottom_content_button';
    formPhoto.appendChild(divForButtonBottom);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.classList = 'button_validate_form';
    submitButton.textContent = "Valider";
    divForButtonBottom.appendChild(submitButton);

}

function openModalWork() {
    const arrowReturnBack = document.querySelector('.popupArrowWork')
    const modalShadow = document.querySelector('.modal_shadow')
    const modalToOpen = document.querySelector('.modal_index_work');
    const modalToClose = document.querySelector('.modal_index');
    const buttonOpen = document.querySelector('.add_photo');
    const crossClose = document.querySelector('.fa-xmark')

    buttonOpen.addEventListener('click', function () {
        modalToClose.style.display = "none";
        modalToOpen.style.display = "flex";
        resetFormTextField()
    })
    modalShadow.addEventListener('click', function () {
        modalToOpen.style.display = "none";
        modalToClose.style.display = "block";
    })

    arrowReturnBack.addEventListener('click', function () {

        modalToOpen.style.display = "none";
        modalToClose.style.display = "block";
    })

    crossClose.addEventListener('click', function () {
        modalToOpen.style.display = "none";
        modalToClose.style.display = "block";
    })
    updateButton()
}

function fetchCategorieForm() {
    const selectCategorie = document.querySelector('.categorie_form')
    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(data => {
            data.forEach(categorie => {
                const option = document.createElement("option");
                option.value = categorie.id;
                option.textContent = categorie.name;
                selectCategorie.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des catégories:", error);
        })
}

function resetFormTextField() {
    const buttonToPost = document.querySelector('.button_validate_form')
    const formPhoto = document.querySelector('.form_photo');
    const closeButtonCross = document.querySelector('.fa-xmark');
    const returnButtonArrow = document.querySelector('.popupArrowWork');
    const modalShadowClose = document.querySelector('.modal_shadow');
    const imageToPreview = document.querySelector('.image_preview');

    buttonToPost.addEventListener('click', function () {
        formPhoto.reset();
        imageToPreview.src = '';
        updateButton()
    })

    closeButtonCross.addEventListener('click', function () {
        formPhoto.reset();
        imageToPreview.src = '';
        updateButton()
    })

    returnButtonArrow.addEventListener('click', function () {
        formPhoto.reset();
        imageToPreview.src = '';
        updateButton()
    })

    modalShadowClose.addEventListener('click', function () {
        formPhoto.reset();
        imageToPreview.src = '';
        updateButton()
    })
}

function previewPhotoOnForm(e) {
    const input = document.querySelector('.input_photo');
    console.log(input.files);
    const image = document.querySelector('.image_preview');
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        image.src = reader.result
    })
    reader.readAsDataURL(input.files[0]);
}

function updateButton() {
    const inputTitle = document.querySelector('.input_titre');
    const inputPhoto = document.querySelector('.input_photo');
    const inputCategory = document.querySelector('.categorie_form');
    const submitButton = document.querySelector('.button_validate_form');

    inputTitle.addEventListener('input', updateButton);
    inputPhoto.addEventListener('input', updateButton);
    inputCategory.addEventListener('input', updateButton);

    if (inputTitle.value && inputPhoto.value && inputCategory.value) {
        submitButton.style.backgroundColor = '#1D6154';
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.style.backgroundColor = 'grey';
        submitButton.setAttribute('disabled', true);
    }
}

function clickButtonPost() {
    const modalToOpen = document.querySelector('.modal_index_work');
    const modalToClose = document.querySelector('.modal_index');
    const buttonPost = document.querySelector(".button_validate_form");
    buttonPost.addEventListener('click', function (e) {
        e.preventDefault();
        submitForm()
        modalToOpen.style.display = "none";
        modalToClose.style.display = "block";
    });
}

function submitForm() {

    const inputText = document.querySelector('.input_titre');
    const inputImage = document.querySelector('.input_photo');
    const inputCategory = document.querySelector('.categorie_form');

    const selectedOption = inputCategory.options[inputCategory.selectedIndex]
    const formData = new FormData();
    formData.append('title', inputText.value);
    formData.append('image', inputImage.files[0]);
    formData.append('category', selectedOption.getAttribute('value'));

    fetch('http://localhost:5678/api/works/', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(res =>
            res.json()
        )
        .then(data => {
            displayWorkModal(data);
            console.log('data', data);
            displayWorkGallery(data);
        })

        .catch(error => {
            console.error('Erreur lors de l\'ajout de la ressource:', error);
        });
}