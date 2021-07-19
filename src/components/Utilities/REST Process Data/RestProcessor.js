import axios from "axios";


import { useEffect, useState } from "react";

import ChartSection from '../../ChartSection/ChartsSection';

function RestProcessor(props) {


    const [output, setOutput] = useState([])


    useEffect(() => {
        if (props.result.type === "Radar" || props.result.type === "Table") {
            axios.get(props.result.api)
                .then(res => {
                    setOutput(res.data.results)
                })
        }
        else{
            axios.get(props.result.api)
                .then(res => {
                    setOutput(res.data)
                })
        }
    }, [])

    return (
        <div><ChartSection data={output} result={props.result}/></div>
    )
}

export default RestProcessor;