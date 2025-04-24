import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TryOnService } from './tryon.service';
import { TryOnResolver } from './tryon.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [HttpModule],
  providers: [TryOnService, TryOnResolver, PrismaService],
})
export class TryOnModule {}
