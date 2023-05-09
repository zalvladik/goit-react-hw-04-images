import { Component } from "react"
import PropTypes from 'prop-types'
import './styles.css'

class Modal extends Component{

    componentDidMount(){
        window.addEventListener('keydown',this.handleKeyDown)
      }
    
    componentWillUnmount(){
        window.removeEventListener('keydown',this.handleKeyDown)
    }
    
    closeModalFunc = e => {
        if(e.currentTarget === e.target){
            this.props.toggleModal()
        }
    }
    
    handleKeyDown = (e) => {
        console.log('Escape')
        if(e.code === 'Escape'){
            this.props.toggleModal()
        }
    }
    render(){
        return(
            <div onClick={this.closeModalFunc} className ="overlay">
                <div className ="modal">
                    <img src={this.props.hrefBigPhoto} alt="" className='modalPhoto' />
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    hrefBigPhoto: PropTypes.string.isRequired,
    toggleModal:PropTypes.func.isRequired,
}

export default Modal