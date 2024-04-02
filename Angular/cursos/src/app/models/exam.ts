import { Subject } from "./subject";
import { Question } from "./question";

export class Exam {

    id: number;
    name: string;
    createAt: string;
    questions: Question[] = [];
    subject: Subject;
    answered: boolean;
}
