import React from 'react'
import { Link } from 'react-router-dom';

export default function Aside({tags})
{
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <a href="/" className="brand-link">Home</a>

                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src={window.location.protocol + "/dist/img/user2-160x160.jpg"} className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <Link to="/admin" className="d-block">
                                    Username
                                </Link>
                            </div>
                        </div>

                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className="nav-item">
                                    <Link to="/admin/tags" className="nav-link">
                                        <p>Tags</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/rubrics" className="nav-link">
                                        <p>Rubrics</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/articles" className="nav-link">
                                        <p>Articles</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/users" className="nav-link">
                                        <p>Users</p>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                </div>
        </aside>
    );
}
