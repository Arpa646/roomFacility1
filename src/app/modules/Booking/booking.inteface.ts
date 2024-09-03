import { Types, Schema } from 'mongoose';

export interface Booking {
    facility: Types.ObjectId;
    date: Date;
    startTime: string;
    endTime: string;
    user: Types.ObjectId; // Correctly use Types.ObjectId
    isBooked?: string;
    payableAmount?: number;


}
