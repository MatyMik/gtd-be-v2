import { IsNotEmpty } from 'class-validator';

export class CreateMyDayDto {
  @IsNotEmpty()
  date: Date;

  hours: CreateHourHourDTO[];
}

class CreateHourHourDTO {
  @IsNotEmpty()
  hour: number;

  @IsNotEmpty()
  toDos: CreateTodoDTO[];

  @IsNotEmpty()
  breakActions: CreateTodoDTO[];
}

class CreateTodoDTO {
  description?: string;

  nextAction?: number;
}
