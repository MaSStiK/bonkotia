import { useEffect } from "react"
import { Link } from "react-router-dom";
import ButtonProfile from "../ButtonProfile/ButtonProfile"
import { setPageTitle } from "../Global"
import AboutReviews from "./AboutReviews"
import imgBasePhoto from "../../assets/replace/photo-empty.png"

import "./AboutPage.css"
import "./AboutPage-phone.css"

export default function AboutPage() {
    useEffect(() => {setPageTitle("О нас")}, [])

    return (
        <article>
            <h4 className="page-title">h/about</h4>

            <section className="flex-col">
                <h1>«Бонкотия»</h1>
                <p className="text-light">Описание
                    <br />Описание
                    <br />Описание
                    <br />Описание
                    <br />Описание
                    <br />Описание
                </p>
            </section>

            <section className="flex-col">
                <h1>Наша группа в вк</h1>
                <ButtonProfile
                    src={imgBasePhoto}
                    text={"Бонкотия"}
                    onClick={() => window.open("https://vk.com/bonkotia", "_blank")}
                />
            </section>

            <section className="flex-col">
                <h2>По вопросам группы и беседы в вк</h2>
                <ButtonProfile
                    src={imgBasePhoto}
                    text={`${"заглушка"} ${"заглушка"}`}
                    onClick={() => window.open("https://vk.com/id1", "_blank")}
                />
                <ButtonProfile
                    src={imgBasePhoto}
                    text={`${"заглушка"} ${"заглушка"}`}
                    onClick={() => window.open("https://vk.com/id1", "_blank")}
                />
            </section>

            <section className="flex-col">
                <h2>По техническим вопросам сайта</h2>
                <ButtonProfile
                    src={imgBasePhoto}
                    text={`${"Мотя"} ${"Овчинников"}`}
                    onClick={() => window.open("https://vk.com/id291195777", "_blank")}
                />
                <Link className="about__link-support" to="/support/feedback">
                    <small className="text-gray link-image">Где оставить обратную связь (идеи или баги)</small>
                </Link>
            </section>

            <AboutReviews />
        </article>
    )
}
