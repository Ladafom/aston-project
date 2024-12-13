import React, { useEffect, useCallback } from 'react'
import { getRandomFilmsData, getFilsmByFilter, changeHistoryState } from '../store/films/slice';
import { getGenresData } from '../store/genres/slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import PageLayout from '../components/page-layout/PageLayout';
import FilmsList from '../components/film-card-list/FilmsList';
import Filter from '../containers/filter/Filter';
import Plug from '../components/plug/Plug';

const MainPage = ():JSX.Element => {

    const dispatch = useAppDispatch()

    const films = useAppSelector(state=>state.films)
    const genres = useAppSelector(state=>state.genres.data)

    const isParams = Boolean(films.params.genre || films.params.query || films.params.year)

    useEffect(()=>{
        if(isParams) {
            dispatch(changeHistoryState())
            if (!genres.length) {
                Promise.all([dispatch(getFilsmByFilter()),dispatch(getGenresData())])
            } else {
                dispatch(getFilsmByFilter())
            }
        } else {
            Promise.all([dispatch(getRandomFilmsData()),dispatch(getGenresData())])
        }
    },[films.params])

    const callbacks = {
        addToFavorite: useCallback((): void => {
            console.log('clicked on favorite btn')
        }, [films]),
    }

    return (
        <PageLayout>
            <Filter/>
            {
                films.status === 'loading' ?
                <Plug text='Загрузка'/>
                :
                <FilmsList films={films} clickOnFavoriteBtn={callbacks.addToFavorite}/>
            }
        </PageLayout>
    );
};

export default MainPage;