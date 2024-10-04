import React from 'react';
import { Navigate } from 'react-router';
import Constants from './Constants';

export default function Authentication() {
    return <Navigate path={Constants.LOGIN_LINK} to={Constants.LOGIN_LINK} />
}

