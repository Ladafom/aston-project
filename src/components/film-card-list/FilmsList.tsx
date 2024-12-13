import React from 'react'
import FilmCard from '../film-card/FilmCard';
import Plug from '../plug/Plug';
import './style.css'

type FilmsListProps = {
  films: any // @todo: type of FilmsList props
  clickOnFavoriteBtn: ()=> void
}

const FilmsList = ({films, clickOnFavoriteBtn}:FilmsListProps):JSX.Element => {

  return (
    <div className='FilmsList'>
      {
        films?.data?.results?.map((film:any)=>( // @todo: type of film
            <FilmCard
              key={film?.id}
              name={film?.titleText.text}
              image={film?.primaryImage?.url || '/image_not_found.jpg'}
              id={film?.id}
              clickOnFavoriteBtn={clickOnFavoriteBtn}
            />
        ))
      }
      {
        !films?.data?.results?.length &&
        <Plug text='Нет совпадений'/>
      }
    </div>
  );
};

export default FilmsList;