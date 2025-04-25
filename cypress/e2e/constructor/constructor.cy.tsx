describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
  });
});

describe('просто поугораем', function () {
  it('поперемещаемся по сервисам', function () {
    cy.visit('http://localhost:4000/feed');
    
    cy.visit('http://localhost:4000/');
    cy.visit('http://localhost:4000/profile');
  });
});
