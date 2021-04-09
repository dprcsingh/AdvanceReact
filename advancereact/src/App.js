import { ApolloProvider, gql } from '@apollo/client';
import client from './client/client';
import Test from './modules/test';
import GlobalErrorBoundary from './component/ErrorBoundary';
function App() {
    return (
        <GlobalErrorBoundary>
            <ApolloProvider client={client}>
                <Test />
            </ApolloProvider>
        </GlobalErrorBoundary>
    );
}

export default App;
