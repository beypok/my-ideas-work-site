import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AccountType } from '@myideaswork/common/enums';

@Entity()
export class Accounts {
   @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
   accountId: number;

   @Column()
   email: string;

   @Column()
   password: string;

   @Column()
   accountType: AccountType;
}
