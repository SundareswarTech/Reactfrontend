import './Documentation.css'

import piee from '../../assets/piee.png';

import excelimg from '../../assets/excel-img.PNG';

function Documentation(){
    return(
        <div>
            <div className="documentation-container">
                <div className="documentation-container-header">Instructions on how to create charts/tables</div>
                <div className="documentation-container-subheader">Read Carefully! You need to give data in correct form to generate the required objects and for their custom modification.</div>
                <div  className="documentation-contain">
                    <div>How to send data for BAR, LINE, PIE, DOUGHNUT, POLAR AREA charts? (Collection of Single Data Object)</div>
                    <div>Please send data in the following format : </div>
                    <div>{"{\"Jan\":65, \"Feb\":59, \"Mar\":80, \"Apr\":81, \"May\":56, \"Jun\":55, \"Jul\":40}"}</div>
                    <div><b>OUTPUT : </b></div>
                    <div><img src={piee} alt="image unavailable"></img></div>
                </div>
            </div>
            <div className="documentation-container">
                <div  className="documentation-contain">
                    <div>How to send data for TABLE or RADAR chart? (Collection Multiple of Data Objects)</div>
                    <div>Please send data in the following format : </div>
                    <div>{"\"results\": [{\"red\": 10,\"blue\": 20,\"green\": 30}, {\"red\": 20,\"blue\": 30,\"green\": 50	}]"}</div>
                    <div><b>OUTPUT : </b></div>
                    <div><img src={excelimg} className="excell-img" alt="image unavailable"></img></div>
                </div>
            </div>
            <div className="documentation-container">
                <div  className="documentation-contain">
                    <div>Sending custom colours</div>
                    <div>Please send your colours in an array in the Create Dashboard Form when you are creating  a new chart or whle editing.</div>
                    <div>For example,</div>
                    <div>red,green,blue</div>
                    <div>It will colour the elements in order of the colours so put the colours in the order you want your elements to be coloured</div>
                </div>
            </div>
            
            <div className="documentation-container">
                <div  className="documentation-contain">
                    <div>Sending GraphQL requests</div>
                    <div>Please send your GraphQL API and the query when you are creating  a new chart or whle editing.</div>
                    <div>These APIs should return data in the exact way like defined before.</div>
                </div>
            </div>

            <div className="documentation-container">
                <div  className="documentation-contain">
                    <div>Sending SOAP requests</div>
                    <div>Please send your SOAP API and the REQUEST BODY when you are creating  a new chart or whle editing.</div>
                    <div>These APIs should return data in the exact way like defined before.</div>
                </div>
            </div>

            <div className="documentation-container">
                <div  className="documentation-contain">
                    <div>If you have any queries, please feel free to write to us@</div>
                    <div>sundareswar.das@capgemini.com</div>
                </div>
            </div>
        </div>
    )
}

export default Documentation;