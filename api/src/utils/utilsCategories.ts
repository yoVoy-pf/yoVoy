import { sequelize } from '../db'
const {Category} = sequelize.models

export async function getCategoriesFromDb() {
    const categories = await Category.findAll()
    return categories
}