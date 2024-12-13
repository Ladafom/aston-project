import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface GenresState {
  data: any;
  status: 'idle' | 'loading' | 'failed';
}

export interface Options {
  method: string
  headers: Record<string, string>
}

const initialState: GenresState = {
  data: [],
  status: 'idle',
};

const genresUrl: string = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres'

const options: Options = {
  method: 'GET',
	headers: {
		'x-rapidapi-key': '09f082c195msh34c805ac40c57ccp1a08d2jsn649906a4295a',
		'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
	}
}

export const getGenresData = createAsyncThunk(
  'genres/getGenres',
  async () => {
    try {
      const response = await fetch(genresUrl, options)
      return response.json();
    } catch(error:any){
      return isRejectedWithValue(error.response)
    }
  }
)

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(getGenresData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getGenresData.fulfilled, (state, action) => {
        state.status = 'idle'
        state.data = action.payload.results
      })
      .addCase(getGenresData.rejected, (state) => {
        state.status = 'failed'
      })
  },
});

export const selectGenres = (state: RootState) => state.genres;

export default genresSlice.reducer;
