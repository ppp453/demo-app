const routes = [
    {
        path:'/login',
        name:'login',
        component: () => import('@/pages/login')
    },
    {
        path:'/index',
        name:'index',
        component: () => import('@/pages/index'),
        children:[
            {
                path:'testData',
                name:'testData',
                component:() => import('@/pages/TestData')
            },
            {
                path:'workorder',
                name:'workorder',
                component:() => import('@/pages/WorkOrder')
            },
        ]
    },
    {
        path:'/',
        component: () => import('@/pages/index')
    },
];

export default routes;