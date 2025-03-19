const CategoryCards = ({
  icon ,
  buttonname ,
  handleCategoryChange , 
  activeButton ,
  index,
}) => {
  return (
    <>
      <button className={`category-btn ${activeButton === index ? "active":""}`}
      onClick={()=>{handleCategoryChange(buttonname,index)}} > 
      {icon}
      {buttonname}
      
      </button>
    </>
  )
}

export default CategoryCards