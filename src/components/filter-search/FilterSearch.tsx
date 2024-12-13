import React, { useState, useMemo, ChangeEvent} from 'react'
import { TextField } from '@mui/material';
import { debounce } from '../../utils/debounce';
import './style.css'

type FilterSearchProps = {
  onSearch: (query:string)=>void
  value: string
}

const FilterSearch = ({onSearch, value}:FilterSearchProps) => {

  const [searchValue,setSearchValue] = useState<string>(value)

  const debouncedOnSearch = useMemo(
    () => debounce(onSearch, 1000),
    [onSearch],
  );

  function onChange(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setSearchValue(e.target.value)
    debouncedOnSearch(e.target.value)
  }

  return (
    <TextField
      label="Поиск"
      variant="outlined"
      value={searchValue}
      name='search'
      onChange={onChange}
      className='FilterSearch'
    />
  )
}

export default FilterSearch