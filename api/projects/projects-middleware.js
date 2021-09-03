// add middlewares here related to projects
const Projects = require('./projects-model')
async function validateProjectId(req, res, next) {
    try{
        const project= await Projects.get(req.params.id)
        if(!project){
            res.status(404).json({message:"This is not an ID"})
        }else{
        req.project = project
        next()
      }
    } catch(err){
      res.status(500).json({message:'problem finding user'})
    }
  }
  async function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    if(!name || !description|| completed===undefined){
        res.status(400).json({ message: 'missing required name,description ,completed field'})
    } else {
        req.name = name
        req.description = description
        req.completed = completed
        next()
    }
}
  module.exports = {
    validateProjectId,
    validateProject
    
  }