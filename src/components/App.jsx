import {useState, useEffect} from "react"
import components from './Components'
import './styles.css'
import { ToastContainer,toast } from 'react-toastify';
const {Searchbar,ImageGallery,ImageGalleryItem,Loader,Button,Modal} = components

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [photosArray, setPhotosArray] = useState([]);
  const [didLoading, setDidLoading] = useState(false);
  const [hrefBigPhoto, setHrefBigPhoto] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect (() =>{
    if(searchValue === ''){
      return
    }
    setDidLoading(true)
          const API_KEY = '35063138-0f7111e05497fae6e002d2e8a'
          const MAIN_URL = 'https://pixabay.com/api/'
      setTimeout(() =>{
        fetch(`${MAIN_URL}?q=${searchValue}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => response.json())
          .then(result =>{
            if (!result.total){
              return toast.error('Нажаль по вашому запиту нічого не знайдено', {
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
            if (result.hits.length === 0){
              return toast.error('Нажаль більше фотографій нема :(', {
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
            setPhotosArray(prevState => [...prevState, ...result.hits])
          })
          .catch(error => console.log(error))
          .finally(() => {
            setDidLoading(false)
          })
        },1000)
    },[searchValue,currentPage])
    
  const onSubmit = (searchValue) => {
      setSearchValue(searchValue);
      setCurrentPage(1);
      setPhotosArray([]);
      setDidLoading(true)
  }

  const toggleModal = bool => {
    if( bool === true ){
      document.body.classList.add('bodyOverflow')
      window.addEventListener('keydown',handleKeyDown)
      setShowModal(true)
    }
    if( bool === false ){
      document.body.classList.remove('bodyOverflow')
      window.removeEventListener('keydown',handleKeyDown)
      setShowModal(false) 
    }
  }

  const handleKeyDown = e => {
    if(e.code === 'Escape'){
        toggleModal(false)
    }
  }

  return(
    <div className='container'>
      <Searchbar
      onSubmit = {onSubmit}
      didLoading = {didLoading}
      /> 
      
        {searchValue && 
        <ImageGallery>
            <ImageGalleryItem
            photosArray = {photosArray} 
            addHrefBigPhoto = {(hrefBigPhoto) => setHrefBigPhoto(hrefBigPhoto)}
            toggleModal = {toggleModal}
            />
        </ImageGallery>}
      
      {didLoading && 
        <Loader/>}

      {photosArray.length > 0 && 
        <Button
        handlePage = {() => {setCurrentPage(currentPage + 1)}}
        didLoading = {didLoading}
      />}
      {showModal && 
        <Modal
        hrefBigPhoto={hrefBigPhoto}
        toggleModal = {toggleModal}
        showModal = {showModal}
      />}
      <ToastContainer/>
      </div>
  )
}


export default App