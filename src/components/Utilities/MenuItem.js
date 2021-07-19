import {Link} from 'react-router-dom';

function MenuItem(props){
    return(
        <Link to={props.to} />
    )
}

export default MenuItem;