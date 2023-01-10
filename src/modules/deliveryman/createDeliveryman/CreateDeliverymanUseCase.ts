import { hash } from 'bcrypt';
import { prisma } from '../../../database/prismaClient';

interface ICreateDelyveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDelyveryman) {
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username,
        },
      },
    });

    if (deliverymanExist) {
      throw new Error('Deliveryman already exists');
    }

    // Criptografar com bcrypt
    const hashPassword = await hash(password, 10);

    // Salvar o deliveryman
    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return deliveryman;
  }
}
