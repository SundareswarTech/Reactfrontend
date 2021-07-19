import { Doughnut } from 'react-chartjs-2';

import { saveAs } from 'file-saver'; 
import save from '../../assets/floppy-disk.png';

import './Element.css';


import { CSVLink } from 'react-csv';

import excel from '../../assets/excel.png';


function DoughnutChart(props){

  let keys = []
  let values = []

  
  const obj = props.data;             
                keys = Object.keys(obj);
                values = Object.values(obj);
                              

                const getCsvData = () => {
                  const csvData = [];
                  let i;
                  csvData.push(keys);
                  csvData.push(values)
                  return csvData;
                };

                const saveCanvas=(()=>{
                  //save to png
                  const canvasSave = document.getElementById('stackD');
                  canvasSave.toBlob(function (blob) {
                      saveAs(blob, "element.png")
                  })
              })

              var color=[
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            
                if(props.result.colour!==""){
                  console.log(props.result.colour)
                  const colourArray = props.result.colour.split(",");
                  console.log(colourArray)
                  color=colourArray;
                }


    return(
      <div className="x">

<button className="excel-bn">
        <CSVLink filename="O4F.csv" data={getCsvData()}>
          <img className="excel-img" src={excel} alt="image unavailable"></img>
        </CSVLink>
      </button>
      
        <button className="bn" onClick={saveCanvas}><img src={save} alt="image unavailable"></img></button>
        <Doughnut 
        id="stackD"
        data={{        
          labels:keys,
          datasets: [{
            label: '# of Votes',
            data: values,
            backgroundColor: color,
          borderWidth: 1
          }]
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

export default DoughnutChart;