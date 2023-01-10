import { prisma } from '../../../database/prismaClient';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateCliente {
  username: string;
  password: string;
}

export class AuthenticateClientUserCase {
  async execute({ username, password }: IAuthenticateCliente) {
    //Verificar se username cadastrado

    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error('Username or password invalid!');
    }

    //Verificar se senha corresponde ao username
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error('Username or password invalid!');
    }
    // Gerar o token

    const hashcode = process.env.HASH_CLIENT as string;

    const token = sign({ username }, hashcode, {
      subject: client.id,
      expiresIn: '1d',
    });

    return token;
  }
}
