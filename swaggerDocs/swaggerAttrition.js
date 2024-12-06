/**
 * @swagger
 * /Employee/createAttrition:
 *   post:
 *     summary: Create a new employee attrition record
 *     description: Adds a new attrition record for an employee, storing details such as reason for leaving, dates, and status.
 *     tags:
 *       - Attrition
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_name:
 *                 type: string
 *                 description: Name of the employee.
 *               grade:
 *                 type: string
 *                 description: Employee's grade.
 *               branch:
 *                 type: string
 *                 description: Branch location of the employee.
 *               department:
 *                 type: string
 *                 description: Department of the employee.
 *               designation:
 *                 type: string
 *                 description: Job title of the employee.
 *               division:
 *                 type: string
 *                 description: Division in the organization.
 *               unit:
 *                 type: string
 *                 description: Specific unit within the division.
 *               project:
 *                 type: string
 *                 description: Project associated with the employee.
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 description: Birth date of the employee.
 *               employee_code:
 *                 type: string
 *                 description: Unique employee code.
 *               joining_date:
 *                 type: string
 *                 format: date
 *                 description: Date the employee joined the organization.
 *               confirmation_date:
 *                 type: string
 *                 format: date
 *                 description: Confirmation date of the employee's position.
 *               resign_offer_date:
 *                 type: string
 *                 format: date
 *                 description: Date the employee offered their resignation.
 *               resign_date:
 *                 type: string
 *                 format: date
 *                 description: Date of resignation submission.
 *               left_date:
 *                 type: string
 *                 format: date
 *                 description: Date the employee officially left the organization.
 *               reason_of_leaving:
 *                 type: string
 *                 description: Reason the employee provided for leaving.
 *               employee_status:
 *                 type: string
 *                 description: Current status of the employee (e.g., Resigned).
 *               category:
 *                 type: string
 *                 description: Employment category (e.g., Permanent).
 *     responses:
 *       200:
 *         description: Attrition record created successfully.
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
 *                   description: Details of the created attrition record.
 *       400:
 *         description: Error creating attrition record.
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
 * /Employee/getAttrition:
 *   get:
 *     summary: Retrieve all attrition records
 *     description: Fetches all employee attrition records from the system.
 *     tags:
 *       - Attrition
 *     responses:
 *       200:
 *         description: Attrition records retrieved successfully.
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
 *                       employee_name:
 *                         type: string
 *                         description: Name of the employee.
 *                       grade:
 *                         type: string
 *                         description: Employee's grade.
 *                       branch:
 *                         type: string
 *                         description: Branch location.
 *                       department:
 *                         type: string
 *                         description: Department of the employee.
 *                       designation:
 *                         type: string
 *                         description: Employee's designation.
 *                       division:
 *                         type: string
 *                         description: Division within the organization.
 *                       unit:
 *                         type: string
 *                         description: Unit within the division.
 *                       project:
 *                         type: string
 *                         description: Project name associated with the employee.
 *                       birth_date:
 *                         type: string
 *                         format: date
 *                         description: Birth date of the employee.
 *                       employee_code:
 *                         type: string
 *                         description: Unique employee code.
 *                       joining_date:
 *                         type: string
 *                         format: date
 *                         description: Date the employee joined.
 *                       confirmation_date:
 *                         type: string
 *                         format: date
 *                         description: Position confirmation date.
 *                       resign_offer_date:
 *                         type: string
 *                         format: date
 *                         description: Date resignation was offered.
 *                       resign_date:
 *                         type: string
 *                         format: date
 *                         description: Resignation date.
 *                       left_date:
 *                         type: string
 *                         format: date
 *                         description: Date employee left.
 *                       reason_of_leaving:
 *                         type: string
 *                         description: Reason for leaving.
 *                       employee_status:
 *                         type: string
 *                         description: Current status of the employee (e.g., Resigned).
 *                       category:
 *                         type: string
 *                         description: Employment category (e.g., Permanent).
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
