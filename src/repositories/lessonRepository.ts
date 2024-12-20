import { PrismaClient, Prisma } from '@prisma/client';

interface CreateLessonData {
    duration: number;
    price: Prisma.Decimal;
    isPackage: boolean;
    numberOfLessons: number;
}

export class LessonRepository {
    constructor(private prisma: PrismaClient) {}

    async create(data: CreateLessonData) {
        return this.prisma.lesson.create({
            data: {
                duration: data.duration,
                price: data.price,
                isPackage: data.isPackage,
                numberOfLessons: data.numberOfLessons
            }
        });
    }

    async findById(id: string) {
        return this.prisma.lesson.findUnique({
            where: { id }
        });
    }
}