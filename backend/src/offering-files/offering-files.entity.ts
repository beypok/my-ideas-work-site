import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Offerings } from '../offerings/offerings.entity';

@Entity()
export class OfferingFiles {
   @PrimaryGeneratedColumn({ unsigned: true })
   offeringFileId: number;

   @Column({ unsigned: true })
   offeringId: number;

   @Column()
   name: string;

   @Column()
   url: string;

   @ManyToOne(() => Offerings, (offering) => offering.offeringId)
   @JoinColumn({ name: 'offeringId' })
   offering: Offerings;
}
