/**
 * @swagger
 * /admin/projectDetails/createProjectDetails:
 *   post:
 *     summary: Create or update project details
 *     description: Creates a new project if no ID is provided. If an ID is provided and a matching project exists, updates the project details.
 *     tags:
 *       - ProjectDetails
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Project ID. If provided, updates an existing project.
 *               projectName:
 *                 type: string
 *                 description: Name of the project.
 *               projectType:
 *                 type: string
 *                 description: Type of the project.
 *               source:
 *                 type: string
 *                 description: Source of the project.
 *               representative:
 *                 type: string
 *                 description: Representative responsible for the project.
 *               clientName:
 *                 type: string
 *                 description: Client associated with the project.
 *               projectDetails:
 *                 type: string
 *                 description: Detailed description of the project.
 *               contactPerson:
 *                 type: string
 *                 description: Contact person for the project.
 *               contactNumber:
 *                 type: string
 *                 description: Contact number for the project.
 *               firstTalkDate:
 *                 type: string
 *                 format: date
 *                 description: Date of the first talk about the project.
 *               sendEmail:
 *                 type: boolean
 *                 description: Indicates if an email should be sent.
 *               interested:
 *                 type: boolean
 *                 description: Client's interest in the project.
 *               resultFirstTalk:
 *                 type: string
 *                 description: Result of the first talk.
 *               resources:
 *                 type: object
 *                 properties:
 *                   assignedTo:
 *                     type: string
 *                     description: Person assigned to the project.
 *                   numberOfResources:
 *                     type: integer
 *                     description: Number of resources assigned.
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     description: Start date of the project.
 *                   expectedEndDate:
 *                     type: string
 *                     format: date
 *                     description: Expected end date of the project.
 *                   remarks:
 *                     type: string
 *                     description: Remarks about the resources.
 *               agreements:
 *                 type: object
 *                 properties:
 *                   msa:
 *                     type: object
 *                     properties:
 *                       checked:
 *                         type: boolean
 *                         description: MSA agreement status.
 *                       dateTime:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time of the MSA agreement.
 *                   dsa:
 *                     type: object
 *                     properties:
 *                       checked:
 *                         type: boolean
 *                         description: DSA agreement status.
 *                       dateTime:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time of the DSA agreement.
 *                   nonSolicitation:
 *                     type: object
 *                     properties:
 *                       checked:
 *                         type: boolean
 *                         description: Non-solicitation agreement status.
 *                       dateTime:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time of the non-solicitation agreement.
 *     responses:
 *       200:
 *         description: Project created or updated successfully.
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
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the project.
 *                     projectName:
 *                       type: string
 *                       description: Name of the project.
 *                     projectType:
 *                       type: string
 *                       description: Type of the project.
 *                     clientName:
 *                       type: string
 *                       description: Client associated with the project.
 *                     active:
 *                       type: boolean
 *                       description: Active status of the project.
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
 * /admin/projectDetails/getProjectDetails:
 *   get:
 *     summary: Retrieve all active project details
 *     description: Fetches all projects with the `active` status set to true.
 *     tags:
 *       - ProjectDetails
 *     responses:
 *       200:
 *         description: Projects retrieved successfully or no projects found.
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
 *                         description: Unique identifier for the project.
 *                       projectName:
 *                         type: string
 *                         description: Name of the project.
 *                       projectType:
 *                         type: string
 *                         description: Type of the project.
 *                       clientName:
 *                         type: string
 *                         description: Client associated with the project.
 *                       active:
 *                         type: boolean
 *                         description: Active status of the project.
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
 * /admin/projectDetails/deleteProjects/{id}:
 *   post:
 *     summary: Mark a project as inactive
 *     description: Updates the project’s `active` status to false instead of deleting it permanently.
 *     tags:
 *       - ProjectDetails
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the project to mark as inactive.
 *     responses:
 *       200:
 *         description: Project marked as inactive successfully.
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
 *                     _id:
 *                       type: string
 *                       description: Unique identifier of the project.
 *                     active:
 *                       type: boolean
 *                       description: Active status of the project.
 *                     projectName:
 *                       type: string
 *                       description: Name of the project.
 *       404:
 *         description: No project found with the given ID.
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
 * /admin/projectDetails/updateProjectStatus:
 *   post:
 *     summary: Update project status
 *     description: Updates the status of a specific project by its ID.
 *     tags:
 *       - ProjectDetails
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Unique identifier of the project to update.
 *               projectStatus:
 *                 type: number
 *                 description: New status for the project.
 *     responses:
 *       200:
 *         description: Project status updated successfully.
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
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the project.
 *                     projectStatus:
 *                       type: number
 *                       description: Updated status of the project.
 *       404:
 *         description: Project not found.
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


