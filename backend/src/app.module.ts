import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { RewardsModule } from './rewards/rewards.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [TasksModule, RewardsModule],
  providers: [PrismaService],
})
export class AppModule {}
