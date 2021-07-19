import axios from "axios";


import { useEffect, useState } from "react";

import ChartSection from '../../ChartSection/ChartsSection';

function SoapProcessor(props){

const [output, setOutput] = useState([])

var XMLParser = require('react-xml-parser');

useEffect(() => {
    if (props.result.type === "Radar" || props.result.type === "Table") {
        axios.get(props.result.api)
            .then(res => {
                
                console.log(res.data)
                setOutput(res.data.results)
            })
    }
    else{
        axios.get(props.result.api)
            .then(res => {
                console.log(res.data)
                setOutput(res.data)
            })
    }
}, [])

var xml = new XMLParser().parseFromString(output);

return (
    <div><ChartSection data={xml} result={props.result}/></div>
)
}


export default SoapProcessor;