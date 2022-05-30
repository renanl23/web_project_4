// Formulário
const formElement = document.querySelector(".modal__content");

// Entradas
const titleInput = formElement.querySelector(".form__title");
const subtitleInput = formElement.querySelector(".form__subtitle");

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
