import './styles.css'
import PropTypes from 'prop-types'

const ImageGalleryItem = ({photosArray,addHrefBigPhoto,toggleModal}) =>{
    
    const openModal = e =>{
        const href = e.target.getAttribute('href')
        toggleModal(true)
        addHrefBigPhoto(href)
    }
            return(
                photosArray && photosArray
            .map(photo =>
            <li onClick={openModal} key={photo.id} id={photo.id} className="gallery-item">    
                <img 
                src={photo.webformatURL} 
                alt={photo.tags} 
                href={photo.largeImageURL}
                className='gallery-photo'/>
            </li>
            ))
} 

ImageGalleryItem.propTypes = {
    photosArray: PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.number.isRequired,
            tags:PropTypes.string.isRequired,
            webformatURL:PropTypes.string.isRequired,
            largeImageURL:PropTypes.string.isRequired,
        })
    ),
    addHrefBigPhoto: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
}
export default ImageGalleryItem



