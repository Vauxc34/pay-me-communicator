import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3004/users',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
 <ApolloProvider client={client}>
  <Router>
  <App/>
  </Router>
</ApolloProvider>    
</React.StrictMode>
  
);
 