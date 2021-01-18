import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [cocktail, setCocktail] = useState([])

  const getCocktails = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}${id}`)
      const data = await response.json();
      if (data.drinks) {
        const {
          strDrink: name,
          strDrinkThumb: image,
          strAlcoholic: info,
          strGlass: glass,
          strInstructions: instruction,
          strCategory: category,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5
        } = data.drinks[0];
        const ingredient = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5
        ]
        const newCocktails = {
          name, info, image, instruction, glass, ingredient, category
        }
        setCocktail(newCocktails)
      } else {
        setCocktail(null)
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [id])

  useEffect(() => {
    getCocktails();
  }, [id, getCocktails])

  if (isLoading) {
    return <Loading />
  }

  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>
  } else {
    const { name, info, image, instruction, glass, ingredient, category } = cocktail;
    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">back to home</Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name} />
          <div className="drink-info">
            <p><span className="drink-data">name:</span> {name}</p>
            <p><span className="drink-data">category:</span> {category}</p>
            <p><span className="drink-data">info:</span> {info}</p>
            <p><span className="drink-data">instruction:</span> {instruction}</p>
            <p><span className="drink-data">glass:</span> {glass}</p>
            {
              ingredient && <p><span className="drink-data">ingredients:</span>
                {ingredient.map((item, index) => {
                  return (item ? <span key={index}>{item}</span> : null)
                })}
              </p>
            }
          </div>
        </div>
      </section>
    )
  }

}

export default SingleCocktail
