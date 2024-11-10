import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRewardDto, UpdateRewardDto } from './dto/reward.dto';

@Injectable()
export class RewardsService {
  constructor(private prisma: PrismaService) {}

  async create(createRewardDto: CreateRewardDto) {
    return this.prisma.reward.create({
      data: createRewardDto,
    });
  }

  async findAll() {
    return this.prisma.reward.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const reward = await this.prisma.reward.findUnique({
      where: { id },
    });

    if (!reward) {
      throw new NotFoundException(`Reward with ID ${id} not found`);
    }

    return reward;
  }

  async update(id: number, updateRewardDto: UpdateRewardDto) {
    try {
      return await this.prisma.reward.update({
        where: { id },
        data: updateRewardDto,
      });
    } catch (error) {
      throw new NotFoundException(`Reward with ID ${id} not found`, error);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.reward.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Reward with ID ${id} not found`, error);
    }
  }

  async claim(id: number, userXp: number) {
    const reward = await this.findOne(id);

    if (!reward.available) {
      throw new BadRequestException('This reward is not available');
    }

    if (userXp < reward.xpCost) {
      throw new BadRequestException('Not enough XP to claim this reward');
    }

    return this.prisma.reward.update({
      where: { id },
      data: { available: false },
    });
  }
}
