import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProjectPhase {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;
}
