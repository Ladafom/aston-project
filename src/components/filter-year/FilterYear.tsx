import React, { useState, useMemo, ChangeEvent } from 'react'
import { TextField } from '@mui/material';
import { debounce } from '../../utils/debounce'
import './style.css'

type FilterYearType = {
  onYear: (year:string)=> void
  value: string
}

const FilterYear = ({onYear, value}:FilterYearType ) => {

  const [yearValue,setYearValue] = useState<string>(value)

  const debouncedOnYear = useMemo(
    () => debounce(onYear, 1000),
    [onYear],
  );

  function onChange(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setYearValue(e.target.value)
    debouncedOnYear(e.target.value)
  }

  return (
    <TextField
      label="Год"
      variant="outlined"
      value={yearValue}
      name='year'
      onChange={onChange}
      className='FilterYear'
    />
  );
};

export default FilterYear;