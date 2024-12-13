import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import './style.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from '@mui/material';

type CardProps = {
  name:string
  image:string
  id:string
  clickOnFavoriteBtn: ()=>void
}

const FilmCard = ({name, image, id, clickOnFavoriteBtn}:CardProps):JSX.Element => {

  const [isHovered, setIsHovered] = useState<boolean>(false)

  function onHover(){
    setIsHovered(true)
  }

  function notOnHover(){
    setIsHovered(false)
  }

    return (
      <div className="FilmCard"
        onMouseEnter={onHover}
        onMouseLeave={(notOnHover)}
        style={{backgroundImage: `url(${image})` }}
      >

        <div className={`FilmCard-favorite ${isHovered ? 'FilmCard-favorite__show' : 'FilmCard-favorite__hidden'}`}>
          <IconButton
            onClick={clickOnFavoriteBtn}
            style={{color:'#fff'}}
          >
            <FavoriteBorderIcon/>
          </IconButton>
        </div>

        <div className={ `FilmCard-extra ${isHovered ? 'FilmCard-extra__show' : 'FilmCard-extra__hidden'}` }>
          <p>
            {name}
          </p>

          <Link
            to={`/films/${id}`}
            className='FilmCard-link'
          >
            Подробнее
              <ArrowForwardIosIcon style={{ fontSize: 16 }}/>
          </Link>
        </div>

      </div>
    );
};

export default FilmCard;