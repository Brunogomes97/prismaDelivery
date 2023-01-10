import { Request, Response } from 'express';
import { FindallAvailableUseCase } from './FindAllAvailableUseCase';

export class FindallAvailableController {
  async handle(request: Request, response: Response) {
    const findallAvailableUseCase = new FindallAvailableUseCase();

    const deliveries = await findallAvailableUseCase.execute();

    return response.json(deliveries);
  }
}
