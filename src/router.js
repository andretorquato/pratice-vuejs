import { createRouter, createWebHistory } from 'vue-router';

import CoachesPage from './pages/CoachesPage.vue';
import CoachPage from './pages/CoachPage.vue';
import CoachContactPage from './pages/CoachContactPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import RequestsPage from './pages/RequestsPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesPage },
    {
      path: '/coaches/:id',
      component: CoachPage,
      children: [{ path: 'contact', component: CoachContactPage }],
    },
    { path: '/register', component: RegisterPage },
    { path: '/requests', component: RequestsPage },
    { path: '/:notFound(.*)', component: NotFoundPage },
  ],
});

export default router;
