import { useState } from 'react';

export const useCreateEvent = (inputs: any) => {
	const [input, setInput] = useState(inputs);

	const handleInputChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		console.log('asdasdasd', input);
		setInput({ ...input, [target.name]: target.value });
	};

	const handleLocationChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		setInput({ ...input, [target.name]: parseInt(target.value) });
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

	const [inputDate, setInputDate] = useState({
		price: 0,
		date: '',
	});

	const handleInputDateChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		console.log('asdasdasd', input);
		setInputDate({ ...inputDate, [target.name]: target.value });
	};

	return [
		input,
		handleInputChange,
		setInput,
		handleCategoryChange,
		handleLocationChange,
		inputDate,
		setInputDate,
		handleInputDateChange,
	];
};
