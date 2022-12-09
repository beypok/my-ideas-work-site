import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
   ApprovalState,
   Collateral,
   Location,
   OfferingType,
   ProjectPhase,
   Terms,
} from '@myideaswork/common/enums';

@Entity()
export class Offerings {
   @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
   offeringId: number;

   @Column()
   description: string;

   @Column()
   offeringType: OfferingType;

   @Column()
   location: Location;

   @Column()
   collateral: Collateral;

   @Column()
   terms: Terms;

   @Column()
   contactEmail: string;

   @Column()
   approvalState: ApprovalState;

   @Column()
   projectPhase: ProjectPhase;

   @Column({ nullable: true })
   amountRequested: number | null;

   @Column({ nullable: true })
   amountRangeStart: number | null;

   @Column({ nullable: true })
   amountRangeEnd: number | null;
}
