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
  if (e.target.closest('.quiz__form') === form01) {
    form01.classList.add('is-previous');
    form02.classList.remove('is-next');
    navStripes[0].classList.remove('quiz__nav-link--current');
    navStripes[1].classList.add('quiz__nav-link--current');
  }
  if (e.target.closest('.quiz__form') === form02) {
    form02.classList.add('is-previous');
    form03.classList.remove('is-next');
    navStripes[1].classList.remove('quiz__nav-link--current');
    navStripes[2].classList.add('quiz__nav-link--current');
  }
  if (e.target.closest('.quiz__form') === form03) {
    form03.classList.add('is-previous');
    form04.classList.remove('is-next');
    navStripes[2].classList.remove('quiz__nav-link--current');
    navStripes[3].classList.add('quiz__nav-link--current');
  }
  if (e.target.closest('.quiz__form') === form04) {
    form04.classList.add('is-previous');
    form05.classList.remove('is-next');
    navStripes[3].classList.remove('quiz__nav-link--current');
    navStripes[4].classList.add('quiz__nav-link--current');
  }
  if (e.target.closest('.quiz__form') === form05) {
    form05.classList.add('is-previous');
    resultBlock.classList.remove('is-next');
    navStripes[4].classList.remove('quiz__nav-link--current');
    navStripes[5].classList.add('quiz__nav-link--current');
  }

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
