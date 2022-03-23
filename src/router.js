import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList},
    { path: '/auth', component: UserAuth, meta: { requiredUnAuth: true }},
    {
      path: '/coaches/:id',
      props: true,
      component: CoachDetail,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    { path: '/register', component: CoachRegistration, meta: { requiredAuth: true }  },
    { path: '/requests', component: RequestsReceived, meta: { requiredAuth: true }},
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, _, next)=> {
  if(to.meta.requiredAuth && !store.getters.isAuthenticated){
    next('/auth');
  } else if(to.meta.requiredUnAuth && store.getters.isAuthenticated){
    next('/coaches');
  } else {
    next();
  }
});
export default router;
