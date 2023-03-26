import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { MyDay } from './entities/my-day.entity';
import { Hour } from './entities/hour.entity';
import { ToDo } from './entities/to-do-entry.entity';
import { CreateMyDayDto } from './DTOs/create-my-day.dto';

@Injectable()
export class MyDayService {
  constructor(
    @InjectRepository(MyDay)
    private myDayRepository: EntityRepository<MyDay>,
    @InjectRepository(Hour)
    private hourRepository: EntityRepository<Hour>,
    @InjectRepository(ToDo)
    private toDoRepository: EntityRepository<ToDo>,
  ) {}

  createMyDay(date: Date) {
    const myDay = new MyDay();
    myDay.date = date;
    this.myDayRepository.persist(myDay);
    return myDay;
  }

  createHour(hour: number, myDay: MyDay) {
    const newHour = new Hour();
    newHour.hour = hour;
    newHour.myDay = myDay;
    this.hourRepository.persist(newHour);
    return newHour;
  }

  createToDo(hour: Hour, description: string, nextAction: number) {
    const toDo = new ToDo();
    toDo.hour = hour;
    toDo.description = description;
    toDo.nextAction = nextAction;
    this.toDoRepository.persist(toDo);
    return toDo;
  }

  async createFullMyDay(myDay: CreateMyDayDto) {
    const newMyDay = this.createMyDay(myDay.date);
    for (const [index, hour] of myDay.hours.entries()) {
      const newHour = this.createHour(index, newMyDay);
      const newTodos = [];
      const newBreakactions = [];
      for (const toDo of hour.toDos) {
        newTodos.push(
          this.createToDo(newHour, toDo.description, toDo.nextAction),
        );
      }
      for (const toDo of hour.breakActions) {
        newBreakactions.push(
          this.createToDo(newHour, toDo.description, toDo.nextAction),
        );
      }
      newHour.toDos = newTodos;
      newHour.breakActions = newBreakactions;
      newHour.myDay = newMyDay;
    }
    return await this.myDayRepository.flush();
  }
}
