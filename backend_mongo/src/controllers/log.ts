import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Log from '../models/log';

const createLog = (req: Request, res: Response) => {
  const { type, description } = req.body;

  const log = new Log({
    _id: new mongoose.Types.ObjectId(),
    type,
    description,
  });

  return log
    .save()
    .then(logs => {
      return res.status(201).json({
        log: logs,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getAllLogs = (req: Request, res: Response) => {
  Log.find()
    .sort({ createdAt: -1 })
    .exec()
    .then(logs => {
      return res.status(200).json({
        logs: logs,
        count: logs.length,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

//find one log
const getOneLog = (req: Request, res: Response) => {
  Log.findById(req.params.id)
    .exec()
    .then(log => {
      if (!log) {
        return res.status(404).json({
          message: 'Log not found',
        });
      }
      return res.status(200).json({
        log: log,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

//delete one log
const deleteLog = (req: Request, res: Response) => {
  Log.findByIdAndRemove(req.params.id)
    .exec()
    .then(log => {
      if (!log) {
        return res.status(404).json({
          message: 'Log not found',
        });
      }
      return res.status(200).json({
        message: 'Le log a été supprimé',
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default {
  createLog,
  getOneLog,
  deleteLog,
  getAllLogs,
};
