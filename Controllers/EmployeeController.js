const EmployeeDetails = require("../Models/Employee");
const responseHandler = require("../library/responseTemplate");
const {ObjectId} = require('mongodb')

exports.createEmployee = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');

    // Set a default password if it's not provided
    if (!req.body.password) {
      req.body.password = "random@4862"; // Default password
    }

    // Create a new employee profile with the data in req.body
    const newEmployee = new EmployeeDetails(req.body);
    
    // Save the new employee to the database
    await newEmployee.save();

    // Respond with success message
    return res.json(responseHandler(1, 201, "Employee profile created successfully", newEmployee));
  } catch (error) {
    return res.json(responseHandler(0, 400, "Error creating employee profile", error.message));
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const employees = await EmployeeDetails.find({isActive:true});
    if (employees.length === 0) {
      return res.status(404).json(responseHandler(0, 404, "No employees found."));
    }
    return res.json(responseHandler(1, 200, "Employees retrieved successfully", employees));
  } catch (error) {
    return res.json(responseHandler(0, 500, "Internal server error", error.message));
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const { _id } = req.body;
    if(!_id || !Array.isArray(_id)){
      console.log('jjj2',req.body);
      return res.status(404).json(responseHandler(0, 404, "Ids must be in Array of string"));
    }
    // const objectIds = _id.map(id => ObjectId(id));
    const result = await EmployeeDetails.find({_id:{$in:_id}});
    if(result){
      const data = await EmployeeDetails.updateMany({_id:{$in:_id } , isActive:true},{$set:{isActive:false}});
      console.log('jjj3',result);
      return res.status(200).json(responseHandler(1, 200, "employee Deteled successfully", data));
    }
      return res.status(404).json(responseHandler(0, 404, "No employee found with the given ID."));
  } catch (error) {
    return res.json(responseHandler(0, 500, "Internal server error", error.message));
  }
};


exports.getSpecificEmployees = async (req, res) => {
  const {esslId,_id} = req.query;
  try {
    res.setHeader('Content-Type', 'application/json');
    const employees = await EmployeeDetails.find({
      $and:[
        {_id:_id},
        {esslId:esslId},
      ]
    });
    if (employees.length === 0) {
      return res.status(404).json(responseHandler(0, 404, "No employees found."));
    }
    return res.json(responseHandler(1, 200, "Employees retrieved successfully", employees));
  } catch (error) {
    return res.json(responseHandler(0, 500, "Internal server error", error.message));
  }
};