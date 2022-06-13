import { sequelize } from "../db";
import { ROLES_LIST } from "../authorization/roles";

const {Organization, User, UserRole} = sequelize.models



export const createOrganization = async (name: string, userId: string) => {
    const organization = await Organization.create({name, userId})

    User.update({organizationId: organization.getDataValue("id")},
    {
        where: {
            id: userId
        }
    })

    UserRole.create({userId, roleId: ROLES_LIST.Organization})

    return organization
}

export const destroyOrganization = async (id: string | number) => {
    const number = await Organization.destroy({
        where: {
            id: id
        }
    })

    return number
}