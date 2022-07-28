import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import Comments from '../models/comments.js';

router.get('/:id',async (req,res)=>{
    const {id} = req.params;
    console.log(id)
    const comments = await Comments.find({parentID : id});
    res.json({comments});
});

export const comments = router;