const moment = require("moment");
const Attendance = require("../Models/Attendance");
const Holiday = require("../Models/Holiday");
const { startOfDay, endOfDay } = require("date-fns");
const biometricAttendence = require("../Models/biometricAttendence");

const formatDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

exports.checkIn = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get today's start and end time in UTC
    const startOfToday = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

    // Find the attendance record for today
    let attendance = await Attendance.findOne({
      userId,
      createdAt: { $gte: startOfToday, $lt: endOfToday },
    });

    // If no attendance record exists for today, create one
    if (!attendance) {
      attendance = new Attendance({ userId, sessions: [] });
    }

    // Check if the user already has an active session (i.e., no check-out yet)
    const lastSession = attendance.sessions[attendance.sessions.length - 1];
    if (lastSession && !lastSession.checkOut) {
      return res.status(400).json({
        message: "You are already checked in. Please check out first.",
      });
    }

    // Add the new check-in session
    attendance.sessions.push({ checkIn: new Date() });

    // Save the attendance record
    await attendance.save();

    res.status(200).json({ message: "Checked in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error during check-in", error });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const userId = req.user._id;

    const startOfToday = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());

    const attendance = await Attendance.findOne({
      userId,
      createdAt: { $gte: startOfToday, $lt: endOfToday },
    });
    if (!attendance || !attendance.sessions.length) {
      return res
        .status(404)
        .json({ message: "No active session found for checkout" });
    }

    const lastSession = attendance.sessions[attendance.sessions.length - 1];
    if (lastSession.checkOut) {
      return res.status(400).json({ message: "Already checked out" });
    }

    lastSession.checkOut = new Date();
    await attendance.save();

    res.status(200).json({ message: "Checked out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error during check-out", error });
  }
};

// exports.getTotalDurationWeek = async (req, res) => {
//   try {
//     const userId = req.query.userid || req.user._id;
//     const { startDate, endDate } = req.query;

//     // Define the date range using query parameters or defaulting to the current ISO week (Monday to Sunday)
//     const startOfRange = startDate
//       ? moment(startDate).startOf("day")
//       : moment().startOf("isoWeek"); // Start of the current ISO week (Monday)
//     const endOfRange = endDate
//       ? moment(endDate).endOf("day")
//       : moment().endOf("isoWeek"); // End of the current ISO week (Sunday)

//     // Retrieve attendance records within the date range
//     const attendances = await Attendance.find({
//       userId,
//       "sessions.checkIn": {
//         $gte: startOfRange.toDate(),
//         $lte: endOfRange.toDate(),
//       },
//     });

//     if (!attendances.length) {
//       return res.status(404).json({
//         message: "No attendance records found for the specified date range",
//       });
//     }

//     // Calculate the duration for sessions within the date range
//     const filteredAttendances = attendances.map(({ createdAt, sessions }) => {
//       const filteredSessions = sessions.filter(({ checkIn, checkOut }) => {
//         // Ensure checkIn or checkOut fall within the specified range
//         const inRange = (date) =>
//           moment(date).isBetween(startOfRange, endOfRange, null, "[]");
//         return inRange(checkIn) || (checkOut && inRange(checkOut));
//       });

//       const totalDuration = filteredSessions.reduce(
//         (duration, { checkIn, checkOut }) => {
//           return checkOut
//             ? duration + moment(checkOut).diff(moment(checkIn))
//             : duration;
//         },
//         0
//       );

//       return {
//         date: moment(createdAt).format("YYYY-MM-DD"),
//         totalDuration: totalDuration > 0 ? formatDuration(totalDuration) : null,
//         sessions: filteredSessions.map(({ checkIn, checkOut }) => ({
//           checkIn: moment(checkIn).format("YYYY-MM-DD HH:mm:ss"),
//           checkOut: checkOut
//             ? moment(checkOut).format("YYYY-MM-DD HH:mm:ss")
//             : null,
//         })),
//       };
//     });

//     res.status(200).json({
//       dateRange: {
//         startDate: startOfRange.format("YYYY-MM-DD"),
//         endDate: endOfRange.format("YYYY-MM-DD"),
//       },
//       attendances: filteredAttendances,
//     });
//   } catch (error) {
//     console.error("Error retrieving total duration:", error);
//     res.status(500).json({ message: "Error retrieving total duration", error });
//   }
// };


