import { useEffect, useContext, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DataContext } from "../Context"
import ButtonImage from "../ButtonImage/ButtonImage"
import ButtonProfile from "../ButtonProfile/ButtonProfile"
import { setPageTitle } from "../Global"
import Fullscreen from "../Fullscreen/Fullscreen"
import imgBasePhoto from "../../assets/replace/photo-empty.png"
import imgEdit from "../../assets/svg/Edit.svg"
import imgAdd from "../../assets/svg/Plus.svg"
import imgCopy from "../../assets/svg/Copy.svg"
import imgCountry from "../../assets/svg/Country.svg"

import CityList from "../CityList"
import UserList from "../UserList"

import "./CityPage.css"
import "./CityPage-phone.css"

export default function CityPage() {
    useEffect(() => {setPageTitle("Страна")}, [])
    const Context = useContext(DataContext)
    const Navigate = useNavigate()
    const URLparams = useParams()

    const [CityNotFound, setCityNotFound] = useState(false)
    const [ShowCopyMessage, setShowCopyMessage] = useState(false) // Сообщение о скопированном теге
    const [CityData, setCityData] = useState({}) // Найденная информация о стране (Внутри информации пользователя)
    const [UserData, setUserData] = useState({}) // Найденная информация о стране (Внутри информации пользователя)

    function CopyTag() {
        navigator.clipboard.writeText(CityData.id)
        setShowCopyMessage(true)
        setTimeout(() => setShowCopyMessage(false), 2000)
    }

    // Когда загрузились все юзеры
    useEffect(() => {
        let city = CityList.find(city => city.id === URLparams.id)
        if (!city) {
            setCityNotFound(true)
            setPageTitle("Город не найден")
            return
        }

        let user = UserList.find(user => user.id === city.user_id)

        setCityData(city)
        setUserData(user)
        setPageTitle(city.title)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [URLparams.id, Context.Users, Context.Posts])

    return (
        <article>
            <h4 className="page-title">{`h/city/${URLparams.id}`}</h4>

            {/* Если страна найдена */}
            {Object.keys(CityData).length
                ? <>
                    <section className="flex-col">
                        <div className="city-page__top">
                            <div className="city-page__top-photo">
                                <Fullscreen>
                                    <img src={CityData.photo ? CityData.photo : imgBasePhoto} alt="city-profile" draggable="false" />
                                </Fullscreen>
                            </div>
                            <div className="city-page__top-name">
                                <h2>{CityData.title}</h2>
                                <div className="city-page__top-tag flex-row" onClick={CopyTag}>
                                    <img className="image-gray" src={imgCopy} alt="copy-tag" draggable="false" />
                                    <p className="text-cut text-gray">{ShowCopyMessage ? "Скопировано" : CityData.id}</p>
                                </div>
                            </div>
                        </div>

                        <hr />
                        <div className="city-page__row flex-row">
                            <p className="text-gray">Основатель города</p>
                            <ButtonProfile
                                className="tp"
                                src={UserData.photo}
                                text={UserData.name}
                                subText={UserData.id}
                                onClick={() => Navigate(`/user/${CityData.user_id}`)}
                            />
                        </div>

                        {/* Если есть описание - отображаем */}
                        {CityData.bio &&
                            <>
                                <hr />
                                <div className="city-page__column">
                                    <p className="text-gray">Описание</p>
                                    <p className="textarea-block">{CityData.bio}</p>
                                </div>
                            </>
                        }
                    </section>
                  </>

                // Если страна не найдена, будет показан только когда будет ошибка
                : <>
                    {CityNotFound &&
                        <section className="city-page flex-col">
                            <h2>Страна не найдена!</h2>
                            <ButtonImage
                                src={imgCountry}
                                text="К списку стран"
                                title="Перейти к списку стран"
                                width100
                                onClick={() => Navigate("/city")}
                            />
                        </section>
                    }
                </>
            }
        </article>
    )
}
