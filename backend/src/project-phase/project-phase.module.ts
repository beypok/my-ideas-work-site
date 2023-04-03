import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {ProjectPhase} from "./project-phase.entity";
import {ProjectPhaseService} from "./project-phase.service";
import {ProjectPhaseController} from "./project-phase.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ProjectPhase])],
    controllers: [ProjectPhaseController],
    providers: [ProjectPhaseService],
    exports: [ProjectPhaseService],
})
export class ProjectPhaseModule {}
