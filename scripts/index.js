// Formulário
const form = document.querySelector(".modal__content");

// Entradas
const titleInput = form.querySelector(".form__title");
const subtitleInput = form.querySelector(".form__subtitle");

// Botões de ação
const profileEditButton = document.querySelector(".profile__edit");
const closeButton = document.querySelector(".modal__close");
const saveButton = profileEditButton.querySelector(".modal__button");

// Valores
const titleValue = document.querySelector(".profile__title");
const subtitleValue = document.querySelector(".profile__subtitle");

const modal = document.querySelector(".modal");

// Arrow function para escutar o evento de click no botão de fechar e editar
const modalOpened = () => modal.classList.toggle("modal_opened");

profileEditButton.addEventListener("click", modalOpened);
closeButton.addEventListener("click", modalOpened);

likeButton.addEventListener("click", likeButtonClicked);

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita o comportamento padrão do formulário

  titleValue.textContent = titleInput.value;
  subtitleValue.textContent = subtitleInput.value;

  modalOpened();
});
