import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Industry} from "./industry.entity";
import {IndustryService} from "./industry.service";

@Module({
    imports: [TypeOrmModule.forFeature([Industry])],
    exports: [IndustryService],
})
export class IndustryModule {
}
