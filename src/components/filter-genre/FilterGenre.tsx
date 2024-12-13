import React, { useState } from 'react'
import { Select, FormControl, MenuItem, InputLabel, SelectChangeEvent } from '@mui/material';
import './style.css'

type FilterProps = {
  genresList: string[]
  onGenre: (genre:string) => void
  value: string
}

const FilterGenre = ({genresList, onGenre, value}:FilterProps) => {

  return (
    <FormControl
      className='FilterGenre'
    >
      <InputLabel id='genre-label'>Жанр</InputLabel>
      <Select
        label='Жанр'
        labelId='genre-label'
        name='genre'
        value={value === null ? 'No genre' : value}
        onChange={(e:SelectChangeEvent<string>)=>{onGenre(e.target.value)}}
      >
        {
          genresList?.map(genre=>(
            <MenuItem
              key={genre === null ? '' : genre}
              value={genre === null ? '' : genre}
            >
              {genre === null ? 'No genre' : genre}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

export default FilterGenre;