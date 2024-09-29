import BookingModel from "./booking.model";

const confirmationService = async (transactionid: string) => {




  try {
    const result = await BookingModel.findOneAndUpdate(
      { transactionid },
      {
        isPaid: "paid",
      },
      { new: true } // returns the updated document
    );

    if (!result) {
      throw new Error("Booking not found or update failed");
    }
    console.log("confirmation",transactionid)
    return result;
  } catch (error) {
    console.error("Error confirming payment:", error);
    throw error;
  }
};

export const paymentServices = { confirmationService };
