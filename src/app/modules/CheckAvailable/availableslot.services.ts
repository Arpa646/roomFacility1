import BookingModel from '../Booking/booking.model';

const checkslot = async (date: string) => {
  let queryDate: Date;
  if (date) {
    queryDate = new Date(date as string);
  } else {
    // Use today's date if no date is provided
    queryDate = new Date();
  }
  
  // Convert queryDate to the start of the day in UTC
  const startOfDay = new Date(Date.UTC(queryDate.getUTCFullYear(), queryDate.getUTCMonth(), queryDate.getUTCDate()));
  const endOfDay = new Date(startOfDay);
  endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);

  // Retrieve bookings for the specified date range
  const bookings = await BookingModel.find({
    date: {
      $gte: startOfDay,
      $lt: endOfDay
    }
  });

  console.log("Bookings for the day:", bookings);

  bookings.forEach(booking => {
    console.log(`startTime: ${booking.startTime}, endTime: ${booking.endTime}`);
  });
  // Define the total available time slots for the day (8 AM to 8 PM)
  const totalSlots = [
    { startTime: "08:00", endTime: "10:00" },
    { startTime: "10:00", endTime: "12:00" },
    { startTime: "12:00", endTime: "14:00" },
    { startTime: "14:00", endTime: "16:00" },
    { startTime: "16:00", endTime: "18:00" },
    { startTime: "18:00", endTime: "20:00" }
  ];

  // Remove booked slots from total slots
  const availableSlots = [];
  for (let i = 0; i < totalSlots.length; i++) {
    const slot = totalSlots[i];
    let isAvailable = true;

    for (let j = 0; j < bookings.length; j++) {
      const booking = bookings[j];
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      const slotStart = slot.startTime;
      const slotEnd = slot.endTime;

      // Check if the slot start and end times match exactly with any booking
      if (bookingStart == slotStart && bookingEnd == slotEnd) {
        isAvailable = false;
        break; // No need to check further if slot is not available
      }
    }

    // Only push the slot into availableSlots if it is available
    if (isAvailable) {
      availableSlots.push(slot);
    }
  }

  console.log("Available slots:", availableSlots);

  return availableSlots;
}

export const slotServices = {
  checkslot
}
