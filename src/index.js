import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { UserProvider } from './UserProvider';

const client = new ApolloClient({
  uri: 'http://localhost:3004/users',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  <UserProvider>
 <ApolloProvider client={client}>
  <Router>
  <App/>
  </Router>
</ApolloProvider>    
</UserProvider>
</React.StrictMode>
  
);
 