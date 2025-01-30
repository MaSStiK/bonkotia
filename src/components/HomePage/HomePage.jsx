import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import PostsRender from "../PostsRender/PostsRender"
import PostPreview from "../PostPreview/PostPreview"
import { setPageTitle } from "../Global"
import ButtonImage from "../ButtonImage/ButtonImage"

import imgNews from "../../assets/svg/News.svg"
import imgHomeAA from "../../assets/home/Home-Ace_Attorney.png"
import imgThumbnail from "../../assets/home/video-thumbnail.png"
import imgVk from "../../assets/vk.svg"
import imgYoutube from "../../assets/youtube.svg"

import imgUpdate from "../../assets/svg/Update.svg"
import ChangelogsRender from "../ChangelogsPage/ChangelogsRender"
import changelogs from "../ChangelogsPage/Changelogs"

import NewsList from "../NewsList"

import "./HomePage.css"
import "./HomePage-phone.css"

export default function HomePage() {
    useEffect(() => {setPageTitle("Главная")}, [])
    const Navigate = useNavigate()

    const [Post, setPosts] = useState([]);

    useEffect(() => {
        // Перем последнюю новость
        setPosts([NewsList.at(-1)])
    }, []);

    return (
        <article>
            <h4 className="page-title">h/home</h4>

            <img className="home__image-AA" src={imgHomeAA} alt="Home-Ace_Attorney" draggable="false" />

            <section className="flex-col">
                <h1>Последние новости</h1>
                <PostsRender
                    posts={Post}
                    noSection
                />
                
                <ButtonImage
                    src={imgNews}
                    text="Читать новости"
                    title="Открыть страницу новостей"
                    width100
                    onClick={() => Navigate("/news")}
                />
            </section>

            <section className="flex-col">
                <ChangelogsRender
                    changelogs={[...changelogs].slice(0, 1)}
                    noSection
                />

                <ButtonImage
                    src={imgUpdate}
                    text="Все обновления"
                    title="Открыть страницу обновлений"
                    width100
                    onClick={() => Navigate("/changelogs")}
                />
            </section>
        </article>
    )
}
