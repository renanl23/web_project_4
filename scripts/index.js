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
  renderLikeButtons();
  renderTrashButtons();
  renderFigButtons();
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
function modalOpened(opened) {
  modal.classList.toggle("modal_opened");
  if (opened == "modal__content") {
    formElement.classList.toggle("modal__content_opened");
  } else {
    modalFig.classList.toggle("modal__fig_opened");
  }
}

// Elementos do Modal
const modalTitle = formElement.querySelector(".modal__title");

// Função para renderizar Modal Add Local
function renderModalAddLocation() {
  modalTitle.textContent = "Novo Local";
  titleInput.value = "";
  subtitleInput.value = "";
  titleInput.placeholder = "Titulo";
  subtitleInput.placeholder = "Link de Imagem";
  saveButton.textContent = "Criar";
  formElement.setAttribute("name", "form__add-local");
  modalOpened("modal__content");
}
// Funcão para renderizar Modal Profile Edit
function renderModalProfileEdit() {
  modalTitle.textContent = "Editar Perfil";
  titleInput.value = titleValue.textContent;
  subtitleInput.value = subtitleValue.textContent;
  titleInput.placeholder = "Nome";
  subtitleInput.placeholder = "Sobre mim";
  saveButton.textContent = "Salvar";
  formElement.setAttribute("name", "form__edit-profile");
  modalOpened("modal__content");
}
function renderFigButtons() {
  const openFigButtons = document.querySelectorAll(".element__image");
  const openedFigButtonEvent = (evt) => {
    const figureSource = evt.target;
    const figureRender = document.querySelector(".modal__image");
    const figureCaption = document.querySelector(".modal__figcaption");
    figureRender.src = figureSource.src;
    figureRender.alt = figureSource.alt;
    figureCaption.textContent = figureSource.alt;
    modalOpened("modal__fig");
  };
  openFigButtons.forEach((figButton) => {
    figButton.addEventListener("click", openedFigButtonEvent);
  });
}
// Função para escutar o evento de click no botão de element__like
function renderLikeButtons() {
  const likeButtons = document.querySelectorAll(".element__like");
  const likedButtonEvent = (evt) =>
    evt.target.classList.toggle("element__like_clicked");
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", likedButtonEvent);
  });
}
// Função para escutar o evento de click no botão de element__trash
function renderTrashButtons() {
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
closeButton.addEventListener("click", () => modalOpened("modal__content"));
closeFigButton.addEventListener("click", () => modalOpened("modal__fig"));

function handleFormSubmit(evt) {
  evt.preventDefault(); // Evita o comportamento padrão do formulário
  const isProfileEditForm = evt.target.name.includes("form__edit-profile");
  if (isProfileEditForm) {
    titleValue.textContent = titleInput.value;
    subtitleValue.textContent = subtitleInput.value;
  } else {
    initialCards.unshift({
      name: titleInput.value,
      link: subtitleInput.value,
    });
    updateElements(initialCards);
  }
  modalOpened("modal__content");
}

// Adicionar o evento de submit ao formulário do Modal
formElement.addEventListener("submit", handleFormSubmit);

// Obter os cartão iniciar no carregamento da página
updateElements(initialCards);
