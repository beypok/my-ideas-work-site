import {Type} from 'class-transformer';
import {ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsInt, IsOptional, ValidateNested,} from 'class-validator';
import {ApprovalState, Collateral, InvestorOfferingType, Location, ProjectPhase, Terms,Industries} from '../../enums';
import {BaseOfferingDto} from './BaseOffering.dto';
import {ResponseIndustryDto} from "../industry";
import {ResponseProjectPhaseDto} from "../project-phase";

export class UpdateOfferingsDto {
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => UpdateOfferingDto)
    items!: UpdateOfferingDto[];
}

export class UpdateOfferingDto extends BaseOfferingDto {
    @IsInt()
    offeringId!: number;

    @IsOptional()
    override name!: string;

    @IsOptional()
    override description!: string;

    @IsOptional()
    override investorOfferingType!: InvestorOfferingType;

    @IsOptional()
    override industry!: Industries;

    @IsOptional()
    override industryFocus!: ResponseIndustryDto [];

    @IsEnum(Location)
    @IsOptional()
    override location!: Location;

    @IsEnum(Collateral)
    @IsOptional()
    override collateral!: Collateral;

    @IsEnum(Terms)
    @IsOptional()
    override terms!: Terms;

    @IsEmail()
    @IsOptional()
    override contactEmail!: string;

    @IsEnum(ApprovalState)
    @IsOptional()
    override approvalState!: ApprovalState;

    @IsOptional()
    override projectPhases!: ResponseProjectPhaseDto[];

    @IsOptional()
    override amountRequested!: number | null;

    @IsOptional()
    override amountRangeStart!: number | null;

    @IsOptional()
    override amountRangeEnd!: number | null;
}
