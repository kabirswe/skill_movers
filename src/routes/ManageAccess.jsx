import React from 'react';
import { Route } from 'react-router';

export default function ManageAccess({path, component: Component, ...rest}) {
    
    return <Route path={path} {...rest} component={() => <Component />} />
}