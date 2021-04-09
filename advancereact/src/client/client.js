import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    from,
    ApolloLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

import { setContext } from '@apollo/client/link/context';
import configuration from '../config/configuration';
import ErrorComponent from '../component/ErrorComponent';

const { graphql_url } = configuration;

const httpLink = new HttpLink({
    uri: graphql_url,
});
const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({
        headers: {
            authorization: '12345', // however you get your token
            ...headers,
        },
    }));
    return forward(operation);
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

const loggerLink = new ApolloLink((operation, forward) => {
    console.log(`GraphQL Request: ${operation.operationName}`);
    operation.setContext({ start: new Date() });
    return forward(operation).map((response) => {
        const responseTime = new Date() - operation.getContext().start;
        console.log(`GraphQL Response took: ${responseTime}`);
        return response;
    });
});

// const retryLink = new RetryLink({
//     delay: {
//         initial: 100,
//         max: 2000,
//         jitter: true,
//     },
//     attempts: {
//         max: 5,
//         retryIf,
//     },
// });

const links = from([
    loggerLink,
    //authLink(config),
    //retryLink,
    errorLink,
    //timeoutLink(config),
    httpLink,
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: links,
});

export default client;
