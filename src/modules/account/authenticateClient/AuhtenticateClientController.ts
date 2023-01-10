import { Request, Response } from 'express';
import { AuthenticateClientUserCase } from './AuthenticateClientUseCase';

export class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateClientUserCase = new AuthenticateClientUserCase();

    const result = await authenticateClientUserCase.execute({
      username,
      password,
    });

    return response.json(result);
  }
}
