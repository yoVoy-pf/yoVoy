import { sequelize } from "../db";
import { ROLES_LIST } from "../authorization/roles";

const {Organization, User, UserRole, Event} = sequelize.models



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
    
    const user = await User.findOne({
        where:{
            organizationId: id
        }
    })

    await UserRole.destroy({where:{
        userId: user?.getDataValue("id"),
        roleId: ROLES_LIST.Organization
    }})

    await user?.update({organizationId: null})

    const number = await Organization.destroy({
        where: {
            id: id
        }
    })

    return number
}

export const banOrganization = async (id: string | number) => {
    const organization = await Organization.findByPk(id)

    if(!organization) return null

    organization.update({status: "banned"})
    Event.update({status: "inactive"}, {where:{organizationId: id}})
    
    return 1
}

export const getOrganizationById = async (id: string | number) => {
    const organization = await Organization.findOne({
        where:{
            id:id
        }
    })

    return organization
}

export const updateOrganization = async (id: string | number, {updateOrganization}: any) => {
    const organization = await Organization.update({name: updateOrganization.name}, {
        where: {
            id: id
        }
    })

    return organization
}

export const getAllEvents = async (organizationId: string | number) => {
   const events = await Event.findAll({
    where:{
        organizationId
    }
   })

   return events
}