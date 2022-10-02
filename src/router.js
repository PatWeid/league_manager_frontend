import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const ManageLeague = () => import("./components/ManageLeague.vue")
const BoardUser = () => import("./components/BoardUser.vue")
const ManageTeam = () => import("./components/ManageTeam.vue")
const AddTeam = () => import("./components/AddTeam.vue")

// router.beforeEach((to, from, next) => {
//     const publicPages = ['/login', '/register', '/home'];
//     const authRequired = !publicPages.includes(to.path);
//     const loggedIn = localStorage.getItem('user');
//     // trying to access a restricted page + not logged in
//     // redirect to login page
//     if (authRequired && !loggedIn) {
//         next('/login');
//     } else {
//         next();
//     }
// });

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: "/profile",
        name: "profile",
        // lazy-loaded
        component: Profile,
    },
    {
        path: "/ManageLeague",
        name: "manageLeague",
        // lazy-loaded
        component: ManageLeague,
    },
    {
        path: "/user",
        name: "user",
        // lazy-loaded
        component: BoardUser,
    },
    {
        path: "/team",
        name: "team",
        // lazy-loaded
        component: ManageTeam,
    },
    {
        path: "/addTeam",
        name: "addTeam",
        // lazy-loaded
        component: AddTeam,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
