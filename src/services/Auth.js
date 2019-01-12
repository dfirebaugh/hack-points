const Auth = {
  setSession: (authResult) => {
    localStorage.setItem('token', authResult.token);
    // localStorage.setItem('refresh_token', authResult.refresh_token);
    // localStorage.setItem('expires_in', authResult.expires_in);
    // localStorage.setItem('token_type', authResult.token_type);
  },
  logout: () => {
    localStorage.removeItem('token');
    // localStorage.removeItem('refresh_token');
    // localStorage.removeItem('expires_in');
    // localStorage.removeItem('token_type');
  },
  isAuthenticated: () => {
    const token = localStorage.getItem('token')
    return token ? true : false
  },
  getToken: () => {
    const token = localStorage.getItem('token')
    return token
  }
}


export default Auth;