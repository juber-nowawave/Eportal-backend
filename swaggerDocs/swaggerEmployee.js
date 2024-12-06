/**
 * @swagger
 * /Employee/createEmployee:
 *   post:
 *     summary: Create or update an employee profile
 *     description: Creates a new employee profile if no matching email is found. If an employee with the provided email already exists, updates their profile.
 *     tags:
 *       - Employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: uri
 *                 description: URL of the employee's photo.
 *               companyName:
 *                 type: string
 *                 description: Name of the company.
 *               firstName:
 *                 type: string
 *                 description: First name of the employee.
 *               middleName:
 *                 type: string
 *                 description: Middle name of the employee.
 *               lastName:
 *                 type: string
 *                 description: Last name of the employee.
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: Date of birth of the employee.
 *               gender:
 *                 type: string
 *                 description: Gender of the employee.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the employee, used as a unique identifier.
 *               mobileNumber:
 *                 type: string
 *                 description: Mobile number of the employee.
 *               address:
 *                 type: string
 *                 description: Residential address of the employee.
 *               emergencyNumber:
 *                 type: string
 *                 description: Emergency contact number.
 *               pincode:
 *                 type: string
 *                 description: Pincode of the employee's address.
 *               adharNumber:
 *                 type: string
 *                 description: Aadhaar number of the employee.
 *               panNumber:
 *                 type: string
 *                 description: PAN number of the employee.
 *               bankAccountNumber:
 *                 type: string
 *                 description: Bank account number of the employee.
 *               IFSCCode:
 *                 type: string
 *                 description: IFSC code for the employee's bank.
 *               probationMonths:
 *                 type: integer
 *                 description: Probation period in months.
 *               workExperience:
 *                 type: array
 *                 description: Work experience details of the employee.
 *                 items:
 *                   type: object
 *                   properties:
 *                     companyName:
 *                       type: string
 *                       description: Name of the previous company.
 *                     role:
 *                       type: string
 *                       description: Role held in the previous company.
 *                     experience:
 *                       type: integer
 *                       description: Years of experience in the role.
 *               educationHistory:
 *                 type: array
 *                 description: Educational qualifications of the employee.
 *                 items:
 *                   type: object
 *                   properties:
 *                     highestQualification:
 *                       type: string
 *                       description: Highest educational qualification.
 *                     year:
 *                       type: integer
 *                       description: Year of graduation.
 *                     marks:
 *                       type: integer
 *                       description: Marks obtained in percentage.
 *     responses:
 *       200:
 *         description: Employee profile created or updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   description: Status indicator (1 for success, 0 for failure).
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                 message:
 *                   type: string
 *                   description: Result message.
 *                 data:
 *                   type: object
 *                   description: Details of the created or updated employee profile.
 *       400:
 *         description: Error creating or updating employee profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   description: Status indicator (0 for failure).
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /Employee/getEmployee:
 *   get:
 *     summary: Retrieve all employees
 *     description: Fetches a list of all employees.
 *     tags:
 *       - Employee
 *     responses:
 *       200:
 *         description: Employees retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   description: Status indicator (1 for success, 0 for failure).
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                 message:
 *                   type: string
 *                   description: Result message.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier for the employee.
 *                       firstName:
 *                         type: string
 *                         description: First name of the employee.
 *                       lastName:
 *                         type: string
 *                         description: Last name of the employee.
 *                       email:
 *                         type: string
 *                         description: Email of the employee.
 *                       mobileNumber:
 *                         type: string
 *                         description: Mobile number of the employee.
 *                       # Additional employee fields can be listed here.
 *       404:
 *         description: No employees found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   description: Status indicator (0 for failure).
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   description: Status indicator (0 for failure).
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /Employee/delete/{id}:
 *   delete:
 *     summary: Delete an employee
 *     description: Deletes an employee by their unique identifier.
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the employee to delete.
 *     responses:
 *       200:
 *         description: Employee deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   description: Status indicator (1 for success, 0 for failure).
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                 message:
 *                   type: string
 *                   description: Result message.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID of the deleted employee.
 *       404:
 *         description: Employee not found with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   description: Status indicator (0 for failure).
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   description: Status indicator (0 for failure).
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                 message:
 *                   type: string
 *                   description: Error message.
 */
