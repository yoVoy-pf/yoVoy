
interface Props {
    name: string;
    image: string;
    location: string;
    place: string;
    date: string;
}

const Card = (props: Props) => {
    return (
        <div>
            <h4>{props.name}</h4>
            <img src={props.image} alt="img" width='250px' height='250px' />
            <h4>{props.location}</h4>
            <h4>{props.place}</h4>
            <h4>{props.date}</h4>
        </div>
    )   
}

export default Card