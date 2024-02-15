import './bootstrap';
import '../css/app.css';

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { store } from './store'
import { Provider } from 'react-redux';

import IndexComponent from './Pages/Admin/IndexComponent';
import ArticleIndexComponent from './Pages/Admin/Articles/IndexComponent';
import FormComponent from './Pages/Admin/Articles/FormComponent';
import EditComponent from './Pages/Admin/Articles/EditComponent';
import RubricIndexComponent from './Pages/Admin/Rubrics/IndexComponent';
import TagIndexComponent from './Pages/Admin/Tags/IndexComponent';
import UserIndexComponent from './Pages/Admin/Users/IndexComponent';
import CreateComponent from './Pages/Admin/Users/CreateComponent';

import Aside from './Components/Aside'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(document.getElementById('root'));
        const AdminRoutes = () => (
            <Routes>
                <Route
                    path="/admin"
                    element={<IndexComponent />}
                />

                <Route
                    path="/admin/tags"
                    element={<TagIndexComponent />}
                />
                <Route
                    path="/admin/tags/edit/:tagId"
                    element={<TagIndexComponent />}
                />
                <Route
                    path="/admin/tags/create"
                    element={<TagIndexComponent />}
                />

                <Route
                    path="/admin/rubrics"
                    element={<RubricIndexComponent />}
                />
                <Route
                    path="/admin/rubrics/edit/:rubricId"
                    element={<RubricIndexComponent />}
                />
                <Route
                    path="/admin/rubrics/create"
                    element={<RubricIndexComponent />}
                />

                <Route
                    path="/admin/articles"
                    element={<ArticleIndexComponent/>}
                />
                <Route
                    path="/admin/articles/edit/:articleId"
                    element={<EditComponent />}
                />
                <Route
                    path="/admin/articles/create"
                    element={<FormComponent />}
                />

                <Route
                    path="/admin/users"
                    element={<UserIndexComponent />}
                />
                <Route
                    path="/admin/users/create"
                    element={<CreateComponent />}
                />
                <Route
                    path="/admin/users/edit/:userId"
                    element={<UserIndexComponent />}
                />
            </Routes>
        );

        root.render(
            <Provider store={store}>
                <BrowserRouter>
                    <Aside/>
                    <AdminRoutes/>
                </BrowserRouter>
            </Provider>
        );
      },
    progress: {
        color: '#4B5563',
    },
});
