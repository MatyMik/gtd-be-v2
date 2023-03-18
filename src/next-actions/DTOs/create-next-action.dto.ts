import { IsNotEmpty } from 'class-validator';

export class CreateNextActionDto {
  @IsNotEmpty()
  name: string;

  tags?: number[];

  @IsNotEmpty()
  deadline: number;

  done?: boolean;

  @IsNotEmpty()
  projectId: number;

  description: string;
}
