import projectModel from "../schemas/project"

export const createProject = async (project) => {
    const { Filename, disable_local_caching, _type, name } = project
    const result = await projectModel.create({ Filename, disable_local_caching, _type, name })
    return result
}