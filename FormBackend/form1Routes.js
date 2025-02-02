import express from "express";
import FORM1 from "./form1Model.js";
const router = express.Router();

router.post("/form1", async (req, res) => {
  const { shopName, shopCategory, shopSize, shopLocation, createdBy } =
    req.body;
  try {
    const newForm1 = new FORM1({
      shopName,
      shopCategory,
      shopSize,
      shopLocation,
      createdBy,
    });
    await newForm1.save();
    res.status(201).json(newForm1);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

router.get("/form1", async (req, res) => {
  try {
    // Fetch all documents from the FORM1 collection
    const form1 = await FORM1.find();

    // If no documents are found, return a 404 status with a message
    if (!form1 || form1.length === 0) {
      return res.status(404).json({ message: "No forms found." });
    }

    // Return the fetched documents with a 200 status
    res.status(200).json(form1);
  } catch (error) {
    console.error("Error fetching forms:", error);

    // Return a 500 status for server-side errors
    res
      .status(500)
      .json({ message: "An error occurred while fetching forms." });
  }
});

export default router;
