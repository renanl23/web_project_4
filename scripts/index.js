const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// Formulário
const formElement = document.querySelector(".modal__content");
// Modal Fig
const modalFig = document.querySelector(".modal__fig");

// Entradas
const titleInput = formElement.querySelector("#title");
const subtitleInput = formElement.querySelector("#subtitle");

// Template Elements
const elementsList = document.querySelector(".elements");

function renderElement(card) {
  const templateElements = document.querySelector("template").content;
  const element = templateElements.querySelector(".element").cloneNode(true);
  element.querySelector(".element__image").src = card.link;
  element.querySelector(".element__image").alt = card.name;
  element.querySelector(".element__title").textContent = card.name;
  elementsList.append(element);
}

function updateElements(cards) {
  elementsList.innerHTML = "";
  cards.forEach((card) => renderElement(card));
  setEventLikeButtons();
  setEventTrashButtons();
  setEventFigButtons();
}

// Botões de ação
const profileEditButton = document.querySelector(".profile__edit");
const profileAddLocation = document.querySelector(".profile__add");
const closeButton = document.querySelector(".modal__close");
const closeFigButton = document.querySelector(".modal__figclose");
const saveButton = document.querySelector(".modal__button");

// Valores
const titleValue = document.querySelector(".profile__title");
const subtitleValue = document.querySelector(".profile__subtitle");

const modal = document.querySelector(".modal");

// Função para abertura do modal
function handleModal(opened) {
  modal.classList.toggle("modal_opened");
  if (opened == "modal__content") {
    formElement.classList.toggle("modal__content_opened");
  } else {
    modalFig.classList.toggle("modal__fig_opened");
  }
}

// Elementos do Modal
const modalTitle = formElement.querySelector(".modal__title");

// Função para configurar os atributos de Modal Add Local
function setModalAddLocation() {
  modalTitle.textContent = "Novo Local";
  titleInput.value = "";
  subtitleInput.value = "";
  titleInput.placeholder = "Titulo";
  subtitleInput.placeholder = "Link de Imagem";
  saveButton.textContent = "Criar";
  formElement.setAttribute("name", "form__add-local");
}

// Função para renderizar Modal Add Local
function renderModalAddLocation() {
  setModalAddLocation();
  handleModal("modal__content");
}
// Função para configurar os atributos de Modal Profile Edit
function setModalProfileEdit() {
  modalTitle.textContent = "Editar Perfil";
  titleInput.value = titleValue.textContent;
  subtitleInput.value = subtitleValue.textContent;
  titleInput.placeholder = "Nome";
  subtitleInput.placeholder = "Sobre mim";
  saveButton.textContent = "Salvar";
  formElement.setAttribute("name", "form__edit-profile");
}

// Funcão para renderizar Modal Profile Edit
function renderModalProfileEdit() {
  setModalProfileEdit();
  handleModal("modal__content");
}

function handleFigButtonEvent(evt) {
  const figureSource = evt.target;
  const figure = document.querySelector(".modal__image");
  const figureCaption = document.querySelector(".modal__figcaption");
  figure.src = figureSource.src;
  figure.alt = figureSource.alt;
  figureCaption.textContent = figureSource.alt;
  handleModal("modal__fig");
}

function setEventFigButtons() {
  const openFigButtons = document.querySelectorAll(".element__image");
  openFigButtons.forEach((figButton) => {
    figButton.addEventListener("click", handleFigButtonEvent);
  });
}

function handleLikeButtonsEvent(evt) {
  evt.target.classList.toggle("element__like_clicked");
}

// Função para escutar o evento de click no botão de element__like
function setEventLikeButtons() {
  const likeButtons = document.querySelectorAll(".element__like");
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", handleLikeButtonsEvent);
  });
}
// Função para escutar o evento de click no botão de element__trash
function setEventTrashButtons() {
  const trashButtons = document.querySelectorAll(".element__trash");
  trashButtons.forEach((trashButton) => {
    trashButton.addEventListener("click", removeCard);
  });
}

function getIndexOfElementEvent(evt) {
  const elementOf = evt.target.parentElement;
  const arrayElements = Array.from(elementOf.parentElement.children);
  return arrayElements.indexOf(elementOf);
}

function removeCard(evt) {
  const index = getIndexOfElementEvent(evt);
  initialCards.splice(index, 1);
  updateElements(initialCards);
}

profileEditButton.addEventListener("click", renderModalProfileEdit);
profileAddLocation.addEventListener("click", renderModalAddLocation);
closeButton.addEventListener("click", () => handleModal("modal__content"));
closeFigButton.addEventListener("click", () => handleModal("modal__fig"));

function handleFormSubmit(evt) {
  evt.preventDefault(); // Evita o comportamento padrão do formulário
  const profileEditForm = evt.target.name.includes("form__edit-profile");
  if (profileEditForm) {
    titleValue.textContent = titleInput.value;
    subtitleValue.textContent = subtitleInput.value;
  } else {
    initialCards.unshift({
      name: titleInput.value,
      link: subtitleInput.value,
    });
    updateElements(initialCards);
  }
  handleModal("modal__content");
}

// Adicionar o evento de submit ao formulário do Modal
formElement.addEventListener("submit", handleFormSubmit);

// Obter os cartão iniciar no carregamento da página
updateElements(initialCards);
