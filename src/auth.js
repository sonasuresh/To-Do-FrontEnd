
export const isAdminAuthenticated = () => {
    if ((localStorage.getItem('token') !== null) && (localStorage.getItem('role') === 'ADMIN')) {
        return true;
    } else {
        return false;
    }
}

export const isUserAuthenticated = () => {
    if ((localStorage.getItem('token') !== null) && (localStorage.getItem('role') === 'USER')) {
        return true;
    } else {
        return false;
    }
}

