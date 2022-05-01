import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ImgAtmsDTO } from './img-atms.dto';
import { ImgAtms } from './img-atms.model';
import { ImgAtmsService } from './img-atms.service';

@ApiTags('imgAtms')
@Controller('imgAtms')
export class ImgAtmsController {
  constructor(private readonly imgAtmsService: ImgAtmsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ description: "The created sucessufully. " })
  @ApiForbiddenResponse({ description: "Forbidden" })
  async addImgAtms(
    @Body() ingATM: ImgAtmsDTO
  ): Promise<ImgAtms> {
    const result = await this.imgAtmsService.addImgAtms(ingATM);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ description: "The list of all img atms returned sucessufully. " })
  @ApiForbiddenResponse({ description: "Forbidden" })
  async getAllImgAtms() {
    const result = await this.imgAtmsService.getImgAtms();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ description: "The img atms returned sucessufully. " })
  @ApiForbiddenResponse({ description: "Forbidden" })
  getImgAtms(@Param('id') id: string): Promise<ImgAtms> {
    return this.imgAtmsService.getSingleImgAtms(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOkResponse({ description: "The list of all img atms returned sucessufully. " })
  @ApiForbiddenResponse({ description: "Forbidden" })
  updateImgAtms(
    @Param('id') id: string,
    @Body() imgAtm: ImgAtmsDTO
  ): Promise<ImgAtms> {
    this.imgAtmsService.updateImgAtms(id, imgAtm);
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: "The list of all img atms returned sucessufully. " })
  @ApiForbiddenResponse({ description: "Forbidden" })
  removeImgAtms(@Param('id') id: string): Promise<ImgAtms> {
    this.imgAtmsService.deleteImgATms(id);
    return null;
  }
}
