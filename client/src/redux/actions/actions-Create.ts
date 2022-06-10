import { ActionType } from './index';
import { Dispatch } from 'redux';
// import { Action } from "./action-Type";
import axios from 'axios';

// Ejemplo de como se puede realizar las acciones

export const getAllEvent = () => {
	return async function (dispatch: Dispatch) {
		try {
			const event = await axios.get('http://localhost:3001/api/events');
			dispatch({
				type: ActionType.GET_ALL_EVENT,
				payload: event.data,
			});
		} catch (error) {
			console.error('Error la acciones de allEvent');
		}
	};
};

export const getSearchEvent = (name: string | number) => {
	return async function (dispatch: Dispatch) {
		try {
			const searchEvent = await axios.get(
				`http://localhost:3001/api/events?search=${name}`,
			);
			dispatch({
				type: ActionType.SEARCH_EVENT,
				payload: searchEvent.data,
			});
		} catch (error) {
			console.error('Error la acciones de event');
		}
	};
};

export const getCategories = () => {
	return async function (dispatch: Dispatch) {
		try {
			const categories = await axios.get(
				`http://localhost:3001/api/categories`,
			);
			dispatch({
				type: ActionType.GET_CATEGORIES,
				payload: categories.data,
			});
		} catch ({ error }) {
			console.error('Error en getCategories');
		}
	};
};

export const getEventByCategory = (name: string) => {
	return async function (dispatch: Dispatch) {
		try {
			const getEventByCategory = await axios.get(
				`http://localhost:3001/api/events?category=${name}`,
			);
			dispatch({
				type: ActionType.GET_EVENT_BY_CATEGORY,
				payload: getEventByCategory.data,
			});
		} catch (error) {
			console.error('Error en getEventByCategory');
		}
	};
};

export const getEventId = (id: string | number) => {
	return async function (dispatch: Dispatch) {
		try {
			const eventId = await axios.get(`http://localhost:3001/api/event/${id}`);
			dispatch({
				type: ActionType.GET_EVENT_ID,
				payload: eventId.data,
			});
		} catch (error) {
			console.error('Error la acciones de eventId');
		}
	};
};

export const clearEventId = () => {
	return {
		type: ActionType.CLEAR_EVENT_ID,
	};
};

export const getCities = () => {
	return async function (dispatch: Dispatch) {
		try {
			const cities = await axios.get("http://localhost:3001/api/cities")
			dispatch({
				type: ActionType.GET_CITIES,
				payload: cities.data,
			});
		} catch (error) {
			console.log(error)
		}
	}
}