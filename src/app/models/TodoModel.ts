export class TodoModel {
    id: number | string;
    name: string;
    description: string;
    completed: boolean;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.completed = false;
    }
}