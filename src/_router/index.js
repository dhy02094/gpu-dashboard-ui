import { createRouter, createWebHistory } from 'vue-router';
import GpuDashboard from '@/views/GpuDashboard.vue';

const routes = [

    {
        path: '/dashboard',
        name: 'GpuDashboard',
        component: GpuDashboard,
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

export default router;