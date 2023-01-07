import { ApprovalState } from '@myideaswork/common/enums';
import { User } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Introductions {
   @PrimaryGeneratedColumn({ unsigned: true })
   introductionId!: number;

   @Column({ unsigned: true })
   userId: number;

   @Column()
   contactEmail: string;

   @Column()
   message: string;

   @Column({ type: 'enum', enum: ApprovalState })
   approvalState: ApprovalState;

   @ManyToOne(() => User, (user) => user.id)
   @JoinColumn({ name: 'userId' })
   user: User;
}
