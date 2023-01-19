import { PaymentMethod } from '@myideaswork/common/interfaces';
import { Controller, Get } from '@nestjs/common';
import { Request } from '@nestjs/common/decorators';
import { UsersService } from 'src/users/users.service';
import { StaxService } from './stax.service';

@Controller('/stax')
export class StaxController {
   constructor(
      private readonly staxService: StaxService,
      private readonly userService: UsersService,
   ) {}

   @Get('/paymentMethods/me')
   async paymentMethods(@Request() req): Promise<PaymentMethod[]> {
      const user = await this.userService.findById(req.user.id);
      const paymentMethods = await this.staxService.getCustomerPaymentMethod(user.customerId);
      return paymentMethods;
   }
}

