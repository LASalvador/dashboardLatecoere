import Home from '../views/Home/Home'
import Programa from '../views/Programa/Programa'
import Slider from '../views/Slider/Slider'

export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/programa',
    component: Programa,
  },
  {
    path: '/programa/:id',
    component: Programa,
  },
  {
    path: '/slider',
    component: Slider,
  },
  {
    path: '*',
    redirect: '/',
  },
]
