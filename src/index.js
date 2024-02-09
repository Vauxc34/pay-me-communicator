import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { UserProvider } from './UserProvider';
import App from './App';

const link1 = new HttpLink({
  uri: 'http://localhost:3004/users/register',
});

const client1 = new ApolloClient({
  link: link1,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode> 
<ApolloProvider client={client1}>
  <UserProvider>
  <Router>
  <App/>
  </Router>
</UserProvider>
</ApolloProvider>
</React.StrictMode>
  
);
 