/* eslint-disable no-console */
//  Кнопки плюс и минус в форм-квизе -- Начало --

const initQuiz = () => {

  const quizBlock = document.querySelector('.quiz');
  const counterWarning = quizBlock.querySelector('.quiz__form-warning');
  const input = quizBlock.querySelector('.quiz__form-input input');
  let counter = input.value;
  const initCounter = (btn) => {

    if (btn.classList.contains('quiz__form-btn--minus')) {
      if (counter > 0) {
        counter--;
        input.value = counter;
      } else {
        counterWarning.classList.add('is-active');
        setTimeout(() => {
          counterWarning.classList.remove('is-active');
        }, 3000);
        console.log('Не может быть отрицательным!');
      }
    }
    if (btn.classList.contains('quiz__form-btn--plus')) {
      counter++;
      input.value = counter;
    }
  };
  if (quizBlock) {
    quizBlock.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('quiz__form-btn')) {
        initCounter(target);
      }
    });
  }
};

export {initQuiz};

//  Кнопки плюс и минус в форм-квизе -- Конец --
