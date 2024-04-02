import { Exam } from "./exam";
import { Student } from "./student";

export class Course {
    id: number;
    name: string;
    createAt: string;
    students: Student[] = [];
    exams: Exam[] = [];
}
