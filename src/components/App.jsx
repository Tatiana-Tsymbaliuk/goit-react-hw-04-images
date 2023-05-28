import {useState, useEffect} from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Button from './Button/Button';
import fetchFoto from '../api/api';
import Modal from '../components/Modal/Modal';
import Loader from './Loader/Loader';

export default function App(){
  const [nameSearch, setNameSearch] = useState('');
  const [fotos, setFotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [totalAmount, setTotalAmount] = useState('0');
  const [currentAmount, setCurrentAmount] = useState(0);
  const [error, setError] = useState(null);

const handleFormSubmit = nameSearch=>{
  setNameSearch(nameSearch);
    setFotos([]);
    setCurrentPage(1);
    setError(null);
    setTotalAmount('0');
    setCurrentAmount(0);
    setLoading(false);
    setShowModal(false);
    setLargeImage('');
}
    
  const getFoto = async () =>{         
    setLoading(true)
    try {
      const {hits, totalHits} = await fetchFoto(nameSearch, currentPage);
    setFotos(prevFotos => 
       [...prevFotos, ...hits])
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1
              ); 
    setTotalAmount(totalHits);
    setCurrentAmount(prevCurrentAmount =>prevCurrentAmount + hits.length)         
            } catch (error) {
              console.log('Smth wrong with App fetch', error);
              setError({error});
            }finally{
            setLoading(false)
            }}
            
            useEffect(() => {
              if (!nameSearch) return;
              getFoto();
              // eslint-disable-next-line
            }, [nameSearch]);

  const handleGalleryItem = (largeImageSrc) => {                
          setLargeImage(largeImageSrc);
          setShowModal(true);         
      };

  const toggleModal = () => {
      setShowModal(prevShowModal => !prevShowModal);
      setLargeImage('');
          };

        const needToShowLoadMore = fotos.length !== 0 && currentAmount !== totalAmount;
        return(
          <div> 
           <Searchbar onSubmit={handleFormSubmit}/>
           { loading && <Loader/> } 
           <ImageGallery fotos={fotos} onImageClick={handleGalleryItem}/>
           {showModal&& <Modal onClose ={toggleModal}>
           <img src={largeImage} alt="" />
           </Modal> }             
           { needToShowLoadMore ? (<Button onLoadFoto ={getFoto}/>) :<></>}
           {error && (<h2>Oops! 😫</h2>)}
          </div>       
          );
};

// import React from 'react';
// import Searchbar from '../components/Searchbar/Searchbar';
// import ImageGallery from '../components/ImageGallery/ImageGallery';
// import Button from './Button/Button';
// import fetchFoto from '../api/api';
// import Modal from './Modal/Modal';
// import Loader from './Loader/Loader';

// export class App extends React.Component{
//   state={
//   nameSearch:'',
//   fotos:[],
//   currentPage: 1,
//   loading: false,
//   error: null,
//   showModal: false,
//   largeImage: '',
//   totalAmount:'0',
//   currentAmount: 0,
//   }
// handleFormSubmit = nameSearch=>{
//   this.setState({
//     fotos:[],
//     nameSearch: nameSearch,
//     currentPage: 1,
//     error: null,
//     totalAmount:'0',
//     currentAmount: 0,
//   });
// }


//  componentDidUpdate(_, prevState){
//         const nameSearch =this.state.nameSearch
//         const prevName = prevState.nameSearch
//         if(prevName!==nameSearch){
//                 this.getFoto();     
//         }      
//       } 
//   getFoto = async () =>{         
//     const {nameSearch, currentPage } =this.state
//     this.setState({loading: true})
//     try {
//       const {hits, totalHits} = await fetchFoto(nameSearch, currentPage);
//       this.setState(prevState => ({
//         fotos: [...prevState.fotos, ...hits],
//         currentPage: prevState.currentPage + 1,
//               })); 
//       this.setState({totalAmount: totalHits});
//       this.setState(prevState =>({currentAmount:prevState.currentAmount + hits.length,}))         
//             } catch (error) {
//               this.setState({ error });
//             }finally{
//             this.setState({loading:false})
//             }}
//   handleGalleryItem = (largeImageSrc) => {   
//         this.setState({        
//           largeImage: largeImageSrc,
//           showModal: true,
//         });     
//       }; 
//   toggleModal = () => {
//             this.setState(prevState => ({
//               showModal: !prevState.showModal,
//               largeImage: '',
//             }));
//           };
//         render(){
//             const {fotos, loading, showModal, largeImage} = this.state;
//             const needToShowLoadMore = fotos.length !== 0 && this.state.currentAmount !== this.state.totalAmount
//         return(
//           <div> 
//             <Searchbar onSubmit={this.handleFormSubmit}/>
//              { loading && <Loader/> } 
//            <ImageGallery fotos={fotos} onImageClick={this.handleGalleryItem}/>
//            {showModal&& <Modal onClose ={this.toggleModal}>
//            <img src={largeImage} alt="" />
//            </Modal> }             
//            { needToShowLoadMore ? (<Button onLoadFoto ={this.getFoto}/>) :<></>}
//           </div>       
//           );
//         } 
// };
