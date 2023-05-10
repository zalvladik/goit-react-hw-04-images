import { useState } from "react"
import PropTypes from 'prop-types'
import './styles.css'
import { FaSearch } from "react-icons/fa";
import { toast } from 'react-toastify';

const Searchbar = ({onSubmit,didLoading}) => {
  const [currentValue, setCurrentValue] = useState('');
  const [prevValue, setPrevValue] = useState('')
    
    const searchBarValue = e => {
      e.preventDefault()

      if(currentValue.trim() === ""){
        return toast.error(`Будь ласка введіть слово для пошуку`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }

      if(currentValue.trim() === prevValue){
        return toast.error(`Ви уже продивляєтесь ${currentValue}`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
      
      onSubmit(currentValue);
        setPrevValue(currentValue)
        setCurrentValue('');
    } 

    const changeCurrentValue = e =>{
      setCurrentValue(e.currentTarget.value.toLowerCase().trim())
    }
    return(
        <header className="searchbar">
  <form onSubmit={searchBarValue} className="form">
  <button disabled={didLoading} type="submit" className="button">
      <FaSearch className='icon'/>
    </button>

    <input
      className="input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={currentValue}
      onChange={changeCurrentValue}
    /> 
  
  </form>
</header>
    )
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  didLoading: PropTypes.bool.isRequired,
}
export default Searchbar