const Contact=require('../models/contact-model')
const contactForm = async function (req, res) {
  try {
    const response=req.body;
    await Contact.create(response);
    return res.status(200).json({message:"Message send successfully"});
  } catch (error) {
    return res.status(500).json({message:"Message not be delivered"});
  }
};
module.exports=contactForm;
