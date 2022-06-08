import { sequelize } from "../db";

const {Category} = sequelize.models


export const createCategory = async (name:string) => {
    const category = await Category.create({name: name})

    return category
}