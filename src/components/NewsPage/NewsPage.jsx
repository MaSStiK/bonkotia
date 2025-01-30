import { useEffect, useState } from "react"
import PostsRender from "../PostsRender/PostsRender"
import { CONFIG, setPageTitle } from "../Global"

import NewsList from "../NewsList";

import "./NewsPage.css"
import "./NewsPage-phone.css"

export default function NewsPage() {
    useEffect(() => {setPageTitle("Новости")}, [])

    return (
        <article>
            <h4 className="page-title">h/news</h4>

            <PostsRender
                posts={[...NewsList].reverse()}
            />
        </article>
    )
}