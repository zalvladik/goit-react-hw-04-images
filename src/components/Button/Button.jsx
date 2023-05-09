import './styles.css'
import PropTypes from 'prop-types'

const Button = ({didLoading,handlePage}) => {
    const moreGallery = () => {
        handlePage()
    }
 
    return(
        !didLoading &&
        <div className='containerButton'>
            <button disabled={didLoading} onClick={moreGallery} className="buttonLoadMore">Load More</button>
        </div>
    )
 
}

Button.propTypes = {
    handlePage:PropTypes.func.isRequired,
    didLoading:PropTypes.bool.isRequired,
}

export default Button

