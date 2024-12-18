// src/services/lessonService.ts
import { LessonRequest, ValidationResult } from '../types/lesson';

export class LessonService {
    // Define our pricing structure
    private readonly lessonPricing = {
        single: {
            30: 30.00,
            45: 45.00,
            60: 60.00
        },
        package: {
            30: 110.00,  // 4 lessons at a discount
            45: 170.00,
            60: 220.00
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

        // Get the appropriate price based on duration and package type
        const price = request.isPackage 
            ? this.lessonPricing.package[request.duration]
            : this.lessonPricing.single[request.duration];
        
        // Packages always contain 4 lessons
        const numberOfLessons = request.isPackage ? 4 : 1;

        return {
            isValid: true,
            price,
            numberOfLessons
        };
    }
}