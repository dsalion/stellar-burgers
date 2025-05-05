import burgerConstructorSlice, {
  addIngridient,
  removeIngridient,
  clearConstructor,
  selectBun,
  selectIngridients,
  selectBurger,
  IBurgerConstructorState
} from './burgerConstructor-slice';
import { TIngredient } from '@utils-types';

describe('burgerConstructorSlice', () => {
  const initialState: IBurgerConstructorState = {
    bun: null,
    ingredients: []
  };

  const mockBun: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const mockIngredientMain: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  const mockIngredientSauce: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  it('return initial state', () => {
    expect(burgerConstructorSlice(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  describe('addIngridient action', () => {
    it('handle adding a bun', () => {
      const action = addIngridient(mockBun);
      const result = burgerConstructorSlice(initialState, action);

      expect(result.bun).toEqual({
        ...mockBun,
        uuid: expect.any(String)
      });
      expect(result.ingredients).toEqual([]);
    });

    it('handle adding not bun ingredient', () => {
      const action = addIngridient(mockIngredientMain);
      const result = burgerConstructorSlice(initialState, action);

      expect(result.ingredients).toEqual([
        {
          ...mockIngredientMain,
          uuid: expect.any(String)
        }
      ]);
      expect(result.bun).toBeNull();
    });
  });

  describe('removeIngridient action', () => {
    it('handle removing an ingredient by index', () => {
      const stateWithIngredients: IBurgerConstructorState = {
        bun: null,
        ingredients: [
          { ...mockIngredientMain, uuid: '1' },
          { ...mockIngredientSauce, uuid: '2' }
        ]
      };

      const action = removeIngridient({ index: 0 });
      const result = burgerConstructorSlice(stateWithIngredients, action);

      expect(result.ingredients).toEqual([
        { ...mockIngredientSauce, uuid: '2' }
      ]);
    });

    it('not modify state if index is out of bounds', () => {
      const stateWithIngredients: IBurgerConstructorState = {
        bun: null,
        ingredients: [{ ...mockIngredientMain, uuid: '1' }]
      };

      const action = removeIngridient({ index: 5 });
      const result = burgerConstructorSlice(stateWithIngredients, action);

      expect(result).toEqual(stateWithIngredients);
    });
  });

  describe('clearConstructor action', () => {
    it('clear all ingredients and bun', () => {
      const stateWithItems: IBurgerConstructorState = {
        bun: mockBun,
        ingredients: [
          { ...mockIngredientMain, uuid: '1' },
          { ...mockIngredientSauce, uuid: '2' }
        ]
      };

      const result = burgerConstructorSlice(stateWithItems, clearConstructor());

      expect(result).toEqual(initialState);
    });
  });
});
