const Auth = {
  setSession: (authResult) => {
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('refresh_token', authResult.refresh_token);
    localStorage.setItem('expires_in', authResult.expires_in);
    localStorage.setItem('token_type', authResult.token_type);
  },
  logout: () => {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('token_type');
  },
  isAuthenticated: () => {
    const token = localStorage.getItem('access_token')
    return token ? true : false
  },
  getToken: () => {
    const token = localStorage.getItem('access_token')
    return token
  }
}


export default Auth;