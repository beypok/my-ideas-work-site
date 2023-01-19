export interface PaymentCredentials {
   firstName: string;
   lastName: string;
   phone: string;
   card: string;
   cvv: string;
   expirationMonth: string;
   expirationYear: string;
   paymentMethodId?: string;
}
