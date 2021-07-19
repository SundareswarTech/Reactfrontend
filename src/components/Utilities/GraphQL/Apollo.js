import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";

import ExchangeRates from './ApolloQuery';






function Apollo(props) {


    const client = new ApolloClient({
        uri: props.result.api,
        cache: new InMemoryCache()
    });

    
    return (
        <ApolloProvider client={client}>
            <ExchangeRates query={props.result.query} result={props.result}/>
        </ApolloProvider>)
}

export default Apollo;