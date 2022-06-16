import { sequelize } from "../db";

const { Organization } = sequelize.models

export const getAllOrganizations = async () => {
    const organizations = await Organization.findAll()

    return organizations
}