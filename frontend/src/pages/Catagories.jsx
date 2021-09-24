
const Catagories = (props) => {
  console.log(props)
  return (
    <div>Catagories + { props.match.params.name }</div>
    
   );
}
 
export default Catagories;