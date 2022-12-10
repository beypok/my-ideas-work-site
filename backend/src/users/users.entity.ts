import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { AccountType } from '@myideaswork/common/enums';
import { User as IUser } from '@myideaswork/common/interfaces';
import { Offerings } from 'src/offerings/offerings.entity';

@Entity()
export class User implements IUser {
   @PrimaryGeneratedColumn({ unsigned: true })
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

   @OneToMany(() => Offerings, (offering) => offering.user, { onDelete: 'CASCADE' })
   offering: Offerings;
}
