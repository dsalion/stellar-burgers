describe('e2e тест конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    });
    //   cy.intercept('**', (req) => {
    //     console.log('Request URL:', req.url);
    //     console.log('Request method:', req.method);
    //   }).as('anyRequest');
    cy.visit('http://localhost:4000/');
  });

  // describe('проверяем доступность приложения', function () {
  //   it('сервис должен быть доступен по адресу localhost:4000', function () {
  //     cy.visit('http://localhost:4000');
  //   });
  // });

  describe('Добавление ингредиента из списка ингредиентов в конструктор', function () {
    it('добавляем ингредиенты', function () {
      cy.get('button[class*=data-cy-643d69a5c3f7b9001cfa093c]').click();
      cy.get('button[class*=data-cy-643d69a5c3f7b9001cfa093e]').click();
      cy.get('button[class*=data-cy-643d69a5c3f7b9001cfa0942]').click();
    });
  });
});
