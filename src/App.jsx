// Импорт основных библиотек
import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { DataContext, CreateContext } from "./components/Context"
import Modal from "./components/Modal/Modal"
import SetTheme from "./components/SetTheme";

// Импорт стилей
import "./styles/style.css";
import "./App.css";
import "./App-phone.css";

// Импорт навигации
import Aside from "./components/Aside/Aside"

// Импорт страниц
import Home from "./components/HomePage/HomePage";
import News from "./components/NewsPage/NewsPage";
import NewsPost from "./components/NewsPostPage/NewsPostPage";
import User from "./components/UserPage/UserPage";
import UserList from "./components/UserListPage/UserListPage";
import City from "./components/CityPage/CityPage";
import CityList from "./components/CityListPage/CityListPage";

import Support from "./components/SupportPage/SupportPage";
import SupportFeedback from "./components/SupportPage/SupportPage_Feedback";

import About from "./components/AboutPage/AboutPage";
import Settings from "./components/SettingsPage/SettingsPage";
import Changelogs from "./components/ChangelogsPage/ChangelogsPage";

import NotFound from "./components/NotFoundPage/NotFoundPage";


export default function App() {
    // Своя функция "CreateContext" которая вписывает useState в контекст
    const Context = CreateContext(useContext(DataContext)) // Помять приложения, устанавливаем при запуске

    // Если установлен стиль для сайта
    useEffect(() => {
        SetTheme(Context)
    }, [Context, Context.PageSettings])

    return (
        <>
            <Modal>
                {Context.Modal}
            </Modal>

            <Aside />

            <DataContext.Provider value={Context}>
                <Routes>
                    <Route path="/home" element={<Home />} />

                    <Route path="/news" element={<News />} />
                    <Route path="/news/:id" element={<NewsPost />} />

                    <Route path="/user" element={<UserList />} />
                    <Route path="/user/:id" element={<User />} />

                    <Route path="/city" element={<CityList />} />
                    <Route path="/city/:id" element={<City />} />

                    <Route path="/support" element={<Support />} />
                    <Route path="/support/feedback" element={<SupportFeedback />} />
                    
                    <Route path="/about" element={<About />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/changelogs" element={<Changelogs />} />


                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </DataContext.Provider>
        </>
    )
}