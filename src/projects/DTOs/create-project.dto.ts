import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  tags?: number[];

  deadline?: number;

  active?: boolean;

  done?: boolean;

  @IsNotEmpty()
  topicId: number;
}
