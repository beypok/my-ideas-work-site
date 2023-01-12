import { Controller } from '@nestjs/common';
import { OfferingFilesService } from './offering-files.service';

@Controller('/offeringfiles')
export class OfferingFilesController {
   constructor(private readonly offeringFilesService: OfferingFilesService) {}
}

