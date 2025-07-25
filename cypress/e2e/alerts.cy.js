// cypress/e2e/alerts.cy.js

// Додаємо цей блок на початку файлу, щоб ігнорувати cross-origin помилки
// eslint-disable-next-line n/handle-callback-err
Cypress.on('uncaught:exception', (err, runnable) => { // Змінна 'err' не використовується, але ми її ігноруємо
  return false; // повертаємо false, щоб Cypress не падав на цій помилці
}); // Додано крапку з комою

describe('Alerts functionality', () => {
  beforeEach(() => {
    // Важливо: переконайся, що в cypress.config.js встановлено pageLoadTimeout: 90000 або більше
    // і ти використовуєш { failOnStatusCode: false } тут, як ми вже робили
    cy.visit('https://demoqa.com/alerts', { failOnStatusCode: false });
  });

  // Існуючий успішний тест для другої кнопки
  it('should display an alert with text after 5 seconds' +
     'on the second button click', () => {
    cy.get('#timerAlertButton').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('This alert appeared after 5 seconds');
    });
  });

  // Існуючий успішний тест для першої кнопки
  it('should display an alert with correct text' +
     ' on the first button click', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('You clicked a button');
    });
  });

  // Існуючий успішний тест для третьої кнопки (ОК)
  it('should display "You selected Ok" after confirming' +
     ' the third button alert', () => {
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?');
    });
    cy.get('#confirmButton').click();
    cy.get('#confirmResult').should('have.text', 'You selected Ok');
  });

  // Існуючий успішний тест для третьої кнопки (CANCEL)
  it('should display "You selected Cancel" after dismissing' +
     ' the third button alert', () => {
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?');
      return false; // Натиснути "Cancel"
    });
    cy.get('#confirmButton').click();
    cy.get('#confirmResult').should('have.text', 'You selected Cancel');
  });

  // НОВИЙ ТЕСТ ДЛЯ ADVANCED LEVEL (ЧЕТВЕРТА КНОПКА З PROMPT)
  it('should enter name in prompt and display it on the page', () => {
    const myName = 'Oksana'; // Можеш змінити на своє ім'я або будь-яке інше

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(myName);
    }); // Видалено зайвий порожній рядок

    cy.get('#promtButton').click();
    cy.get('#promptResult').should('have.text',
       `You entered ${myName}`);
  });
});
