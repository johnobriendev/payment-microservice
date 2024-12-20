// src/__tests__/repositories/lessonRepository.test.ts
import { LessonRepository } from '../../repositories/lessonRepository';
import { PrismaClient } from '@prisma/client';
import { Lesson } from '../../types/lesson';

describe('LessonRepository', () => {
    let prisma: PrismaClient;
    let lessonRepository: LessonRepository;

    beforeAll(() => {
        prisma = new PrismaClient();
        lessonRepository = new LessonRepository(prisma);
    });

    beforeEach(async () => {
        // Clean up the database before each test
        await prisma.order.deleteMany({});
        await prisma.lesson.deleteMany({});
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should create a single 30-minute lesson', async () => {
        const lessonData = {
            duration: 30,
            price: 30.00,
            isPackage: false,
            numberOfLessons: 1
        };

        const lesson = await lessonRepository.create(lessonData);

        expect(lesson).toMatchObject({
            ...lessonData,
            id: expect.any(String),
            createdAt: expect.any(Date)
        });
    });

    it('should create a package of 45-minute lessons', async () => {
        const lessonData = {
            duration: 45,
            price: 170.00,
            isPackage: true,
            numberOfLessons: 4
        };

        const lesson = await lessonRepository.create(lessonData);

        expect(lesson).toMatchObject({
            ...lessonData,
            id: expect.any(String),
            createdAt: expect.any(Date)
        });
    });

    it('should find a lesson by id', async () => {
        // First create a lesson
        const lessonData = {
            duration: 60,
            price: 60.00,
            isPackage: false,
            numberOfLessons: 1
        };

        const createdLesson = await lessonRepository.create(lessonData);
        
        // Then try to find it
        const foundLesson = await lessonRepository.findById(createdLesson.id);
        
        expect(foundLesson).toMatchObject(lessonData);
    });

    it('should return null for non-existent lesson id', async () => {
        const foundLesson = await lessonRepository.findById('non-existent-id');
        expect(foundLesson).toBeNull();
    });
});