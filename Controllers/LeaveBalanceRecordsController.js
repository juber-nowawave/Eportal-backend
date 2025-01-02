const {leaveBalanceRecords} = require('../Models/LeaveBalanceRecords');
const responseHandler = require("../library/responseTemplate");



const postLeaveBalanceRecords = async (req,res) => {
   
   const {employeeId, employeeName, year, adminOpeningBalance} = req.body;
 
   const months = [
     "January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"
   ];

   const monthlyRecords = new Map();
   let previousClosingBalance = parseInt(adminOpeningBalance);
 
   months.forEach((month, index) => {
     const credits = (index + 1) % 4 === 0 ? 2 : 1;
     monthlyRecords.set(month, {
       openingBalance: previousClosingBalance,
       credits,
       leavesTaken: 0,
       closingBalance: previousClosingBalance + credits,
     });
     previousClosingBalance = previousClosingBalance + credits;
   });
 
   const leaveYear = new leaveBalanceRecords({
     employeeId,
     employeeName,
     year,
     monthlyRecords,
     totalCredits: previousClosingBalance - parseInt(adminOpeningBalance),
     totalLeavesTaken: 0,
     totalClosingBalance:previousClosingBalance,
     adminOpeningBalance,
   });
 
   await leaveYear.save();
   return res.json(responseHandler(1, 200, "post leave Balance Records successfully",leaveYear));
};
 

const getLeaveBalanceRecords = async (req,res) => {
   const {employeeId, year} = req.query;

   const leaveYear = await leaveBalanceRecords.findOne({ employeeId, year });
   if (!leaveYear) return res.json(responseHandler(1, 400, "Leave record not found.",leaveYear));
   return res.json(responseHandler(1, 200, "Leave record Found Succesfully",leaveYear));

 };

const putLeaveBalanceRecords = async (req,res) => {
   const monthsArr = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
   ];
   for(let obj of req.body){

     const {employeeId, esslId ,year,month,leavesTaken} =obj;
     const monthInString = monthsArr[parseInt(month,10)]
     const leaveYear = await leaveBalanceRecords.findOne({employeeId,year});

     if (!leaveYear) return res.json(responseHandler(0, 400, "Leave record for this year does not exist.", leaveYear));
   
     const monthlyRecords = leaveYear.monthlyRecords;
     if (!monthlyRecords.has(monthInString))  return res.json(responseHandler(0, 400,`No data available for month: ${monthInString}`, null));
   
     const monthData = monthlyRecords.get(monthInString); 
     monthData.leavesTaken += parseInt(leavesTaken,10);
     monthData.closingBalance -= parseInt(leavesTaken,10);
  
     monthlyRecords.set(monthInString, monthData);
   
     const months = Array.from(monthlyRecords.keys());
     let previousClosingBalance = monthData.closingBalance;
  
     for (let i = months.indexOf(monthInString) + 1; i < months.length; i++) {
       const currentMonth = months[i];
       const currentData = monthlyRecords.get(currentMonth);
       
       currentData.openingBalance = previousClosingBalance;
       currentData.closingBalance = currentData.openingBalance + currentData.credits - currentData.leavesTaken;
       
       monthlyRecords.set(currentMonth, currentData);
       previousClosingBalance = currentData.closingBalance;
       leaveYear.totalClosingBalance = previousClosingBalance;
     }
   
     leaveYear.totalLeavesTaken += parseInt(leavesTaken);
   
     leaveYear.markModified("monthlyRecords");

     await leaveYear.save();
  }

   return res.json(responseHandler(1, 200, "post leave Balance Records successfully",null));
 };
 
module.exports ={postLeaveBalanceRecords , getLeaveBalanceRecords, putLeaveBalanceRecords};