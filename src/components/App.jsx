import {Component} from "react"
import components from './Components'
import './styles.css'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
const {Searchbar,ImageGallery,ImageGalleryItem,Loader,Button,Modal} = components


class App extends Component{
  state = {
    searchValue:"",
    photosArray:[],
    didLoading:false,
    hrefBigPhoto:'',
    currentPage: 1,
    showModal:true,
   }

  componentDidUpdate(prevProps, prevState) {
  if(prevState.searchValue !== this.state.searchValue ||
     prevState.currentPage !== this.state.currentPage ){
    this.setState({didLoading:true})

        const API_KEY = '35063138-0f7111e05497fae6e002d2e8a'
        const MAIN_URL = 'https://pixabay.com/api/'
    return setTimeout(() =>{
      fetch(`${MAIN_URL}?q=${this.state.searchValue}&page=${this.state.currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
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
          this.setState( prevState =>({
            photosArray:[...prevState.photosArray, ...result.hits],
          }))
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({didLoading:false})
        })
    },1000)
    }
  }

  onSubmit = (searchValue) => {
    this.setState({
      searchValue:searchValue,
      currentPage:1,
      photosArray:[],
    })

    this.loadingToggle(true)
  }
  
  handlePage = () => {
    this.setState({currentPage:this.state.currentPage+1})
  }

  loadingToggle = (bool) =>{
    this.setState({didLoading:bool})
  }
  
  addHrefBigPhoto = (hrefBigPhoto) =>{
    this.setState({hrefBigPhoto})
  }
  
  toggleModal = () =>{
    this.setState({showModal: !this.state.showModal,}) 
    
  }

  render(){
  const {searchValue,photosArray,didLoading,hrefBigPhoto,showModal} = this.state
    return(
      <div className='container'>
      <Searchbar
      onSubmit = {this.onSubmit}
      didLoading = {didLoading}
      /> 
      
        {searchValue && 
        <ImageGallery>
            <ImageGalleryItem
            photosArray = {photosArray} 
            addHrefBigPhoto = {this.addHrefBigPhoto}
            toggleModal = {this.toggleModal}
            />
        </ImageGallery>}
      
      {didLoading && 
        <Loader/>}

      {photosArray.length > 0 && 
        <Button
        handlePage = {this.handlePage}
        didLoading = {didLoading}
      />}
      {!showModal && 
        <Modal
        hrefBigPhoto={hrefBigPhoto}
        toggleModal = {this.toggleModal}
      />}
      <ToastContainer/>
      </div>
    )
  }
}

export default App
