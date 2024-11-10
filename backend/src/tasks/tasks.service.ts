import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: number, data: Prisma.TaskUpdateInput): Promise<Task> {
    try {
      return await this.prisma.task.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`, error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`, error);
    }
  }
}
