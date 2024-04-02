import { Question } from "./question";
import { Student } from "./student";

export class Answer {
    id: number;
    text: string;
    student: Student;
    question: Question;
}
