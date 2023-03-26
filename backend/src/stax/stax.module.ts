import {Module} from '@nestjs/common';
import {UserModule} from 'src/users/users.module';
import {StaxController} from './stax.controller';
import {StaxService} from './stax.service';

@Module({
    imports: [UserModule],
    controllers: [StaxController],
    providers: [StaxService],
    exports: [StaxService],
})
export class StaxModule {
}