// biometric attendence Data 
exports.getTotalDurationWeek = async (req,res) =>{
    try{
      const {userESSLid , startDate , endDate} = req.query;
      console.log('start' , startDate , 'end', endDate , 'id' , userESSLid);
      // const result = await biometricAttendence.find({$and:[
      //   {date:{$gte:startDate}},
      //   {date:{$lte:endDate}},
      //   {records:{$elemMatch:{esslId:userESSLid}}}
      // ]});

      const result = await biometricAttendence.aggregate([
        {
          $match: {
            $and: [
              { date: { $gte: startDate } },
              { date: { $lte: endDate } },
              { "records.esslId": userESSLid }
            ]
          }
        },
        {
          $project: {
            date: 1, 
            day:1,
            records: {
              $filter: {
                input: "$records",
                as: "record",
                cond: { $eq: ["$$record.esslId", userESSLid] }
              }
            }
          }
        }
      ]);
      console.log(result); 
      res.status(200).json({ message: "Retrieving total duration successfull",result});
       
    }catch(err){
    console.error("Error retrieving total duration:", err);
    res.status(500).json({ message: "Error retrieving total duration", err });
    }
}

exports.addHoliday = async (req, res) => {
  try {
    const { date, name } = req.body;

    // Ensure date and name are provided
    if (!date || !name) {
      return res.status(400).json({ message: "Date and name are required" });
    }

    // Create a new holiday entry
    const holiday = new Holiday({ date, name });
    await holiday.save();

    res.status(201).json({ message: "Holiday added successfully", holiday });
  } catch (error) {
    res.status(500).json({ message: "Error adding holiday", error });
  }
};

exports.getHoliday = async (req, res) => {
  try {
    const holidays = await Holiday.find();
    if (holidays.length === 0) {
      res.status(200).json({ message: "No holidays found" });
    }
    return res
      .status(200)
      .json({ message: "Holidays retrived successfully", holidays });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving holiday", error });
  }
};

exports.getWeekSummaryWithWeekends = async (req, res) => {
  try {
    const userId = req.query.userId || req.user._id; // User ID from query or authenticated user
    const { startDate, endDate } = req.query;

    // Determine the week or custom date range
    const startOfWeek = startDate
      ? moment(startDate).startOf("day")
      : moment().startOf("isoWeek"); // ISO week starts on Monday
    const endOfWeek = endDate
      ? moment(endDate).endOf("day")
      : moment().endOf("isoWeek"); // ISO week ends on Sunday

    // Create an array of all days in the range
    const daysInWeek = [];
    for (
      let day = startOfWeek.clone();
      day.isSameOrBefore(endOfWeek);
      day.add(1, "day")
    ) {
      daysInWeek.push(day.clone());
    }

    // Fetch attendance and holidays in parallel
    const [attendances, holidays] = await Promise.all([
      Attendance.find({
        userId,
        "sessions.checkIn": {
          $gte: startOfWeek.toDate(),
          $lte: endOfWeek.toDate(),
        },
      }),
      Holiday.find({
        date: { $gte: startOfWeek.toDate(), $lte: endOfWeek.toDate() },
      }),
    ]);

    // Map holidays for easier lookup
    const holidayDates = holidays.map((holiday) =>
      moment(holiday.date).format("YYYY-MM-DD")
    );

    // Build the weekly summary
    const weeklySummary = daysInWeek.map((day) => {
      const date = day.format("YYYY-MM-DD");
      const isWeekend = [6, 0].includes(day.day()); // Saturday (6) and Sunday (0)
      const isHoliday = holidayDates.includes(date);

      // Find attendance for the specific day
      const attendance = attendances.find((record) =>
        record.sessions.some((session) =>
          moment(session.checkIn).isSame(day, "day")
        )
      );

      return {
        date,
        isHoliday,
        isWeekend,
        isAbsent: !isHoliday && !isWeekend && !attendance, // Mark as absent only if not holiday/weekend
        attendance: !!attendance,
      };
    });

    // Respond with the weekly summary
    res.status(200).json({
      dateRange: {
        startDate: startOfWeek.format("YYYY-MM-DD"),
        endDate: endOfWeek.format("YYYY-MM-DD"),
      },
      weeklySummary,
    });
  } catch (error) {
    console.error("Error fetching week summary:", error);
    res.status(500).json({ message: "Error fetching week summary", error });
  }
};
