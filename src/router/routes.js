
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', redirect: '/characters'},
      { path: '/characters', component: () => import('pages/Characters.vue') },
      { path: '/character', name: 'characterPage', component: () => import('pages/Character.vue') },
      { path: '/episode', name: 'episodePage', component: () => import('src/pages/Episode.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
