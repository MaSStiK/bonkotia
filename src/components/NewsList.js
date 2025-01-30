const NewsList = [
    {
        id: "post_1", // Уникальный id новости
        city_id: "city_1", // id города в котором произошла новость
        title: "Заголовок новости", // Заголовок новости
        text: "Текст новости", // Текст новости (Можно оставить пустым)
        date: "27.01.2025 • 13:37", // Дата создания поста
        attach: [ // Массив картинок (Можно оставить пустым)
            "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY29xYml4Z2J6eTBzOW1vdHphMHB5ZDluMHd2cWk4Z2I5YnFoY2pzeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YQitE4YNQNahy/giphy.gif",
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