import { createWebHistory, createRouter } from "vue-router";
import Write from './components/Write.vue';
import Home from './components/Home.vue';
import Mailbox from './components/Mailbox.vue'


const routes = [
    {
        path: "/write",
        component: Write,
    },
    {
        path: "/mailbox",
        component: Mailbox,
    },
    {
        path: "/",
        component: Home,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;