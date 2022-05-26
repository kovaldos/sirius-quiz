import FormsValidate from './form-validate';
const formWrappers = document.querySelectorAll('[data-validate]');

const resetForm = (form) => {
  setTimeout(() => {
    window.clearForm(form);
  }, 1000);
};

const baseValidationSuccessCallback = (e) => {
  e.preventDefault();
  // В данном колбеке бэкендер будет писать запрос на отправку формы на сервер и обрабатывать возможные ошибки при отправке
  resetForm(e.target);
};

const baseValidationErrorCallback = (e) => {
  e.preventDefault();
};

const quizFormSuccessCallback = (e) => {
  e.preventDefault();
  // В данном колбеке бэкендер будет писать запрос на отправку формы на сервер и обрабатывать возможные ошибки при отправке
  const form01 = document.querySelector('.quiz__form--01');
  const form02 = document.querySelector('.quiz__form--02');
  const form03 = document.querySelector('.quiz__form--03');
  const form04 = document.querySelector('.quiz__form--04');
  const form05 = document.querySelector('.quiz__form--05');
  const resultBlock = document.querySelector('.quiz__result');
  const navStripes = document.querySelectorAll('.quiz__nav-link');
  const formData = new FormData(e.target);
  const DATA = [];
  const switchScreen = (screen1, screen2, index1, index2) => {
    if (e.target.closest('.quiz__form') === screen1) {
      screen1.classList.add('is-previous');
      screen2.classList.remove('is-next');
      navStripes[index1].classList.remove('quiz__nav-link--current');
      navStripes[index2].classList.add('quiz__nav-link--current');
    }
  };

  switchScreen(form01, form02, 0, 1);

  switchScreen(form02, form03, 1, 2);
  switchScreen(form03, form04, 2, 3);
  switchScreen(form04, form05, 3, 4);
  switchScreen(form05, resultBlock, 4, 5);

  DATA.push(formData);
  // Список пар ключ/значение
  for (let [name, value] of formData) {
    console.log(`${name} = ${value}`); // key1=value1, потом key2=value2
  }
  console.log(DATA);
  resetForm(e.target);
  // eslint-disable-next-line no-console
  console.log('Ваша форма успешна отправлена');
};

const quizFormErrorCallback = (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-console
  console.error('Отправка формы невозможна, заполните все обязательные поля');
};

const callbacks = {
  base: {
    // Колбек при успешной валидации формы при попытке её отправки
    validationSuccessCallback: baseValidationSuccessCallback,
    // Колбек при не успешной валидации формы при попытке её отправки, не связан с запросами на сервер
    validationErrorCallback: baseValidationErrorCallback,
  },
  quizForm: {
    validationSuccessCallback: quizFormSuccessCallback,
    validationErrorCallback: quizFormErrorCallback,
  },
};

const setCustomPhoneInputsEvent = () => {
  if (document.querySelectorAll('[data-validate-type="phone"] input').length) {
    document.querySelector('html').addEventListener('input', ({ target }) => {
      if (target.closest('[data-validate-type="phone"]')) {
        target.closest('[data-validate-type="phone"]').querySelector('input').dispatchEvent(new Event('input'));
      }
    });
  }
};

const initFormValidate = () => {
  if (formWrappers.length) {
    setCustomPhoneInputsEvent();
    formWrappers.forEach((wrapper) => {
      let callback = wrapper.dataset.callback;

      if (!callback) {
        callback = 'base';
      }

      const formValidate = new FormsValidate(wrapper, callbacks[callback]);
      return formValidate.init();
    });
  }
};

export { initFormValidate };
