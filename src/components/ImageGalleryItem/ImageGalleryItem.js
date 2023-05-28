//import React from 'react';
import '../ImageGalleryItem/ImageGalleryItem.css'
const ImageGalleryItem = ({image, onImageClick}) => {

    return(<li className="ImageGalleryItem" >       
            <img 
            src={image.webformatURL} 
            alt={image.tags} 
            onClick={() => onImageClick(image.largeImageURL)}
            className='ImageGalleryItem-image'/>
          </li> );        
              }
ImageGalleryItem.defaultProps = {
                tags: '',
              };
              
export default ImageGalleryItem;

// return items.map(item => (     
//   <li className="ImageGalleryItem" key ={item.id}>
// <img src={item.webformatURL } 
// alt={item.tags} 
// onClick={()=>onImageClick(item.largeImageURL)}
// className='ImageGalleryItem-image'/>
// </li>         
// ))