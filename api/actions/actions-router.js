// Write your "actions" router here!
const express = require('express');
const{validateActionId,validateActions}=require('./actions-middlware')
const Action = require("./actions-model")

const router= express.Router()

//GET
router.get('/',async (req,res,next)=>{
   try{
    const actions = await Action.get()
    res.json(actions)
   }catch(err){
       next(err)
   }
})
//Get with ID
router.get('/:id',validateActionId,async(req,res,next)=>{
    try{
        res.json(req.action)
    }catch(err){
       next(err)
    }    
})
//POST
router.post('/',validateActions,async (req,res,next)=>{
    try{
            const actions = await Action.insert({notes:req.notes,description:req.description,project_id:req.project_id})
            res.status(200).json(actions)
    }catch(err){
        next(err)
    }
})
//PUT ID
router.put('/:id',validateActionId,validateActions,async(req,res,next)=>{
    try{  
        await Action.update(req.params.id,{notes:req.notes,description:req.description,project_id:req.project_id,completed:req.body.completed})
        const updatedAction = await Action.get(req.params.id)
        res.json(updatedAction)       
    }catch(err){
        next(err)
    }
})

router.delete('/:id',validateActionId, async (req,res,next)=>{
    try{   
        await Action.remove(req.params.id)
        res.json()
    }catch(err){
        next(err)
    }
})
router.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
      message:"something went wrong",
    })
  })


module.exports = router
