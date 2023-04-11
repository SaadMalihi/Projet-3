let workToDelete = null;


init();
function init() {
    modalContent()
    closeModalWithCross()
    modalWorks()
    openModalWork()
}

function openModal() {
    const modal=document.querySelector('.modal');
    modal.style.display="flex";
    
};

function closeModal() {
    const modal=document.querySelector('.modal');
    modal.style.display="none";
};

function closeModalWithCross(){
    const cross=document.querySelector('.fa-xmark');
    const modal=document.querySelector('.modal');
    cross.addEventListener('click', function(){
        modal.style.display="none";
    })
}

function modalContent() {
    const modalContent=document.querySelector('.modal_content');
    const cross=document.createElement('i')
    cross.classList='fas fa-xmark'
    modalContent.appendChild(cross)
    const modalIndex=document.createElement('div')
    modalIndex.classList='modal_index'
    modalContent.appendChild(modalIndex)

    const title=document.createElement('h3')
    title.innerHTML='Galerie photo'
    modalIndex.appendChild(title)

    const gallery=document.createElement('div')
    gallery.classList='gallery_modal'
    modalIndex.appendChild(gallery)

    
    const modalBottom=document.createElement('div')
    modalBottom.classList='modal_bottom'
    const button=document.createElement('button')
    button.classList='add_photo'
    const text=document.createElement('p')
    text.innerHTML='Supprimer la galerie'
    button.innerHTML='Ajouter une photo'
    modalIndex.appendChild(modalBottom)
    modalBottom.appendChild(button)
    modalBottom.appendChild(text)

};

function fetchWorksModal() {
    fetch('http://localhost:5678/api/works')
    .then(response =>response.json())
    .then(data =>{
        displayWorksModal(data)
        openDeleteModal()
    }) 
    
}

fetchWorksModal()

function displayWorksModal(figureModal){
    figureModal.forEach(element =>{
        const figModal = document.createElement('figure')
        figModal.setAttribute('id',element.id)
        figModal.classList='travaux'
        const imageModal = document.createElement('img')
        imageModal.src = element.imageUrl
        const buttonTrashFigure = document.createElement('button')
        buttonTrashFigure.classList='trash_button'
            setWorkToDelete(buttonTrashFigure, element.id)
        const iconTrashButton = document.createElement('i')
        const buttonMoveFigure = document.createElement('button')
        buttonMoveFigure.classList='button_move'
        const iconMoveButton = document.createElement('i')
        iconMoveButton.classList='fa-solid fa-up-down-left-right'
        iconTrashButton.classList='fa-solid fa-trash-can'
        figModal.appendChild(buttonMoveFigure)
        figModal.appendChild(buttonTrashFigure)
        buttonMoveFigure.appendChild(iconMoveButton)
        buttonTrashFigure.appendChild(iconTrashButton)
        const figCaptionModal = document.createElement('figcaption')
        figCaptionModal.innerHTML ='editer'
        console.log(figCaptionModal)
    
        const modalFigures = document.querySelector('.gallery_modal')
        modalFigures.appendChild(figModal)
        figModal.appendChild(imageModal)
        figModal.appendChild(figCaptionModal)
    });
}

function openDeleteModal() {
    const buttonOpen=document.querySelectorAll('.trash_button');
    console.log(buttonOpen)
    const modalDelete=document.querySelector('.modal_delete');
    buttonOpen.forEach(button => {
        button.addEventListener('click', function(){
            modalDelete.style.display="block";
        })
    }
    
)}

function closeModalDelete(){
    const deleteIndex=document.querySelector('.deleteIndex')
    const clickShadow=document.querySelector('.modal_delete_shadow');
    const buttonCancel=document.querySelector('.button_cancel');
    const clickArrow=document.querySelector('.popupArrow');
    const modal=document.querySelector('.modal_delete');
    clickShadow.addEventListener('click', function(){
        modal.style.display="none";
        deleteIndex.remove();
        clickArrow.remove();
    })

    clickArrow.addEventListener('click', function(){
        modal.style.display="none";
        deleteIndex.remove();
        clickArrow.remove();
    })

    buttonCancel.addEventListener('click', function(){
        modal.style.display="none";
        deleteIndex.remove();
        clickArrow.remove();
    })
}



