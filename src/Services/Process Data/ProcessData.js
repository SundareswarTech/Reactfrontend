
import Apollo from '../../../src/components/Utilities/GraphQL/Apollo';
import ProcessUserData from '../../components/Utilities/Own Data Process/ProcessUserData';

import RestProcessor from '../../components/Utilities/REST Process Data/RestProcessor';
import SoapProcessor from '../../components/Utilities/SOAP Process Data/SoapProcessor';

function ProcessData(props){
    return(
        <div>
            {props.data.source==="GraphQL" && <Apollo result={props.data} />}
            {props.data.source==="Own Data" && <ProcessUserData result={props.data} />}
            {props.data.source==="REST API" && <RestProcessor result={props.data} />}
            {props.data.source==="SOAP API" && <SoapProcessor result={props.data} />}
        </div>
    )
}

export default ProcessData;