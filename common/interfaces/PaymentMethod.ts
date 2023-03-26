import { Customer } from './Customer';

export interface PaymentMethod {
   id: string;
   customer_id: string;
   merchant_id: string;
   user_id: string;
   nickname: string;
   has_cvv: number | boolean;
   is_default: number | boolean;
   method: string;
   person_name: string;
   card_type: string | null;
   card_last_four: string;
   card_exp: string | null;
   bank_name: string;
   bank_type: string;
   bank_holder_type: string;
   address_1: string | null;
   address_2: string | null;
   address_city: string | null;
   address_state: string | null;
   address_zip: string | null;
   address_country: string | null;
   purged_at: string | null;
   deleted_at: string | null;
   created_at: string;
   updated_at: string;
   card_exp_datetime: string[];
   is_usable_in_vt: boolean;
   is_tokenized: boolean;
   customer: Customer;
}
