import { MagnifyingGlass } from  'react-loader-spinner'
import './styles.css'

const Loader = () =>{
    return (
        <div className='loaderContainer'>
            <MagnifyingGlass 
                        visible={true}
                        width="calc(100%/7)"
                        height="calc(100%/7)"
                        ariaLabel="MagnifyingGlass-loading"
                        wrapperStyle={{}}
                        wrapperClass="MagnifyingGlass-wrapper"
                        glassColor = '#c0efff'
                        color = '#3d3d3d'
                        /> 
        </div>
    )
}

export default Loader