import AddChartSect from "../../components/AddChartSect/AddChartSect";

import {useLocation} from 'react-router-dom';

function AddChartSection(){
    const location = useLocation();
    return(
        <AddChartSect dashboardname={location.state.dashboardname}/>
    )
}

export default AddChartSection;