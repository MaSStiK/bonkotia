const NewsList = [
    {
        id: "post_1", // Уникальный id новости
        city_id: "city_1", // id города в котором произошла новость
        title: "Заголовок новости", // Заголовок новости
        text: "Текст новости", // Текст новости (Можно оставить пустым)
        date: "27.01.2025 • 13:37", // Дата создания поста
        attach: [ // Массив ссылок картинок (Можно оставить пустым)
            "https://cdn.tvspb.ru/storage/wp-content/uploads/2022/10/novosti-1.jpg__0_0x0.jpg",
        ]
    },
    {
        id: "post_2", // Уникальный id поста
        city_id: "city_2",
        title: "Заголовок новости 2",
        text: "Текст новости 2",
        date: "27.01.2025",
        attach: []
    },
]

export default NewsList