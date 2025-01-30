import { useContext } from "react";
import { DataContext } from "../Context"
import PostRender from "./PostRender";
import CityList from "../CityList";

import "./Post.css"
import "./Post-phone.css"

export default function PostsRender({
    posts=[],
    noSection // Передаем параметр для рендера без секции ниже
}) {

    return (
        <>
            {posts.map((post) => {
                let city = CityList.find(city => city.id === post.city_id)

                return (
                    <PostRender
                        key={post.id}
                        post={post}
                        postAuthor={city}
                        noSection={noSection}
                    />   
                )
            })}
        </>
    )
}