import Home from '../views/Home/Home'
import Programa from '../views/Programa/Programa'
import Slider from '../views/Slider/Slider'
import Sobre from '../views/Sobre/Sobre'

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
    path: '/slider',
    component: Slider,
  },
  {
    path: '/sobre',
    component: Sobre,
  },
  {
    path: '*',
    redirect: '/',
  },
]
