import { useEffect, useState } from 'react';

export const useCreateEvent = ({locations} : any) => {

  const initialState : any={
    name: '',
    description: '',
    background_image: '',
    locations: [],
    categories: [],
  }
  const [input, setInput] = useState(initialState);
  const [currentLocId, setCurrentLocId] = useState(''); // 
  const [currentDate, setCurrentDate] = useState({});
  const [locsAux, setLocsAux] : any = useState({});
  const [locsForSubmit, setLocsForSubmit] : any = useState([])

  useEffect(() => {
    if (locations) {
      let locObject : any= {};
      locations.forEach((loc: any) => locObject[loc.id]={dates:[]})
      setLocsAux(locObject);
    }
  },[locations])


  const isAlreadyAdded = (id: number) => {
    return locsAux[id]?.dates?.length > 0;
  }

  const resetState : any = () => {
    setInput(initialState);
  }

	const handleInputChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
    console.log(input)
    console.log(locsAux)
    console.log(locsForSubmit)
		setInput({ ...input, [target.name]: target.value });
	};

	const handleLocationChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentLocId(target.value);
	};

	const handleCategoryChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
    console.log(target.checked)
    if (target.checked){
      setInput({
        ...input,
        categories: [...input.categories, parseInt(target.value)],
      });
    }else{
      setInput({
        ...input,
        categories: input.categories.filter((c: number) => c!==parseInt(target.value))
      })
    }
	};

	const handleInputDateChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
    if (target?.name === 'price'){
      setCurrentDate({...currentDate, price: parseInt(target?.value)})
    }else setCurrentDate({...currentDate, date: target?.value})
    console.log(currentDate)
	};

  const handleAddDate = (e : any) => {
    e.preventDefault();
    if (locsAux[currentLocId]) {
      setLocsAux((prevState: any) =>{
        const dates = [...prevState[currentLocId].dates];
        dates.push(currentDate)
        return {...prevState, [currentLocId]:{dates}}
      })
      console.log('guardado')
      setCurrentDate({});
    }
  }

  const handleConfirm = (e : any) => {
    e.preventDefault();
    const locs = Object.entries(locsAux)
    console.log(locs)
    let loadedLocs = locs.filter((loc: any) => loc[1].dates.length > 0).map((loc: any) => ({id: loc[0], dates: loc[1].dates}))
    setLocsForSubmit(loadedLocs)
    setCurrentLocId('')
  }

  const handleRemoveLoc = (e: any, id : any) => {
    e.preventDefault();
    setLocsAux((prevState: any) => ({...prevState, [id]:{...prevState[id],dates:[]}}))
    setLocsForSubmit((prevState: any) => prevState.filter((loc: any) => loc.id !== id))
  }

  const handleUpdadteFetch = (eventInfo : any) => {
    console.log(eventInfo)
    let mappedCategoriesIds = eventInfo?.categories?.map((c: any) => c.id)
    let mappedLocations = eventInfo?.locations?.map((loc: any) => ({
      id: loc.id,
      dates: loc.dates
    }))
    console.log(mappedLocations)
    setInput({
      name: eventInfo?.name || '',
      description: eventInfo?.description || '',
      background_image: eventInfo?.background_image || '',
      locations: mappedLocations || [],
      categories: mappedCategoriesIds || [],
    })
    mappedLocations.forEach((loc: any) => {
      setLocsAux((prevState: any) => ({...prevState, [loc.id]:{...prevState[loc.id],dates:loc.dates}}))
    })
    setLocsForSubmit(mappedLocations)
  }

	return [
		input,
    resetState,
		handleInputChange,
    handleInputDateChange,
    currentDate,
    currentLocId,
    locsAux,
    isAlreadyAdded,
    handleAddDate,
		handleCategoryChange,
		handleLocationChange,
    handleConfirm,
    locsForSubmit,
    handleRemoveLoc,
    handleUpdadteFetch
	];
};
