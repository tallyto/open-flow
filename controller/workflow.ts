import workflowModel from "../schemas/workflow"

export const createWorkflow = async (data) => {
    const { Serializable, Filename, projectandname, FilePath,
        projectid, _type, name } = data
    const result = await workflowModel.create({Serializable, Filename, projectandname, FilePath,
        projectid, _type, name })
    return result
}