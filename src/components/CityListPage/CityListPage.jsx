import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import CustomInput from "../CustomInput/CustomInput"
import ButtonImage from "../ButtonImage/ButtonImage"
import ButtonProfile from "../ButtonProfile/ButtonProfile"
import { setPageTitle, sortAlphabetically } from "../Global"
import imgListSearch from "../../assets/svg/ListSearch.svg"
import imgCross from "../../assets/svg/Cross.svg"
import DataCityList from "../CityList"

import "./CityListPage.css"

export default function CityListPage() {
    useEffect(() => {setPageTitle("Все страны")}, [])
    const Navigate = useNavigate()
    const searchRef = useRef()

    const [CityList, setCityList] = useState(DataCityList);

    useEffect(() => {
        // Берем изначальный массив, а не стейт
        setCityList(sortAlphabetically(DataCityList, "title"))
        searchCity()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    function searchCity() {
        // Берем изначальный массив, а не стейт
        let filteredCities = sortAlphabetically(DataCityList, "title")
        let search = searchRef.current.value.toLowerCase()
        if (search) {
            filteredCities = filteredCities.filter(
                // Если есть поисковая строка в названии страны или в теге или в id
                city => city.title.toLowerCase().includes(search)
                || city.id.toLowerCase().includes(search)
            )
        }
        setCityList(filteredCities)
    }

    return (
        <article>
            <h4 className="page-title">h/city</h4>

            <section className="flex-col">
                <h1>Список стран</h1>

                <div className="city-list__search flex-row">
                    <CustomInput label="Поиск страны" src={imgListSearch}>
                        <input
                            type="text"
                            ref={searchRef}
                            onInput={searchCity}
                            required
                        />
                    </CustomInput>

                    <ButtonImage
                        src={imgCross}
                        alt="clear-search"
                        text="Отмена"
                        title="Отменить поиск"
                        phoneTextHide
                        onClick={() => {
                            // Отчищаем поле и активируем поиск
                            searchRef.current.value = ""
                            searchCity()
                        }}
                        disabled={searchRef.current ? !searchRef.current.value : true}
                    />
                </div>

                {CityList.map((city) => (
                    <ButtonProfile
                        key={city.id}
                        src={city.photo}
                        text={city.title}
                        onClick={() => Navigate("/city/" + city.id)}
                    />
                ))}
            </section>
        </article>
    )
}
