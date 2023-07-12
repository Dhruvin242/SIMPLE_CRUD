import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClientDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
