import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import SharePage from '@/components/SharePage.vue';
import ResourcesPage from '@/components/ResourcesPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/share', name: 'Share', component: SharePage },
  { path: '/resources', name: 'Resources', component: ResourcesPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;