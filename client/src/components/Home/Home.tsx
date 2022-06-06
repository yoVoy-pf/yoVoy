import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvent } from "../../redux/actions/actions-Create";
import { AppDispatch, State } from "../../redux/store/store";
import Card from "../Card/Card";
import SearchBar from '../SearchBar/SearchBar'
import s from './home.module.css';

interface Event {
    name: string;
    image: string;
    location: string;
    place: string;
    date: string;
}

const Home = () => {
    
    const dispatch: AppDispatch = useDispatch();
    const allEvents = useSelector((state: State) => state.allEvents)

    useEffect(() => {
        dispatch(getAllEvent())
    }, [dispatch])

    return(
        <div>
            <SearchBar/>
            <div className={s.home}>
            {
                allEvents?.map((result: Event) => {
                    return (
                        <Card
                         name={result.name}
                         image={result.image}
                         location={result.location}
                         place={result.place}
                         date={result.date}
                        />
                    )
                })
            }
            </div>
        </div>
    )
}

export default Home