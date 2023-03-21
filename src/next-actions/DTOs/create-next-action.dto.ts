import { IsNotEmpty } from 'class-validator';

export class CreateNextActionDto {
  @IsNotEmpty()
  name: string;

  tags?: number[];

  @IsNotEmpty()
  deadline: Date;

  done?: boolean;

  @IsNotEmpty()
  project: number;

  description: string;

  @IsNotEmpty()
  userId: number;
}
