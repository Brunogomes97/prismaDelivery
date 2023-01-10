import { prisma } from '../../../database/prismaClient';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    //Verificar se username cadastrado

    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliveryman) {
      throw new Error('Username or password invalid!');
    }

    //Verificar se senha corresponde ao username
    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error('Username or password invalid!');
    }
    // Gerar o token

    const hashcode = process.env.HASH_DELIVERYMAN as string;

    const token = sign({ username }, hashcode, {
      subject: deliveryman.id,
      expiresIn: '1d',
    });

    return token;
  }
}
