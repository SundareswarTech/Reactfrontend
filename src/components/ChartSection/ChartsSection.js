import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';
import RadarChart from '../charts/RadarChart';
import PieChart from '../charts/PieChart';
import DoughnutChart from '../charts/Doughnut';
import PolarAreaChart from '../charts/PolarAreaChart';
import Table from '../Table/Table';


import './ChartSection.css';


function ChartsSection(props){

    


    return (
        <div>
            <div className="center-container">
                <div>
                    Title : {props.result.title}
                </div>
                <div>
                    Description : {props.result.description}
                </div>    
                <div className="div-container-canvas" style={{height:props.result.height}}>
                    {props.data!=="" && props.result.type==="Bar" && <BarChart data={props.data} result={props.result}/>}
                    {props.data!=="" && props.result.type==="Line" && <LineChart data={props.data} result={props.result}/>}
                    {props.data!=="" && props.result.type==="Radar" && <RadarChart data={props.data} result={props.result}/>}
                    {props.data!=="" && props.result.type==="Pie" && <PieChart data={props.data} result={props.result}/>}
                    {props.data!=="" && props.result.type==="Doughnut" && <DoughnutChart data={props.data} result={props.result}/>}
                    {props.data!=="" && props.result.type==="Polar Area" && <PolarAreaChart data={props.data} result={props.result}/>}
                    {props.data!=="" && props.result.type==="Polar Area" && <PolarAreaChart data={props.data} result={props.result}/>}
                    {props.data!=="" && props.result.type==="Table" && <Table data={props.data} result={props.result}/>}
                </div>
            </div>
        </div>
    )
}

export default ChartsSection;