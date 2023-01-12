import { Offering } from './Offering';

export interface OfferingFile {
   offeringFileId?: number;
   offeringId?: number;
   name?: string;
   url?: string;
   offering?: Offering;
}
