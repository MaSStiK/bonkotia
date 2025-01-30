import { useState, createContext } from "react";
import { getCookie } from "./Global";

// Создание контекста приложения
export const DataContext = createContext({})

// Устанавливаем стейты в приложении
export function CreateContext(Context) {
    // Передаем в контекст userData и его сеттер
    let userData
    try {
        userData = localStorage.UserData ? JSON.parse(localStorage.UserData) : null
    } catch {
        delete localStorage.UserData
        userData = null
    }

    const [ContextUserData, setContextUserData] = useState(userData);
    Context.UserData = ContextUserData
    Context.setUserData = setContextUserData

    // Получаем токен авторизации
    Context.AuthToken = getCookie("auth_token") ? getCookie("auth_token") : null


    // Настройки сайта
    let PageSettings
    try {
        PageSettings = localStorage.PageSettings ? JSON.parse(localStorage.PageSettings) : {}
    } catch {
        delete localStorage.PageSettings
        PageSettings = {}
    }

    const [ContextPageSettings, setContextPageSettings] = useState(PageSettings);
    Context.PageSettings = ContextPageSettings
    Context.setPageSettings = setContextPageSettings
    
    // Модальное окно
    const [Modal, setModal] = useState({});
    Context.Modal = Modal
    Context.setModal = setModal

    return Context
}