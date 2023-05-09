import {Component} from "react"
import PropTypes from 'prop-types'
import './styles.css'
import { FaSearch } from "react-icons/fa";
import { toast } from 'react-toastify';

class Searchbar extends Component {
    state = {
      currentValue:"",
      prevName:'',
    }
    
    searchBarValue = (e) => {
      e.preventDefault()

      if(this.state.currentValue.trim() === ""){
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

      if(this.state.currentValue.trim() === this.state.prevName){
        return toast.error(`Ви уже продивляєтесь ${this.state.currentValue}`, {
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
      
        this.props.onSubmit(this.state.currentValue)
        this.setState({
          currentValue:"",
          prevName:this.state.currentValue})
    } 
    
    currentValue = e => {
        this.setState({currentValue : e.currentTarget.value.toLowerCase().trim()})
    }

    render(){
    return(
        <header className="searchbar">
  <form onSubmit={this.searchBarValue} className="form">
  <button disabled={this.props.didLoading} type="submit" className="button">
      <FaSearch className='icon'/>
    </button>

    <input
      className="input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={this.state.currentValue}
      onChange={this.currentValue}
    /> 
  
  </form>
</header>
    )
}
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  didLoading: PropTypes.bool.isRequired,
}
export default Searchbar