const CategoryCards = ({
  icon ,
  buttonname ,
  handleCategoryChange , 
  activeButton ,
  index,
}) => {
  return (
    <>
      <button className={`category-btn  flex p-2.5 px-5 mt-8 gap-5 bg-gray-100 rounded-full cursor-pointer
       ${activeButton === index ? "active":""}`}
      onClick={()=>{handleCategoryChange(buttonname,index)}} > 
      {icon}
      {buttonname}
      
      </button>
    </>
  )
}

export default CategoryCards