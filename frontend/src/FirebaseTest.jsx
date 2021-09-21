import {db} from './database/firebase'



const FirebaseTest = () => {

  db.collection('test-products').get().then((snapshot) => {
    console.log(snapshot.docs)
  })

    return (
      <div>Firebase Test</div>
    );
  }
   
  export default FirebaseTest;