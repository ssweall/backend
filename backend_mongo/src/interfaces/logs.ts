import { Document } from 'mongoose';

type ILog = {
  type: string;
  description: string;
} & Document;
export default ILog;
