import { AccountType } from '@myideaswork/common/enums';
import { User as IUser } from '@myideaswork/common/interfaces';
import { Introductions } from 'src/introductions/introductions.entity';
import { Offerings } from 'src/offerings/offerings.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements IUser {
   @PrimaryGeneratedColumn({ unsigned: true })
   id!: number;

   @Column()
   email: string;

   @Column()
   password: string;

   @Column({ enum: AccountType })
   accountType: AccountType;

   /*
    isAdmin property should only be set through manually interacting with the database
    a new user should not be able to be created with this field as true through the users controller
  */
   @Column({ default: false })
   isAdmin: boolean;

   @OneToMany(() => Offerings, (offering) => offering.user, { onDelete: 'CASCADE' })
   offerings?: Offerings[];

   @OneToMany(() => Introductions, (introduction) => introduction.createUser, {
      onDelete: 'CASCADE',
   })
   createdIntroductions?: Introductions[];

   @OneToMany(() => Introductions, (introduction) => introduction.receiveUser, {
      onDelete: 'CASCADE',
   })
   receivedIntroductions?: Introductions[];
}
