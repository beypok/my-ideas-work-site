import {
    ApprovalState,
    Collateral,
    Industries,
    InvestorOfferingType,
    Location,
    Terms,
} from '@myideaswork/common/enums';
import {Introductions} from 'src/introductions/introductions.entity';
import {OfferingFiles} from 'src/offering-files/offering-files.entity';
import {User} from 'src/users/users.entity';
import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Industry} from "src/industry/industry.entity";
import {ProjectPhase} from "src/project-phase/project-phase.entity";

@Entity()
export class Offerings {
   @PrimaryGeneratedColumn({ unsigned: true })
    offeringId: number;

    @Column({unsigned: true})
    userId: number;

    @Column()
    name: string;

    @Column({nullable: true})
    description?: string;

    @Column({enum: InvestorOfferingType, nullable: true})
    investorOfferingType?: InvestorOfferingType;

    @Column({enum: Industries, nullable: true})
    industry?: Industries;

    @Column({enum: Location})
    location: Location;

    @Column({enum: Collateral})
    collateral: Collateral;

    @Column({enum: Terms})
    terms: Terms;

    @Column()
    contactEmail: string;

    @Column({enum: ApprovalState})
    approvalState: ApprovalState;

    @ManyToMany(() => ProjectPhase)
    @JoinTable({
        name: "offerings_project_phase",
        joinColumn: { name: "offeringId", referencedColumnName: "offeringId" },
        inverseJoinColumn: { name: "projectPhaseId" }
    })
    projectPhases: ProjectPhase[];

    @Column({nullable: true})
    amountRequested: number | null;

    @Column({nullable: true})
    amountRangeStart: number | null;

    @Column({nullable: true})
    amountRangeEnd: number | null;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({name: 'userId'})
    user: User;

    @OneToMany(() => Introductions, (introduction) => introduction.offering)
    introductions: Introductions[];

    @ManyToMany(() => Industry)
    @JoinTable({
        name: "offerings_industry_focus",
        joinColumn: { name: "offeringId", referencedColumnName: "offeringId" },
        inverseJoinColumn: { name: "industryId" }
    })
    industryFocus: Industry[];

    @OneToMany(() => OfferingFiles, (offeringFile) => offeringFile.offering)
    offeringFiles: OfferingFiles[];
}
