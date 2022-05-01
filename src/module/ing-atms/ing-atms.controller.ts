import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { IngAtmsCreateDTO, IngAtmsUpdateDTO } from './ing-atms.dto';
import { IngAtms } from './ing-atms.model';
import { IngAtmsService } from './ing-atms.service';

@ApiTags('ingAtms')
@Controller('ingAtms')
export class IngAtmsController {
  constructor(private readonly IngAtmsService: IngAtmsService) { }

  // check access token
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiCreatedResponse({ description: "The Atm created sucessufully. " })
  @ApiForbiddenResponse({ description: "Forbidden" })
  async addIngAtms(
    @Body() ingATM: IngAtmsCreateDTO
  ): Promise<IngAtms> {
    // create a new ATM record
    const result = await this.IngAtmsService.addIngAtms(ingATM);
    return result;
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ description: "The list of all Ing atms returned sucessufully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  async getAllIngAtms() {
    // get atm list 
    const result = await this.IngAtmsService.getIngAtms();
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOkResponse({ description: "The Ing atm returned sucessufully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  async getIngAtms(@Param('id') id: string): Promise<IngAtms> {
    // get atm by id
    const result = await this.IngAtmsService.getSingleIngAtms(id);
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOkResponse({ description: "The Atm Updated." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  async updateIngAtms(
    @Param('id') id: string,
    @Body() IngAtm: IngAtmsUpdateDTO
  ): Promise<IngAtms> {
    // updated ATM record
    const result = await this.IngAtmsService.updateIngAtms(id, IngAtm);
    // return the updated ATM data
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOkResponse({ description: "The Atm Deleted." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  async removeIngAtms(@Param('id') id: string): Promise<string> {
    // delete the ATM with this id
    const result = await this.IngAtmsService.deleteIngATms(id);
    // return success message or error
    return result;
  }
}
