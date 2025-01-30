import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ButtonImage from "../ButtonImage/ButtonImage"
import { setPageTitle } from "../Global"

import imgInfo from "../../assets/svg/Info.svg"
import imgHelp from "../../assets/svg/Help.svg"

import "./SupportPage.css"

export default function SupportPage() {
    useEffect(() => {setPageTitle("Помощь")}, [])
    const Navigate = useNavigate()

    return (
        <article>
            <h4 className="page-title">h/support</h4>

            <section className="flex-col">
                <h1>Статьи для решения проблем и вопросов</h1>
                <ButtonImage
                    src={imgHelp}
                    text="Где оставить обратную связь (идеи или баги)"
                    title="Где оставить обратную связь (идеи или баги)"
                    width100
                    atStart
                    onClick={() => Navigate("feedback")}
                />
            </section>
        </article>
    )
}