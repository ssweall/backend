import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import ILog from '../interfaces/logs';

const LogSchema: Schema = new Schema(
  {
    type: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

LogSchema.post<ILog>('save', function () {
  logging.info('Mongo', 'Checkout the log we just saved: ', this);
});

export default mongoose.model<ILog>('Log', LogSchema);
