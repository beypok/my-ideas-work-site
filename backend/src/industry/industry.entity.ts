import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Industry {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;
}
