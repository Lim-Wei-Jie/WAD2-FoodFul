import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import LearnMore from '../views/LearnMore.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Inventory from '../views/Inventory.vue'
import Upload from '../views/Upload.vue'
import Edit from '../views/Edit.vue'
import Recipes from '../views/Recipes.vue'
import RecipeSteps from '../views/RecipeSteps.vue'

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: Welcome,
        props: true
    },
    {
        path: '/LearnMore' ,
        name: 'LearnMore' ,
        component: LearnMore,
        props: true
    },
    {
        path:'/Login',
        name: 'Login',
        component: Login,
        props: true
    },
    {
        path:'/Register',
        name: 'Register',
        component: Register,
        props: true
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
        props: true
    },
    {
        path: '/Inventory',
        name: 'Inventory',
        component: Inventory,
        props: true
    },
    {
        path: '/Upload',
        name: 'Upload',
        component: Upload,
        props: true
    },
    {
        path: '/Edit',
        name: 'Edit',
        component: Edit,
        props: true
    },
    {
        path: '/Recipes',
        name: 'Recipes',
        component: Recipes,
        props: true
    },
    {
        path: '/RecipeSteps',
        name: 'RecipeSteps',
        component: RecipeSteps,
        props: true,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = `${ process.env.VUE_APP_TITLE } - ${ to.name }`
    next()
})

export default router
