describe('e2e тест конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.visit('http://localhost:4000/');
  });

  describe('Добавление ингредиента из списка ингредиентов в конструктор', function () {
    it('добавляем ингредиенты', function () {
      cy.get('[data-cy=643d69a5c3f7b9001cfa093c]').find('button').click();
      cy.wait(1000);
      cy.get('[data-cy=643d69a5c3f7b9001cfa093e]').find('button').click();
      cy.wait(1000);
      cy.get('[data-cy=643d69a5c3f7b9001cfa0942]').find('button').click();
    });
  });

  describe('Открытие модального окна и закрытие', function () {
    it('открываем модальное окно через ингредиент, закрываем через крестик, открываем и закрываем через оверлей', function () {
      const element = cy.get(`[data-cy=643d69a5c3f7b9001cfa093c]`);
      element.click();
      cy.wait(1000);
      const closeBtn = cy.get(`[data-cy=modal-close]`);
      closeBtn.click();
      cy.wait(1000);
      element.click();
      cy.wait(1000);
      const modal = cy.get(`[data-cy=modal]`);
      modal.should('exist');
      const overlay = cy.get(`[data-cy=overlay]`);
      cy.get(`[data-cy=modal]`).invoke('css', 'visibility', 'hidden');
      modal.should('exist');
      overlay.click();
      cy.wait(1000);
      modal.should('not.exist');

      //cy.get(`[data-cy=modal]`).invoke('css', 'visibility', 'visible');
    });
  });

  describe('отправление заказа', function () {
    beforeEach(() => {
      cy.setCookie('accessToken', 'accessToken');
      localStorage.setItem('refreshToken', 'refreshToken');
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      cy.visit('http://localhost:4000');
    });
    it('добавляем ингридиенты в заказ', function () {
      cy.get('[data-cy=643d69a5c3f7b9001cfa093c]').find('button').click();
      cy.wait(1000);
      cy.get('[data-cy=643d69a5c3f7b9001cfa093e]').find('button').click();
      cy.wait(1000);
      cy.get('[data-cy=643d69a5c3f7b9001cfa0942]').find('button').click();
      //const bun = cy.get(`[data-cy=bun]`);
      cy.get(`[data-cy=bun]`).should('exist');
      //const ingredient = cy.get(`[data-cy=ingredient]`);
      cy.get(`[data-cy=ingredient]`).should('exist');

      const submitBtn = cy.get(`[data-cy=submitBtn]`);
      cy.wait(1000);
      submitBtn.click();
      cy.wait(1000);
      cy.get(`[data-cy=modal]`).should('exist');
      cy.get(`[data-cy=modal-close]`).click();
      cy.get(`[data-cy=modal]`).should('not.exist');
      cy.get(`[data-cy=bun]`).should('not.exist');
      cy.get(`[data-cy=ingredient]`).should('not.exist');
    });
    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
