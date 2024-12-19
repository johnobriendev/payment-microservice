export interface LessonRequest {
  duration: number;
  isPackage: boolean; 
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  price?: number;
  numberOfLessons?: number;
}

export interface Lesson {
  id: string;
  duration: 30 | 45 | 60;  
  price: number;
  isPackage: boolean;
  numberOfLessons: number;
  createdAt: Date;
}

export type LessonDuration = 30 | 45 | 60;