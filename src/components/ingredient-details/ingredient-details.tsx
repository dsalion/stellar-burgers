import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { getIngridientsSelector } from '../../services/ingridients/ingridients-slice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */

  const id = useParams().id;
  const ingredients = useAppSelector(getIngridientsSelector);
  console.log('id:', id);
  const ingredientData = ingredients.find((element) => element._id === id);
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
