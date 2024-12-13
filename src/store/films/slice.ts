import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { RootState } from '../store'

export interface FilmsState {
  data: any,
  params: ValidParams,
  status: 'idle' | 'loading' | 'failed'
}

export interface Options {
  method: string
  headers: Record<string, string>
}

interface ValidParams {
  query?: string
  genre?: string,
  year?: string,
}

const urlParams = new URLSearchParams(window.location.search)

const initialState: FilmsState = {
  data: {},
  params:{
    query: urlParams.get('query') || '',
    genre: urlParams.get('genre') || '',
    year: urlParams.get('year') || '',
  },
  status: 'idle',
};

const randomFilmsUrl: string = 'https://moviesdatabase.p.rapidapi.com/titles/random?list=most_pop_series'
const filmsParamsUrl: string = 'https://moviesdatabase.p.rapidapi.com/titles/search/title'
const filmsParamsNoTitleUrl: string = 'https://moviesdatabase.p.rapidapi.com/titles'

const options: Options = {
  method: 'GET',
	headers: {
		'x-rapidapi-key': '09f082c195msh34c805ac40c57ccp1a08d2jsn649906a4295a',
		'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
	}
}

export const getRandomFilmsData = createAsyncThunk(
  'films/getFilms',
  async () => {
    try {
      window.history.replaceState({}, '', window.location.origin);
      const response = await fetch(randomFilmsUrl, options)
      return response.json();
    } catch(error:any){
      return isRejectedWithValue(error.response)
    }
  }
)

export const getFilsmByFilter = createAsyncThunk(
  'films/getFilmsByFilter',

  async () => {
    try {
      console.log(urlParams.get('genre'))
      if(!urlParams.has('query')){
        const response = await fetch(filmsParamsNoTitleUrl + '?' + urlParams, options)
        return response.json()
      } else {
        const response = await fetch(filmsParamsUrl + '/' +`${urlParams.get('query')}` +`${urlParams.has('genre') ? `&genre=${urlParams.get('genre')}` : ''}` + `${urlParams.has('year') ? `&year=${urlParams.get('year')}` : ''}` , options)
        return response.json()
      }
    } catch(error:any){
      return isRejectedWithValue(error.response)
    }
  }
)

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    clearFilmsData(state){
      state.data = {}
    },
    setParamsQuery(state, action){
      state.params.query = action.payload
    },
    setParamsYear(state, action){
      state.params.year = action.payload
    },
    setParamsGenre(state,action){
      state.params.genre = action.payload
    },
    changeHistoryState(state){

      state.params.query ? urlParams.set('query',state.params.query) : urlParams.delete('query')
      state.params.genre ? urlParams.set('genre',state.params.genre) : urlParams.delete('genre')
      state.params.year ? urlParams.set('year',state.params.year) : urlParams.delete('year')

      const url: string = window.location.origin + '?' + urlParams
      window.history.replaceState({}, '', url);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRandomFilmsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRandomFilmsData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(getRandomFilmsData.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(getFilsmByFilter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFilsmByFilter.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(getFilsmByFilter.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectFilms = (state: RootState) => state.films;
export const { clearFilmsData, setParamsQuery, setParamsYear, setParamsGenre, changeHistoryState } = filmsSlice.actions;

export default filmsSlice.reducer;
