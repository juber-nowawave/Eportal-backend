const Attendance = require("../Models/Attendance");
const ChangeRequest = require("../Models/changeRequest");

exports.requestChange = async (req, res) => {
  const userId = req.user._id;
  const { checkIn, checkOut, date } = req.body;

  try {
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    if (!checkIn && !checkOut) {
      return res
        .status(400)
        .json({ message: "Either checkIn or checkOut time must be provided" });
    }

    const attendance = await Attendance.findOne({
      userId,
      createdAt: {
        $gte: new Date(`${date}T00:00:00.000Z`),
        $lt: new Date(`${date}T23:59:59.999Z`),
      },
    });

    if (!attendance) {
      return res
        .status(404)
        .json({ message: "No attendance record found for the specified date" });
    }

    const updateData = {};

    // Parse checkIn and checkOut times only if provided
    if (checkIn) {
      updateData.checkIn = new Date(`${date}T${checkIn}`);
    }

    if (checkOut) {
      updateData.checkOut = new Date(`${date}T${checkOut}`);
    }

    // Update the attendance record
    await Attendance.updateOne(
      { _id: attendance._id },
      { $set: updateData }
    );

    // Create the change request (note: only the provided times will be recorded)
    const changeRequest = await ChangeRequest.create({
      userId,
      date,
      requestedChanges: updateData,
    });

    res.status(201).json({ message: "Change request submitted", changeRequest });
  } catch (error) {
    res.status(500).json({ message: "Error submitting change request", error });
  }
};



exports.approveChange = async (req, res) => {
  const { requestId, status, adminResponse } = req.body;

  try {
    const changeRequest = await ChangeRequest.findById(requestId);
    if (!changeRequest) {
      return res.status(404).json({ message: "Change request not found" });
    }

    const { userId, requestedChanges, date } = changeRequest;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // Parse the date into a valid Date object
    const parsedDate = new Date(date);

    // Validate the parsed date
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format provided" });
    }

    // Find attendance for the user on the given date
    const attendance = await Attendance.findOne({
      userId,
      createdAt: {
        $gte: new Date(parsedDate.setHours(0, 0, 0, 0)),  // Start of the day
        $lt: new Date(parsedDate.setHours(23, 59, 59, 999)) // End of the day
      },
    });

    if (!attendance) {
      return res
        .status(404)
        .json({ message: "No attendance record found for the specified date" });
    }

    // Save the current sessions to history for audit
    attendance.history.push({
      sessions: [...attendance.sessions],
      updatedAt: new Date(),
    });

    // Remove all sessions for the given date before adding new ones
    attendance.sessions = [];

    // Handle provided changes
    if (requestedChanges.checkIn && requestedChanges.checkOut) {
      // Both checkIn and checkOut are provided
      const checkInDateTime = new Date(requestedChanges.checkIn);
      const checkOutDateTime = new Date(requestedChanges.checkOut);

      if (isNaN(checkInDateTime.getTime()) || isNaN(checkOutDateTime.getTime())) {
        return res.status(400).json({ message: "Invalid checkIn or checkOut time format" });
      }

      // Add new session
      attendance.sessions.push({ checkIn: checkInDateTime, checkOut: checkOutDateTime });

    } else if (requestedChanges.checkIn) {
      // Only checkIn is provided, keep first checkIn and last checkOut
      const checkInDateTime = new Date(requestedChanges.checkIn);

      if (isNaN(checkInDateTime.getTime())) {
        return res.status(400).json({ message: "Invalid checkIn time format" });
      }

      // Retrieve last checkOut entry
      const lastSession = attendance.sessions[attendance.sessions.length - 1];
      if (lastSession && lastSession.checkOut) {
        // Only keep the first checkIn and the last checkOut
        attendance.sessions.push({
          checkIn: checkInDateTime,
          checkOut: lastSession.checkOut
        });
      } else {
        // No last session available, just store checkIn only
        attendance.sessions.push({
          checkIn: checkInDateTime,
          checkOut: null  // CheckOut will be empty
        });
      }

    } else if (requestedChanges.checkOut) {
      // Only checkOut is provided, keep first checkIn and only checkOut
      const checkOutDateTime = new Date(requestedChanges.checkOut);

      if (isNaN(checkOutDateTime.getTime())) {
        return res.status(400).json({ message: "Invalid checkOut time format" });
      }

      // Retrieve first checkIn entry
      const firstSession = attendance.sessions[0];
      if (firstSession && firstSession.checkIn) {
        // Only keep the first checkIn and the provided checkOut
        attendance.sessions.push({
          checkIn: firstSession.checkIn,
          checkOut: checkOutDateTime
        });
      } else {
        // No first session available, just store checkOut only
        attendance.sessions.push({
          checkIn: null,  // CheckIn will be empty
          checkOut: checkOutDateTime
        });
      }
    }

    // Save the updated attendance record
    await attendance.save();

    // Update the change request with admin's response
    changeRequest.adminResponse = adminResponse || "Request approved by admin.";

    // Update the status of the change request
    changeRequest.status = status;
    await changeRequest.save();

    res.status(200).json({
      message: `Request ${status.toLowerCase()}`,
      changeRequest,
    });
  } catch (error) {
    console.error(error);  // Log the error for easier debugging
    res.status(500).json({ message: "Error processing change request", error });
  }
};



exports.getChangeRequest = async(req, res)=>{
  try {
    const { status } = req.query; // Optional query parameter for filtering by status

    const query = status ? { status } : {};

    const changeRequests = await ChangeRequest.find(query)
      .populate('userId', 'firstName lastName email') // Populate user details
      .sort({ createdAt: -1 }); // Sort by latest requests

    res.status(200).json({
      message: 'Change requests retrieved successfully',
      changeRequests,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving change requests', error });
  }
}