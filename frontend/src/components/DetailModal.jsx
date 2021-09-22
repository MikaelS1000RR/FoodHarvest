import React from "react";

function DetailModal ({closeModal}) {

  return (
    <div className="modalBackground" style={styles.container}>
      <div className="modalContainer" style={styles.secondContainer}>
        <button onClick={()=> closeModal(false)}>Close</button>
        <div className="title">
          <h4>Product details</h4>
          <div className="body">
            <p>jsankjasnkdj alksndlkn lklkkln</p>
           </div>
        </div>
      </div>
    </div>
  )
};

export default DetailModal;


const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'scroll'
  },
  secondContainer: {
    width: '500px',
    height: '500px',
    borderRadius: '12px',
    backgroundColor: 'grey',
    boxShadow: 'black',
    


  }
};