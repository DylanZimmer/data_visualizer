import './App.css';
import AppRoutes from './AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { client } from './graphQL/ApolloClient';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
