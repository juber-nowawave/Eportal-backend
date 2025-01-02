const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// Schema for Work Experience
const WorkExperienceSchema = new mongoose.Schema({
    companyName: { 
        type: String, 
        // required: true 
    },
    role: { 
        type: String, 
        // required: true 
    },
    experience: { 
        type: Number, 
        // required: true 
    } // Experience in years
});

// Schema for Education History
const EducationHistorySchema = new mongoose.Schema({
    highestQualification: { 
        type: String, 
        required: true
    },
    year: { 
        type: Number, 
        // required: true 
    },
    marks: { 
        type: Number, 
        // required: true 
    }
});

// Main Employee Profile Schema
const EmployeeProfileSchema = new mongoose.Schema({
    photo: { 
        type: String 
    }, // URL or path to the photo
    companyName: { 
        type: String, 
        required: true 
    }, // Main company of the employee
    firstName: { 
        type: String, 
        required: true 
    },
    middleName: { 
        type: String 
    },
    lastName: { 
        type: String, 
        // required: true 
    },
    dateOfBirth: { 
        type: Date, 
        required: true 
    },
    gender: { 
        type: String, 
        enum: ["Male", "Female", "Other"], 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    mobileNumber: { 
        type: String, 
        required: true, 
        unique: true 
    },
    address: { 
        type: String, 
        required: true
    },
    emergencyNumber: { 
        type: String, 
        required: true 
    },
    pincode: { 
        type: String, 
        required: true 
    },
    adharNumber: { 
        type: String, 
        required: true, 
        unique: true 
    },
    panNumber: { 
        type: String, 
        required: true, 
        unique: true 
    },
    bankAccountNumber: { 
        type: String, 
        required: true, 
        unique: true 
    },
    IFSCCode: { 
        type: String, 
        required: true 
    },
    probationMonths: { 
        type: Number, 
    },
    workExperience: [
        WorkExperienceSchema
    ], // Array of work experiences
    educationHistory: [
        EducationHistorySchema
    ], // Array of education history
    password: {
        type: String,
        required: true
    },
    isFirstLogin:{
        type:Boolean,
        default:true,
      },
    user_role: {
        type: String,
        default:"employee",
        enum: ['manager', 'admin', 'employee'],
    },
    esslId: { 
        type: Number,
        required:true, 
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    jobType:{
        type: String,
        required: true,
        default:"onsite",
    }
});

// Pre-save hook to generate and hash a password before saving
EmployeeProfileSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const randomPassword = "random@4862";

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(randomPassword, salt);

            this.password = hashedPassword; 
        } catch (err) {
            next(err);
        }
    }
    next();
});

const EmployeeProfile = mongoose.model("EmployeeProfile", EmployeeProfileSchema);

module.exports = EmployeeProfile;
