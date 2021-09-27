import firestore from "../../database_config/firestore";
import { useState } from "react";
import {useAuth} from "../../contexts/AuthContext"

const FavoriteButton = (props) => {
  const { styles, productId, isFavorite } = props
  const [isToggle, setIsToggle] = useState(isFavorite || false);
  const { currentUser } = useAuth();

  const [productLists, setProductLists] = useState(null);

  const toggle = (productId) => {
    setIsToggle(!isToggle);
    console.log(currentUser.uid);
    getUserProductLists();
    //addProductToCurrentList();
  }

  const getUserProductLists = () => {
    const allproductLists = [];
    if(currentUser.uid !== null){
      const productListsRef = firestore.collection('product-lists');
      productListsRef.where("uid", "==", currentUser.uid).get().then((snapshot)=>{
       
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }  
        snapshot.forEach(doc => {
          allproductLists.push(doc.data());
          setProductLists(allproductLists);
          console.log(doc.id, '=>', doc.data());
        });
      })
    }
  
  };
  
  if(productLists !== null){
    console.log("productLists: ", productLists[0].uid)
    //addProductToCurrentList 
    

    
  }

  



  return (
    <div className="favorite-button" style={styles.container}>
      <div className="btn btn-light" style={styles.icon} onClick={() => toggle(productId)}>
        <span className="material-icons">
          {isToggle ? 'favorite' : 'favorite_border'}
        </span>
      </div>
    </div>
  );
}
 
export default FavoriteButton;