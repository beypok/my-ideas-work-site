export interface Customer {
   id: string;
   firstname: string;
   lastname: string;
   company: string;
   email: string;
   cc_emails: string[];
   cc_sms: string | null;
   phone: string;
   address_1: string;
   address_2: string;
   address_city: string;
   address_state: string;
   address_zip: string;
   address_country: string;
   notes: string | null;
   reference: string;
   options: string | null;
   created_at: string;
   updated_at: string;
   deleted_at: string | null;
   allow_invoice_credit_card_payments: boolean;
   gravatar: string;
}
