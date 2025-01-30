import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { DataContext } from "../Context"
import ButtonProfile from "../ButtonProfile/ButtonProfile"
import ButtonImage from "../ButtonImage/ButtonImage"
import Fullscreen from "../Fullscreen/Fullscreen"
import { CONFIG, timestampToDate } from "../Global";
import PostShare from "./PostShare"
import imgShare from "../../assets/svg/Share.svg"
import imgEdit from "../../assets/svg/Edit.svg"
import imgArrowLeft from "../../assets/svg/Arrow-left.svg"
import imgArrowRight from "../../assets/svg/Arrow-right.svg"


export default function PostRender({
    post,
    postAuthor,
    noSection
}) {
    const Context = useContext(DataContext) // Контекст нужен только что бы его передать в модальное окно
    const Navigate = useNavigate()

    // Функция открывающая модальное окно с возможными вариантами как поделиться постом
    function handlePostShare() {
        PostShare(
            Context, // Передаем контекст что бы можно было закрыть модальное окно
            post.id,
            post.title,
            post.attach.length ? post.attach[0] : postAuthor.photo
        )
    }

    const [attachCounter, setAttachCounter] = useState(1) // Счетчик картинок в посте
    const [attachWidth, setAttachWidth] = useState(0) // Ширина картинки (Во всю ширину поста)
    const attachContainer = useRef()

    function resizeAttach() { // Установка ширины картинки
        setAttachWidth(attachContainer.current ? attachContainer.current.offsetWidth : 0)
    }
    window.addEventListener("resize", (resizeAttach)) // Обновляем ширину картинки при изменении ширины браузера
    useEffect(resizeAttach, [attachContainer]) // Устанавливаем ширину картинки как только контейнер с картинками доступен
    
    function sliderPrev() { // Предыдущий элемент
        // Если первый элемент - ставим последний
        setAttachCounter(attachCounter === 1 ? post.attach.length : attachCounter - 1)
    }

    function sliderNext() { // Следующий элемент
        // Если последний элемент - ставим первый
        setAttachCounter(attachCounter === post.attach.length ? 1 : attachCounter + 1)
    }

    function generatePost() {
        return (
            <>
                <div className="flex-row post__top">
                    <ButtonProfile
                        src={postAuthor.photo}
                        text={postAuthor.title}
                        subText={postAuthor.id}
                        className="tp"
                        noPadding
                        onClick={() => Navigate("/city/" + postAuthor.id)}
                    />
                    <div className="flex-col post__top-info">
                        <small className="text-gray">{post.date}</small>
                    </div>
                </div>
                {/* Заголовок поста */}
                <h3>{post.title}</h3>
    
                {/* Текст поста не обязателен */}
                {post.text && <p className="post__text text-light">{post.text}</p> }
    
                {/* Если картинок нету - не рендерим блок с ними */}
                {post.attach.length !== 0 &&
                    <>
                        {/* Если картинок много - блок с ограниченной высотой, иначе одна картинка которую растягивает на всю ширину */}
                        {post.attach.length !== 1
                            ? <>
                                <div className="post__attachments-wrapper" ref={attachContainer}>
                                    <div className="post__attachments-container" style={{left: `${-attachWidth * (attachCounter - 1)}px`}}>
                                        {post.attach.map((attach, index) => (
                                            <div className="post__attachment" key={index}>
                                                <Fullscreen>
                                                    <img src={attach} alt="post-attachment" draggable="false" style={{width: attachWidth}} />
                                                </Fullscreen>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex-row post__attachments-control">
                                    <ButtonImage
                                        src={imgArrowLeft}
                                        alt="image-prev"
                                        title="Предыдущая картинка"
                                        onClick={sliderPrev}
                                    />
                                    <p><span>{attachCounter}</span> из <span>{post.attach.length}</span></p>
                                    <ButtonImage
                                        src={imgArrowRight}
                                        alt="image-next"
                                        title="Следующая картинка"
                                        onClick={sliderNext}
                                    />
                                </div>
                              </> 
                            : <Fullscreen>
                                <img src={post.attach[0]} alt="post-attachment" className="post__attachment_single" draggable="false" />
                            </Fullscreen>
                        }
                    </>
                }

                {/* Кнопки под постом */}
                <div className="flex-row post__buttons">
                    <ButtonImage
                        src={imgShare}
                        alt="post-share"
                        text="Поделиться"
                        title="Поделиться постом"
                        phoneTextHide
                        onClick={handlePostShare}
                    />
                </div>
            </>
        )
    }

    if (!noSection) { // Рендер внутри section
        return (
            <section
                key={post.id}
                id={`post-${post.id}`}
                className="flex-col post"
            >
                {generatePost()}
            </section>
        )
    } else { // Если передаем noSection - рендер в обычном div (без bg и border)
        return (
            <div
                key={post.id}
                id={`post-${post.id}`} 
                className="flex-col post"
            >
                {generatePost()}
            </div>
        )
    }
}