import { ResponseUserDto } from '@myideaswork/common/dtos';
import { Customer, PaymentCredentials, PaymentMethod } from '@myideaswork/common/interfaces';
import { HttpService, Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class StaxService {
   private readonly headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STAX_SANDBOX_API_KEY}`,
      Accept: 'application/json',
   };

   private readonly staxApiUrl = 'https://apiprod.fattlabs.com';

   constructor(private httpService: HttpService, private userService: UsersService) {}

   async purchaseIntroductions(
      paymentCredentials: PaymentCredentials,
      userToken: User,
   ): Promise<ResponseUserDto> {
      /* Get user information in database */
      const { user, paymentMethod } = await this.handleNewStaxRequest(
         paymentCredentials,
         userToken,
      );

      const introductionsQuantity = 10;
      // const introductionsCost = 49.95;
      const introductionsCost = 1;

      /* Charge payment method */
      const charge = await this.chargePaymentMethod(introductionsCost, paymentMethod.id);

      const updatedUser = await this.userService.updateUserPurchasedIntroductions(
         user,
         introductionsQuantity,
      );
      return this.userService.mapUserToResponseDto(updatedUser);
   }

   getCustomerPaymentMethod(customerId: string | null): Promise<PaymentMethod[]> {
      return lastValueFrom(
         this.httpService
            .get<PaymentMethod[]>(
               `https://apiprod.fattlabs.com/customer/${customerId}/payment-method`,
               {
                  headers: this.headers,
               },
            )
            .pipe(map((res) => res.data)),
      );
   }

   private async handleNewStaxRequest(
      paymentCredentials: PaymentCredentials,
      userToken: User,
   ): Promise<{ user: User; paymentMethod: PaymentMethod }> {
      /* Get user information in database */
      let user = await this.userService.findById(userToken.id);

      /* Check if user has customer_id */
      let customerId = user.customerId ?? null;

      if (!customerId) {
         // Create customer and save users customerId
         const customer = await this.createCustomer(paymentCredentials, user);
         user = await this.userService.updateUserCustomerId({ ...user }, customer.id);
      }

      /* Check if payment method exists in stax */
      let existingPaymentMethods: PaymentMethod[] = [];
      if (customerId) {
         existingPaymentMethods = await this.getCustomerPaymentMethod(user.customerId);
      }

      let matchingPaymentMethodId = existingPaymentMethods.find(
         (p) => p.id === paymentCredentials.paymentMethodId,
      );
      let matchingCardLastFour = existingPaymentMethods.find(
         (p) => p.card_last_four === `${paymentCredentials.card}`.slice(-4),
      );
      let paymentMethod = matchingPaymentMethodId ?? matchingCardLastFour ?? null;

      if (existingPaymentMethods.length === 0 || !paymentMethod) {
         /* If no payment method with customerId...Create A payment method */
         paymentMethod = await this.createPaymentMethod(paymentCredentials, customerId);
      } else {
         /* If payment method with customerId...Update A payment method */
         /* PUT to https://apiprod.fattlabs.com/payment-method/id
            See https://fattmerchant.docs.apiary.io/#reference/0/payment-methods/update-a-payment-method 
         */
      }

      return { user, paymentMethod };
   }

   private createCustomer(paymentCredentials: PaymentCredentials, user: User): Promise<Customer> {
      return lastValueFrom(
         this.httpService
            .post<Customer>(
               'https://apiprod.fattlabs.com/customer',
               {
                  firstname: paymentCredentials.firstName,
                  lastname: paymentCredentials.lastName,
                  phone: paymentCredentials.phone,
                  email: user.email,
               },
               {
                  headers: this.headers,
               },
            )
            .pipe(map((res) => res.data)),
      );
   }

   private createPaymentMethod(
      paymentCredentials: PaymentCredentials,
      customerId: string,
   ): Promise<PaymentMethod> {
      return lastValueFrom(
         this.httpService
            .post<PaymentMethod>(
               'https://apiprod.fattlabs.com/payment-method',
               {
                  customer_id: customerId,
                  method: 'card',
                  person_name: `${paymentCredentials.firstName} ${paymentCredentials.lastName}`,
                  card_number: paymentCredentials.card,
                  card_cvv: paymentCredentials.cvv,
                  card_exp: `${paymentCredentials.expirationMonth}${paymentCredentials.expirationYear}`,
               },
               {
                  headers: this.headers,
               },
            )
            .pipe(map((res) => res.data)),
      );
   }

   private chargePaymentMethod(total: number, paymentMethodId: string) {
      return lastValueFrom(
         this.httpService
            .post(
               'https://apiprod.fattlabs.com/charge',
               {
                  total,
                  currency: 'USD',
                  payment_method_id: paymentMethodId,
                  meta: {
                     subtotal: total,
                  },
                  pre_auth: false,
               },
               {
                  headers: this.headers,
               },
            )
            .pipe(map((res) => res.data)),
      );
   }
}
