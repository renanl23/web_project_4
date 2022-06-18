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
}

// Botões de ação
const profileEditButton = document.querySelector(".profile__edit");
const closeButton = document.querySelector(".modal__close");
const saveButton = profileEditButton.querySelector(".modal__button");
const likeButtons = document.querySelectorAll(".element__like");

// Valores
const titleValue = document.querySelector(".profile__title");
const subtitleValue = document.querySelector(".profile__subtitle");

const modal = document.querySelector(".modal");

// Função para abertura e fechamento do modal
function modalOpened() {
  return modal.classList.toggle("modal_opened");
}

// Função para escutar o evento de click no botão de element__like
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__like_clicked");
  });
});

profileEditButton.addEventListener("click", modalOpened);
closeButton.addEventListener("click", modalOpened);

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Evita o comportamento padrão do formulário

  titleValue.textContent = titleInput.value;
  subtitleValue.textContent = subtitleInput.value;

  modalOpened();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
updateElements(initialCards);
