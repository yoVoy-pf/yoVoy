import { sequelize } from "../db";

const { Organizaiton } = sequelize.models

export const getAllOrganizations = async () => {
    const organizations = await Organizaiton.findAll()

    return organizations
}