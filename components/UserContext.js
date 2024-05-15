import React, { createContext, useContext, useState } from 'react';


export const UserContext = createContext({userCredentials:{}, setUserCredentials: ()=>{}});