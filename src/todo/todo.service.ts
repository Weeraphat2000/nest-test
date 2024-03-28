import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { v4 } from 'uuid';

@Injectable()
export class TodoService {
  // ประกาศตัวเอง todoArray ให้เป็น type alias
  todoArray: Todo[] = [];

  // ชื่อ function addTodo
  addTodo(titile: string, subtitle: string) {
    console.log(titile, 'Title');
    console.log(subtitle, 'Subtitle');

    // ปั่น obj ให้เหมือน class
    const todo = new Todo();
    console.log(v4());
    todo.id = v4();
    todo.title = titile;
    todo.subTitle = subtitle;

    // push obj เข้าไปใน array
    this.todoArray.push(todo);
    return 123;
  }

  getTodos() {
    // return array ออกไป
    return this.todoArray;
  }

  removeTodaById(id: string) {
    const fuond = this.todoArray.find((item) => item.id == id);
    if (!fuond) {
      throw new NotFoundException(`Todo with ${id} not found`);
    }
    this.todoArray = this.todoArray.filter((item) => item.id != id);
    return this.todoArray;
  }
}
