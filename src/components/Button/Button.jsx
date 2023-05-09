import { Component } from 'react'
import './styles.css'
import PropTypes from 'prop-types'

class Button extends Component {
    moreGallery = () => {
        this.props.handlePage()
    }
 render(){
    return(
        !this.props.didLoading &&
        <div className='containerButton'>
            <button disabled={this.props.didLoading} onClick={this.moreGallery} className="buttonLoadMore">Load More</button>
        </div>
    )
 }
}

Button.propTypes = {
    handlePage:PropTypes.func.isRequired,
    didLoading:PropTypes.bool.isRequired,
}

export default Button

