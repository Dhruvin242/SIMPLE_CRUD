import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { PrismaService } from '../prisma/prisma.service';
import { ClientResolver } from './client.resolver';

@Module({
  controllers: [],
  providers: [ClientService, PrismaService, ClientResolver],
})
export class ClientModule {}
