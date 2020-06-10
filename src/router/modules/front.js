import FrontLayout from '@/views/front'
const frontRouter = {
  path: '/',
  component: FrontLayout,
  hidden: true,
  redirect: 'noRedirect',
  children: [
    {
      path: '/',
      component: () => import('@/views/front/home'),
      name: 'Home'
    },
    {
      path: '/post/:id(\\d+)',
      component: () => import('@/views/front/post'),
      name: 'Post'
    }
  ]
}

export default frontRouter
