import Vue from 'vue';
import Router from 'vue-router';
import Backlog from '@/components/Backlog';
import KanbanBoard from '@/components/KanbanBoard';
import NotFound from '@/components/NotFound';
import Callback from '@/components/Callback';
import LandingPage from '@/components/LandingPage';
import TokenAuth from '../auth/tokenauth';

Vue.use(Router);

const auth = new TokenAuth();

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/backlog'
    },
    {
      path: '/welcome',
      component: LandingPage
    },
    {
      path: '/callback',
      component: Callback,     
    },
    {
      path: '/backlog',
      beforeEnter:  auth.requireAuth,
      component: Backlog,            
    },
    {
      path: '/board',
      component: KanbanBoard,
      beforeEnter: auth.requireAuth,      
    },
    {
      path: '/login',
      beforeEnter: auth.requireAuth,
    },
    {
      path: '*',
      component: NotFound,      
    },
  ],
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {         
          new TokenAuth().login();
      } else {          
            next()          
      }
  }else {
      next() 
  }
})

export default router