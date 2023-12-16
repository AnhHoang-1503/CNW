export class Card {
    constructor(data) {
        this.id = data.id;
        this.word = data.word;
        this.meaning = data.meaning;
        this.example = data.example;
        this.courseId = data.courseId;
        this.img = data.img || "default_course.png";
    }
}

export class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
    }
}

export class Course {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.author = data.author;
        this.img = data.img || "default_course.png";
    }
}
