import { saveAs } from 'file-saver'; 
import save from '../../assets/floppy-disk.png';
import excel from '../../assets/excel.png';

import { CSVLink } from 'react-csv';

import './Table.css';


function Table(props){
  
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




const getCsvData = () => {
  const csvData = [];
  let i;
  csvData.push(keys);
  for (i = 0; i < values.length; i += 1) {
   csvData.push(values[i].data)
  }
  return csvData;
};

    return(
      <div className="x"  >
        <button className="excel-bn">
                            <CSVLink filename="O4F.csv" data={getCsvData()}>
                              <img className="excel-img" src = {excel} alt="image unavailable"></img>
                            </CSVLink>
                        </button>


      <table className="table-demo">
        <thead>
      {keys.map((key)=>{
        return <th>{key}</th>
      })}
      </thead>
      <tbody>
      {values.map((value)=>{
        return <tr>
          {value.data.map((val)=>{
            return <td>{val}</td>
          })}
        </tr>
      })}
      </tbody>
      </table>
        </div>
    )
}

export default Table;