import Vue from 'vue';
import routes from './routes';
import VueRouter from 'vue-router';
import ViewUI from 'view-design';
Vue.use(ViewUI);

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode:'history'
});

router.beforeEach((to,from,next)=>{
    ViewUI.LoadingBar.start();
    if (to.path === '/login') {
        next();
    } else {
        if (localStorage.getItem('token')) {
            next();
        } else {
            next('/login');
        }
    }
});

router.afterEach(route => {
    ViewUI.LoadingBar.finish();
});

//解决重复点击路由报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;