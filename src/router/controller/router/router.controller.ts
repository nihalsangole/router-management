import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RouterService } from '../../services/router/router.service';

@ApiTags('router')
@ApiBearerAuth()
@Controller('router')
export class RouterController {
  constructor(private readonly routerService: RouterService) {}

  @ApiOkResponse({ description: 'Returns the details of the router' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get('details')
  @HttpCode(HttpStatus.OK)
  async getRouterDetails() {
    return await this.routerService.getRouterDetails();
  }

  @ApiOkResponse({ description: 'WiFi has been enabled' })
  @ApiBadRequestResponse({ description: 'WiFi is already enabled' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('settings/wifi/enable')
  @HttpCode(HttpStatus.OK)
  async enableWiFi() {
    return { message: await this.routerService.enableWiFi() };
  }

  @ApiOkResponse({ description: 'WiFi has been disabled' })
  @ApiBadRequestResponse({ description: 'WiFi is already disabled' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('settings/wifi/disable')
  @HttpCode(HttpStatus.OK)
  async disableWiFi() {
    return { message: await this.routerService.disableWiFi() };
  }

  @ApiOkResponse({ description: 'Firewall has been enabled' })
  @ApiBadRequestResponse({ description: 'Firewall is already enabled' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('settings/firewall/enable')
  @HttpCode(HttpStatus.OK)
  async enableFirewall() {
    return { message: await this.routerService.enableFirewall() };
  }

  @ApiOkResponse({ description: 'Firewall has been disabled' })
  @ApiBadRequestResponse({ description: 'Firewall is already disabled' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('settings/firewall/disable')
  @HttpCode(HttpStatus.OK)
  async disableFirewall() {
    return { message: await this.routerService.disableFirewall() };
  }

  @ApiOkResponse({ description: 'Password has been changed successfully' })
  @ApiBadRequestResponse({ description: 'Password cannot be empty' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('settings/password/change')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body('password') password: string) {
    return { message: await this.routerService.changePassword(password) };
  }

  @ApiOkResponse({ description: 'Router has been reset to default settings' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('reset')
  @HttpCode(HttpStatus.OK)
  async resetRouter() {
    return { message: await this.routerService.resetRouter() };
  }
}