function modalDeleteConfirmation(id) {
   //* const modalDelete=document.querySelector('.modal_delete');
    const modalDeleteContent=document.querySelector('.modal_delete_content');
    const modalDeleteIndex=document.createElement('div');
    modalDeleteIndex.classList='deleteIndex'

    modalDeleteContent.appendChild(modalDeleteIndex)
    const leftArrow=document.createElement('i')
    leftArrow.classList='fa-solid fa-arrow-left popupArrow'
    modalDeleteContent.appendChild(leftArrow)
    const titleDelete=document.createElement('h3')
    titleDelete.innerHTML='Êtes-vous sûr de vouloir supprimer?'
    modalDeleteIndex.appendChild(titleDelete)
    console.log(titleDelete)


    const modalDeleteBottom=document.createElement('div')
    modalDeleteBottom.classList='modal_delete_bottom'
    const buttonDelete=document.createElement('button')
    buttonDelete.innerHTML='Supprimer'
    buttonDelete.classList='button_delete'
    buttonDelete.addEventListener('click', function() {
        deleteWork(id)
        });
    const buttonCancel=document.createElement('button')
    buttonCancel.innerHTML='Annuler'
    buttonCancel.classList='button_cancel'
    modalDeleteIndex.appendChild(modalDeleteBottom)
    modalDeleteBottom.appendChild(buttonCancel)
    modalDeleteBottom.appendChild(buttonDelete)


}

function setWorkToDelete(buttonTrash, id){
        buttonTrash.addEventListener('click', function() {
            modalDeleteConfirmation(id)
            closeModalDelete()
            workToDelete = id
            console.log(workToDelete)
    })   
}

function deleteWork(id){ 
    fetch('http://localhost:5678/api/works/'+ id
    , {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer ' + token,    
  }
  
})
.then(response => {
  if (response.ok){
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

function modalWorks(){
    const modalContent=document.querySelector('.modal_content');
    const modalIndexWork=document.createElement('div');
    modalIndexWork.classList='modal_index_work';
    const leftArrowWork=document.createElement('i')
    leftArrowWork.classList='fa-solid fa-arrow-left popupArrowWork'
    const titleAddWork=document.createElement('h3');
    titleAddWork.innerHTML='Ajout photo'

    const formPhoto=document.createElement('form');
    formPhoto.classList='form_photo';

    const labelPhoto = document.createElement("label");
    labelPhoto.for = "photo";
    labelPhoto.textContent = "Photo:";
    const inputPhoto = document.createElement("input");
    inputPhoto.type = "file";
    inputPhoto.classList='input_photo';
    inputPhoto.name = "photo";
    labelPhoto.appendChild(inputPhoto);

    const labelTitreForm=document.createElement('label');
    labelTitreForm.for='titre';
    labelTitreForm.textContent='Titre';
    const inputTitre=document.createElement('input');
    inputTitre.type='text';
    inputTitre.classList='input_titre';
    inputTitre.name='titre';
    labelTitreForm.appendChild(inputTitre);

    const labelCategorie = document.createElement("label");
    labelCategorie.for = "categorie";
    labelCategorie.textContent = "Catégorie:";
    const selectCategorie = document.createElement("select");
    selectCategorie.classList = "categorie_form";
    labelCategorie.appendChild(selectCategorie);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Valider";


    modalContent.appendChild(modalIndexWork);
    modalIndexWork.appendChild(leftArrowWork);
    modalIndexWork.appendChild(titleAddWork);
    modalIndexWork.appendChild(formPhoto);
    formPhoto.appendChild(labelPhoto);
    formPhoto.appendChild(labelTitreForm);
    formPhoto.appendChild(labelCategorie);
    formPhoto.appendChild(submitButton);
}

function openModalWork(){
    const modalShadow=document.querySelector('.modal_shadow')
    const modalToOpen=document.querySelector('.modal_index_work');
    const modalToClose=document.querySelector('.modal_index');
    const buttonOpen=document.querySelector('.add_photo');
    buttonOpen.addEventListener('click', function () {
            modalToClose.style.display="none";
            modalToOpen.style.display="flex";
    })
    modalShadow.addEventListener('click', function () {
        modalToClose.style.display="block";
        modalToOpen.style.display="none";
        
    })
}

