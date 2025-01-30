import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DataContext } from "../Context"
import ButtonImage from "../ButtonImage/ButtonImage"
import ButtonProfile from "../ButtonProfile/ButtonProfile"
import imgBasePhoto from "../../assets/replace/photo-empty.png"
import { VKAPI } from "../API"
import { setPageTitle } from "../Global"
import Fullscreen from "../Fullscreen/Fullscreen"
import imgEdit from "../../assets/svg/Edit.svg"
import imgLogout from "../../assets/svg/Logout.svg"
import imgCopy from "../../assets/svg/Copy.svg"
import imgUser from "../../assets/svg/User.svg"

import CityList from "../CityList"
import UserList from "../UserList"

import "./UserPage.css"
import "./UserPage-phone.css"


export default function UserPage() {
    useEffect(() => {setPageTitle("Участник")}, [])
    const Navigate = useNavigate()
    const URLparams = useParams()

    const [userNotFound, setUserNotFound] = useState(false);
    const [ShowCopyMessage, setShowCopyMessage] = useState(false);
    
    const [UserData, setUserData] = useState({});
    const [CityData, setCityData] = useState({});

    function CopyTag() {
        navigator.clipboard.writeText(UserData.id)
        setShowCopyMessage(true)
        setTimeout(() => setShowCopyMessage(false), 2000)
    }

    // Когда загрузились все юзеры
    useEffect(() => {
        let user = UserList.find(user => user.id === URLparams.id)

        if (!user) {
            setUserNotFound(true)
            setPageTitle("Участник не найден")
            return
        }

        let city = CityList.find(city => city.id === user.city_id)

        setUserData(user)
        setCityData(city)
        setPageTitle(user.name)
    }, [URLparams.id])

    return (
        <article>
            <h4 className="page-title">{`h/user/${URLparams.id}`}</h4>

            {/* Если юзер найден */}
            {Object.keys(UserData).length
                ? <section className="flex-col">
                    <div className="user-profile__top">
                        <div className="user-profile__top-photo">
                            <Fullscreen>
                                <img src={UserData.photo ? UserData.photo : imgBasePhoto} alt="user-profile" draggable="false" />
                            </Fullscreen>
                        </div>
                        <div className="user-profile__top-name">
                            <h2>{UserData.name}</h2>
                            <div className="user-profile__top-tag flex-row" onClick={CopyTag}>
                                <img className="image-gray" src={imgCopy} alt="copy-tag" draggable="false" />
                                <p className="text-cut text-gray">{ShowCopyMessage ? "Скопировано" : UserData.id}</p>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="user-profile__row flex-row">
                        <p className="text-gray">ВКонтакте</p>
                        <ButtonProfile
                            className="tp"
                            src={UserData.photo}
                            text={UserData.name}
                            onClick={() => window.open(`https://vk.com/id${UserData.id}`, "_blank")}
                        />
                    </div>
                    
                    {/* Если есть город - отображаем */}
                    {CityData &&
                        <>
                            <hr />
                            <div className="user-profile__row flex-row">
                                <p className="text-gray">Город</p>
                                <ButtonProfile
                                    className="tp"
                                    src={CityData.photo}
                                    text={CityData.title}
                                    subText={CityData.id}
                                    onClick={() => Navigate(`/city/${CityData.id}`)}
                                />
                            </div>
                        </>
                    }

                    {/* Если есть описание - отображаем */}
                    {UserData.bio &&
                        <>
                            <hr />
                            <div className="flex-col">
                                <p className="text-gray">О себе</p>
                                <p className="textarea-block">{UserData.bio}</p>
                            </div>
                        </>
                    }
                </section>
                
                // Если пользователь не найден, будет показан только когда будет ошибка
                : <> 
                    {userNotFound &&
                        <section className="flex-col">
                            <h2>Участник не найден!</h2>
                            <ButtonImage
                                src={imgUser}
                                text="К списку участников"
                                title="Перейти к списку участников"
                                width100
                                onClick={() => Navigate("/user")}
                            />
                        </section>
                    }
                </>
            }
        </article>
    )
}
