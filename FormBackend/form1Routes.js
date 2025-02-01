import express from 'express';
import FORM1 from "./form1Model.js";
const router = express.Router();

router.post('/form1', async(req, res) => {
    const { shopName, shopCategory, shopSize, shopLocation, createdBy } = req.body;
    try {
        const newForm1 = new FORM1({ shopName, shopCategory, shopSize, shopLocation, createdBy });
    await newForm1.save();
    res.status(201).json(newForm1);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
    
});


export default router;