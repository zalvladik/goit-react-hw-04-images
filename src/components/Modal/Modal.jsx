import PropTypes from 'prop-types'
import './styles.css'

const Modal = ({toggleModal,hrefBigPhoto}) => {
    
    const closeModalFunc = e => {
        if(e.currentTarget === e.target){
            toggleModal(false)
        }
    }
    
        return(
            <div onClick={closeModalFunc} className ="overlay">
                <div className ="modal">
                    <img src={hrefBigPhoto} alt="" className='modalPhoto' />
                </div>
            </div>
        )
    }

Modal.propTypes = {
    hrefBigPhoto: PropTypes.string.isRequired,
    toggleModal:PropTypes.func.isRequired,
}

export default Modal