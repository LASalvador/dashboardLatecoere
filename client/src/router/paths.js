import Programa from '../views/Programa/Programa'
import Slider from '../views/Slider/Slider'

export default [
  {
    path: '/',
    component: Programa,
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
