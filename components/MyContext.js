import React from 'react';

const MyContext = React.createContext({
  myParam: 'default value', // Initial value
});

export default MyContext;