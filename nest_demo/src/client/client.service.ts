import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Prisma, Client } from '@prisma/client';
import { ThrowError } from 'src/ErrorManage';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDTO } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(ClientService.name);

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  handleCron() {
    this.logger.debug('Every Day at 1AM');
  }

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  handleCronOnePM() {
    this.logger.debug('Every Day at 1PM');
  }

  @Cron(CronExpression.EVERY_HOUR)
  handleCronOne() {
    this.logger.debug('Every One Hour');
  }

  async CheckErrorInstance(error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientUnknownRequestError ||
      error instanceof Prisma.PrismaClientRustPanicError ||
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientValidationError
    ) {
      return true;
    }
    return false;
  }

  async createClient(createclientDTO: CreateClientDTO): Promise<Client> {
    try {
      return await this.prisma.client.create({
        data: createclientDTO,
      });
    } catch (error) {
      if (this.CheckErrorInstance(error)) {
        return ThrowError({
          message: error.message.split('\n').pop(),
          errorcode: HttpStatus.BAD_REQUEST,
        });
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  async getClients(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  async getSingleClient(id: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: {
        id: id,
      },
    });
    if (!client) {
      throw new NotFoundException(`client with this id ${id} not found`);
    }
    return client;
  }

  async updateClientDetails(id: string, name?: string, email?: string) {
    return this.prisma.client.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });
  }

  async deleteClient(id: string) {
    try {
      const client = await this.prisma.client.delete({
        where: {
          id,
        },
      });
      return client;
    } catch (error) {
      if (this.CheckErrorInstance(error)) {
        return ThrowError({
          message: error.message.split('\n').pop(),
          errorcode: 400,
        });
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }
}
