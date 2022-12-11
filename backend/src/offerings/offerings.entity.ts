import {
   ApprovalState,
   Collateral,
   Location,
   OfferingType,
   ProjectPhase,
   Terms,
} from '@myideaswork/common/enums';
import { User } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

   @Column({ enum: OfferingType })
   offeringType: OfferingType;

   @Column({ enum: Location })
   location: Location;

   @Column({ enum: Collateral })
   collateral: Collateral;

   @Column({ enum: Terms })
   terms: Terms;

   @Column()
   contactEmail: string;

   @Column({ enum: ApprovalState })
   approvalState: ApprovalState;

   @Column({ enum: ProjectPhase })
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
