import { Radar } from 'react-chartjs-2';

import { saveAs } from 'file-saver'; 
import save from '../../assets/floppy-disk.png';

import './Element.css';


import { CSVLink } from 'react-csv';

import excel from '../../assets/excel.png';



function RadarChart(props){
  
  let keys = []
  let value = []

  let a = []

    let values = []

    const obj = props.data;
  obj.map((ob)=>{
    keys = Object.keys(ob);
    value = Object.values(ob);

    
  let val = {}
    val["data"]=value;
    
    a.push(val)
  })

       
values = a;

var dashboarddataArr = []

var color=[
'rgba(255, 99, 132, 0.2)',
'rgba(54, 162, 235, 0.2)',
'rgba(255, 206, 86, 0.2)',
'rgba(75, 192, 192, 0.2)',
'rgba(153, 102, 255, 0.2)',
'rgba(255, 159, 64, 0.2)']

if(props.result.colour!==""){
  console.log(props.result.colour)
  const colourArray = props.result.colour.split(",");
  console.log(colourArray)
  color=colourArray;
}

if(values.length !== 0){
for (var i = 0 ; i < values.length; i++){
  
    var dashboarddata = { data:[""], backgroundColor:"" }
    dashboarddata.data=values[i].data
    dashboarddata.backgroundColor=color[i]   
    dashboarddataArr[i]=dashboarddata
    
  console.log(dashboarddataArr)
  }
}

                
               
//console.log(values);


const getCsvData = () => {
  const csvData = [];
  let i;
  csvData.push(keys);
  for (i = 0; i < values.length; i += 1) {
   csvData.push(values[i].data)
  }
  return csvData;
};

const saveCanvas=(()=>{
  //save to png
  const canvasSave = document.getElementById('stackD');
  canvasSave.toBlob(function (blob) {
      saveAs(blob, "element.png")
  })
})

    return(
      <div className="x">
        <button className="excel-bn">
                            <CSVLink filename="O4F.csv" data={getCsvData()}>
                              <img className="excel-img" src = {excel} alt="image unavailable"></img>
                            </CSVLink>
                        </button>
      <button className="bn" onClick={saveCanvas}><img src={save} alt="image unavailable"></img></button>
        <Radar 
        id="stackD"
        data={{        
          labels: keys,
          datasets: dashboarddataArr,
                
          borderWidth: 1
          
      }}
      height={400}
      width={600}
      options={{
        maintainAspectRatio : false
      }}
        />
        </div>
    )
}

export default RadarChart;