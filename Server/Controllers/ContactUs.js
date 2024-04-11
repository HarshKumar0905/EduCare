const ContactUs = require('../Models/ContactUs');

exports.createContact = async (req,res) => {
    try{
        const {firstName, lastName, email, countryCode, phoneNo,
        message} = req.body;
        if(!firstName || !lastName || !email || !countryCode || !phoneNo || !message){
            return res.status(400).json({
                success : false,
                message : 'All fields are required'
            });
        }
        const contactDetails = await ContactUs.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            countryCode : countryCode,
            phoneNo : phoneNo,
            message : message
        });
        return res.status(200).json({
            success : true,
            message : 'Contact details created successfully',
            contactDetails
        });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
}