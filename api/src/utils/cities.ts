import { sequelize } from '../db'
const {City} = sequelize.models

export async function getCitiesFromDb() {
    const cities = await City.findAll()
    return cities
}