import React, { useCallback } from 'react'
import FilterYear from '../../components/filter-year/FilterYear';
import FilterGenre from '../../components/filter-genre/FilterGenre';
import FilterSearch from '../../components/filter-search/FilterSearch';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setParamsGenre, setParamsQuery, setParamsYear } from '../../store/films/slice';
import './style.css'

const Filter = () => {

  const filmsParams = useAppSelector(state=>state.films.params)
  const genres = useAppSelector(state=>state.genres.data)

  const dispatch = useAppDispatch()

  const callbacks = {
    onSearch: useCallback((query:string):void=> {
        dispatch(setParamsQuery(query))
    },[filmsParams]),
    onYear: useCallback((year:string):void=> {
        dispatch(setParamsYear(year))
    },[filmsParams]),
    onGenre: useCallback((genre:string):void=> {
        dispatch(setParamsGenre(genre))
    },[filmsParams]),
}

  return (
    <div className='Filter'>
      <FilterSearch onSearch={callbacks.onSearch} value={filmsParams.query || ''}/>
      <FilterGenre genresList={genres} onGenre={callbacks.onGenre} value={filmsParams.genre || ''}/>
      <FilterYear onYear={callbacks.onYear} value={filmsParams.year || ''}/>
  </div>
  );
};

export default Filter;