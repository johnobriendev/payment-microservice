// src/services/lessonService.ts
import { LessonRequest, ValidationResult, LessonDuration } from '../types/lesson';

export class LessonService {
    // Define our pricing structure
    private readonly lessonPricing: {
        single: { [K in LessonDuration]: number };
        package: { [K in LessonDuration]: number };
    } = {
        single: {
            30: 50.00,
            45: 70.00,
            60: 90.00
        },
        package: {
            30: 180.00,
            45: 250.00,
            60: 320.00
        }
    };

    validateLesson(request: LessonRequest): ValidationResult {
        // Check if the duration is valid
        if (![30, 45, 60].includes(request.duration)) {
            return {
                isValid: false,
                error: 'Lesson duration must be either 30, 45, or 60 minutes'
            };
        }

        const duration = request.duration as LessonDuration;

        // Get the appropriate price based on duration and package type
        const price = request.isPackage 
            ? this.lessonPricing.package[duration]
            : this.lessonPricing.single[duration];
        
        // Packages always contain 4 lessons
        const numberOfLessons = request.isPackage ? 4 : 1;

        return {
            isValid: true,
            price,
            numberOfLessons
        };
    }
}