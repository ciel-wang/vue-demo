import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages'
import routesArr from './routes.json'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  }
]
const router = new VueRouter({
  routes
})

function handleRoute(data = []){
  data.forEach(v => {
    if(v.chidren && v.chidren.length){
      handleRoute(v.chidren)
    }else{
      router.addRoute({
        path:v.path,
        name:v.name,
        component:(resolve) => {
          require([`../views${v.url}.vue`], resolve)
        },
      })
    }
  })
}
handleRoute(routesArr)
 
export default router
