import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AccountType } from '@myideaswork/common/enums';
import { User as IUser } from '@myideaswork/common/interfaces';

@Entity()
export class User implements IUser {
   @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
   id!: number;

   @Column()
   email: string;

   @Column()
   password: string;

   @Column()
   accountType: AccountType;

   /*
    isAdmin property should only be set through manually interacting with the database
    a new user should not be able to be created with this field as true through the users controller
  */
  @Column({ default: false })
  isAdmin: boolean;
}
