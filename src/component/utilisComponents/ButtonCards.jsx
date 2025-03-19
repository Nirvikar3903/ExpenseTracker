import React from 'react'

const ButtonCards = ({image , buttonname , handleModalChange}) => {
  return (
    <button className='category-card ' onClick={handleModalChange}>
        {image ? <img src={image} alt="" /> : null}
        {buttonname}
    </button>
  )
}
ButtonCards.propTypes;
export default ButtonCards