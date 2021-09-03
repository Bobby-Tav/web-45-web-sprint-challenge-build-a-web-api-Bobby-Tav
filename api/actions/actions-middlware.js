// add middlewares here related to actions
// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionId(req, res, next) {
    try{
        const action= await Actions.get(req.params.id)
        if(!action){
            res.status(404).json({message:"This is not an ID"})
        }else{
        req.action = action
        next()
      }
    } catch(err){
      res.status(500).json({message:'problem finding user'})
    }
  }
  async function validateActions(req, res, next) {
    const { notes, description, project_id } = req.body
    if(!notes || !description||description > 128||!project_id){
        res.status(400).json({ message: 'missing required name,description ,completed field'})
    } else {
        req.notes = notes
        req.description = description
        req.project_id = project_id
        next()
    }
}
  module.exports = {
    validateActionId,
    validateActions
  }