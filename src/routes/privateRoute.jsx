import Cookies from 'js-cookie';

import {Navigate} from 'react-router-dom';

export function PrivateRoute({children}) {
    console.log(Cookies.get('access_token'))
    const isSignedIn = Cookies.get('access_token')!=null
    return isSignedIn ? children : <Navigate to="/login" />
}