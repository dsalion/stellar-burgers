


describe('e2e тест конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', '/ingredients', { fixture: 'ingredients' });
  });

  describe('проверяем доступность приложения', function () {
    it('сервис должен быть доступен по адресу localhost:4000', function () {
      cy.visit('http://localhost:4000');
    });
  });

  describe('Добавление ингредиента из списка ингредиентов в конструктор', function () {
    it('откроем сайт', function () {
      cy.visit('http://localhost:4000/');
      cy.get('button[class*=data-cy-643d69a5c3f7b9001cfa093d').click();
      cy.get('button[class*=data-cy-643d69a5c3f7b9001cfa093e').click();
      cy.get('button[class*=data-cy-643d69a5c3f7b9001cfa0942').click();
    });
  });
})