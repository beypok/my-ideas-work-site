import { ApprovalState } from '@myideaswork/common/enums';
import { Offerings } from 'src/offerings/offerings.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Introductions {
   @PrimaryGeneratedColumn({ unsigned: true })
   introductionId!: number;

   @Column({ unsigned: true, nullable: true })
   createUserId?: number;

   @Column({ unsigned: true })
   receiveUserId!: number;

   @Column({ unsigned: true })
   offeringId!: number;

   @Column({ nullable: true })
   contactEmail: string;

   @Column()
   message: string;

   @Column({ type: 'enum', enum: ApprovalState })
   approvalState: ApprovalState;

   @ManyToOne(() => User, (user) => user.id)
   @JoinColumn({ name: 'createUserId' })
   createUser: User;

   @ManyToOne(() => User, (user) => user.id)
   @JoinColumn({ name: 'receiveUserId' })
   receiveUser: User;

   @ManyToOne(() => Offerings, (offering) => offering.offeringId)
   @JoinColumn({ name: 'offeringId' })
   offering: Offerings;
}
