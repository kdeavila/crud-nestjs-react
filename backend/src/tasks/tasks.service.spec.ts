import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

describe('TasksService', () => {
    let service: TasksService;

    const mockTask = {
        id: 'uuid-1',
        title: 'Test task',
        description: 'desc',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const prismaMock = {
        task: {
            create: jest.fn().mockResolvedValue(mockTask),
            findMany: jest.fn().mockResolvedValue([mockTask]),
            findUnique: jest.fn().mockImplementation(({ where: { id } }) => {
                return id === mockTask.id ? Promise.resolve(mockTask) : Promise.resolve(null);
            }),
            update: jest.fn().mockResolvedValue({ ...mockTask, title: 'updated' }),
            delete: jest.fn().mockResolvedValue(mockTask),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TasksService, PrismaService],
        })
            .overrideProvider(PrismaService)
            .useValue(prismaMock)
            .compile();

        service = module.get<TasksService>(TasksService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('create should call prisma.create and return task', async () => {
        const dto = { title: 'Test task' } as any;
        const res = await service.create(dto);
        expect(prismaMock.task.create).toHaveBeenCalled();
        expect(res).toEqual(mockTask);
    });

    it('findAll should return array', async () => {
        const res = await service.findAll();
        expect(prismaMock.task.findMany).toHaveBeenCalled();
        expect(Array.isArray(res)).toBe(true);
        expect(res[0]).toEqual(mockTask);
    });

    it('findOne should return the task when exists', async () => {
        const res = await service.findOne('uuid-1');
        expect(prismaMock.task.findUnique).toHaveBeenCalledWith({ where: { id: 'uuid-1' } });
        expect(res).toEqual(mockTask);
    });

    it('findOne should throw NotFoundException when not found', async () => {
        await expect(service.findOne('no-exists')).rejects.toBeInstanceOf(NotFoundException);
    });

    it('update should call prisma.update and return updated', async () => {
        const res = await service.update('uuid-1', { title: 'updated' } as any);
        expect(prismaMock.task.update).toHaveBeenCalled();
        expect(res.title).toBe('updated');
    });

    it('remove should call prisma.delete and return deleted task', async () => {
        const res = await service.remove('uuid-1');
        expect(prismaMock.task.delete).toHaveBeenCalled();
        expect(res).toEqual(mockTask);
    });
});
