import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import {
   ApprovalState,
   Collateral,
   Location,
   OfferingType,
   ProjectPhase,
   Terms,
} from '@myideaswork/common/enums';
import { User } from 'src/users/users.entity';

@Entity()
export class Offerings {
   @PrimaryGeneratedColumn({ unsigned: true })
   offeringId: number;

   @Column({ unsigned: true })
   userId: number;

   @Column()
   name: string;

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

   @ManyToOne(() => User, (user) => user.id)
   @JoinColumn({ name: 'userId' })
   user: User;
}
