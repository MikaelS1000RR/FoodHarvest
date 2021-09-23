import React from "react";

function DetailModal({ closeModal }) {
  
  return (
    <div className="modalBackground" style={styles.container}>
      <div className="modalContainer" style={styles.secondContainer}>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => closeModal(false)}
        ></button>
        <div className="title">
          <h4>Product details</h4>
          <div className="body">
            <p>jsankjasnkdj alksndlkn lklkkln</p>
          </div>
          <div>
            <footer>footer</footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;

const styles = {
  container: {
    position: "fixed",
    zIndex: "999999",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  secondContainer: {
    width: "50rem",
    height: "50rem",
    borderRadius: "12px",
    background: "white",
    boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.25)",
    padding: "25px",
    maxWidth: "calc(100vw - 2rem)",
    maxHeight: "calc(100vh - 2rem)",
    overflowY: "auto",
    position: "relative",
  }
};
