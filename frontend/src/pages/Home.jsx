import Search from "../components/search/Search";

const Home = () => {
    return (
      <div className="container" style={styles.container}>
        <Search />
      </div>
    );
};

export default Home;

const styles = {
  container: {
    minWidth: "100vw",
    background: "pink",
  },
};
