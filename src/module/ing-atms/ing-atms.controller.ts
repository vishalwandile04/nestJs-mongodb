import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Put,
  Logger,
  LoggerService,
  Inject,
  InternalServerErrorException
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { IngAtmsCreateDTO, IngAtmsUpdateDTO } from './ing-atms.dto';
import { IngAtms } from './ing-atms.model';
import { IngAtmsService } from './ing-atms.service';

@ApiTags('ingAtms apis')
@Controller('ingAtms')
export class IngAtmsController {
  constructor(@Inject(Logger) private readonly logger: LoggerService,
    private readonly IngAtmsService: IngAtmsService) { }

  // check access token
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ description: 'New ATM record added' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async addIngAtms(
    @Body() ingATM: IngAtmsCreateDTO
  ): Promise<IngAtms> {
    this.logger.log(`Inside createATM()`);
    try {
      // create a new ATM record
      const result = await this.IngAtmsService.addIngAtms(ingATM);
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message ? error.message : 'Internal server error')
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'Fetched records successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error ' })
  async getAllIngAtms() {
    this.logger.log(`Inside getAllIngAtms()`);
    try {
      // get atm list 
      const result = await this.IngAtmsService.getIngAtms();
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message ? error.message : 'Internal server error')
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'Fetched records successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error ' })
  async getIngAtms(@Param('id') id: string): Promise<IngAtms> {
    this.logger.log(`Inside getIngAtms()`);
    try {
      // get atm by id
      const result = await this.IngAtmsService.getSingleIngAtms(id);
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message ? error.message : 'Internal server error')
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'Updated record successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async updateIngAtms(
    @Param('id') id: string,
    @Body() IngAtm: IngAtmsUpdateDTO
  ): Promise<IngAtms> {
    this.logger.log(`Inside updateIngAtms()`);
    try {
      // updated ATM record
      const result = await this.IngAtmsService.updateIngAtms(id, IngAtm);
      // return the updated ATM data
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message ? error.message : 'Internal server error')
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'Deleted record successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async removeIngAtms(@Param('id') id: string): Promise<string> {
    this.logger.log(`Inside removeIngAtms()`);
    try {
      // delete the ATM with this id
      const result = await this.IngAtmsService.deleteIngATms(id);
      // return success message or error
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message ? error.message : 'Internal server error')
    }
  }
}
