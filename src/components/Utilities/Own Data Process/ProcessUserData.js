import ChartSection from '../../ChartSection/ChartsSection';


function ProcessUserData(props){
    
    const parsedData = JSON.parse(props.result.data);
    
    
    return(
        <div><ChartSection data={parsedData} result={props.result}/></div>
    )
}

export default ProcessUserData;