import { Response } from "express";

export function successResponse(res: Response, data: any) {
    return res.status(200).json({
      status: true,
      message: 'Successful',
      data: data,
    });
}

export function errorResponse(res: Response, statusCode: number, message: string) {
    return res.status(statusCode).json({
      status: false,
      message: message,
      data: null
    });
  }