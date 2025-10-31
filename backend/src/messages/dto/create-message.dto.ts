import { IsInt, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMessageDto {
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  content!: string;

  @IsInt()
  familyId!: number;
}
