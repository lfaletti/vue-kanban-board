import auth0 from 'auth0-js';
import router from '../router';

export default class TokenAuth {

  
  auth0 = new auth0.WebAuth({
    domain: 'autenticame.auth0.com',
    clientID: 'x3WO9KCMH2Ffb8z0813IOkC9uehK6Qyp', 
    redirectUri: 'http://localhost:8080/callback',
    audience: 'https://todoapi', 
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        router.replace('/backlog');
      } else if (err) {
        router.replace('/welcome');
      }
    })
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  requireAuth(to, from, next) {    
    if (! (new TokenAuth).isAuthenticated()) {
      // next({
      //   path: '/login',
      //   query: { redirect: to.fullPath }
      // });
      new TokenAuth().login();
    } else {
      next();
    }
  } 

  homeNavigation(to, from, next) {
    if (! (new TokenAuth).isAuthenticated()) { 
      next ({
        path: '/welcome'
      })
    } else {
      next({
        path: '/backlog'
      });
    }
  }


  login() {
    this.auth0.authorize();
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the landing page route
    router.go('/welcome');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
