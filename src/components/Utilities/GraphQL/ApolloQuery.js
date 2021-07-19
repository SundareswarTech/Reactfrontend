
import {
    useQuery,
    gql
} from "@apollo/client";

import ChartSection from '../../ChartSection/ChartsSection';


function ExchangeRates(props) {


  
    const EXCHANGE_RATES = gql`
    ${props.query}
  `;
  
      const { error, data } = useQuery(EXCHANGE_RATES);
        
  
  if (error) 
  return <p>Error :(</p>;
      return <div><ChartSection data={data} result={props.result}/></div>
    }

  export default ExchangeRates;