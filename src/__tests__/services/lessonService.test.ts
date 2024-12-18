import { LessonService } from '../../services/lessonService';
import { LessonRequest, ValidationResult } from '../../types/lesson';

describe('LessonService', () => {
    let lessonService: LessonService;

    beforeEach(() => {
        lessonService = new LessonService();
    });

    // Testing for single lessons of different durations
    it('should validate a 30-minute single lesson', () => {
        const lessonRequest: LessonRequest = {
            duration: 30,
            isPackage: false
        };

        const result: ValidationResult = lessonService.validateLesson(lessonRequest);
        
        expect(result.isValid).toBe(true);
        expect(result.price).toBe(50.00);
        expect(result.numberOfLessons).toBe(1);
    });

    it('should validate a 45-minute single lesson', () => {
        const lessonRequest: LessonRequest = {
            duration: 45,
            isPackage: false
        };

        const result: ValidationResult = lessonService.validateLesson(lessonRequest);
        
        expect(result.isValid).toBe(true);
        expect(result.price).toBe(70.00);  // Assuming $70 for a 45-minute lesson
        expect(result.numberOfLessons).toBe(1);
    });

    it('should validate a 60-minute single lesson', () => {
        const lessonRequest: LessonRequest = {
            duration: 60,
            isPackage: false
        };

        const result: ValidationResult = lessonService.validateLesson(lessonRequest);
        
        expect(result.isValid).toBe(true);
        expect(result.price).toBe(90.00);
        expect(result.numberOfLessons).toBe(1);
    });

    // Testing package validation
    it('should validate a package of four 45-minute lessons', () => {
        const lessonRequest: LessonRequest = {
            duration: 45,
            isPackage: true
        };

        const result: ValidationResult = lessonService.validateLesson(lessonRequest);
        
        expect(result.isValid).toBe(true);
        expect(result.price).toBe(250.00);  // Assuming discounted package price
        expect(result.numberOfLessons).toBe(4);
    });

    it('should reject an invalid lesson duration', () => {
        const lessonRequest: LessonRequest = {
            duration: 20,  // Invalid duration
            isPackage: false
        };

        const result: ValidationResult = lessonService.validateLesson(lessonRequest);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Lesson duration must be either 30, 45, or 60 minutes');
    });
});
