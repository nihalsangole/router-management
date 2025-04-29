import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RouterService } from '../../services/router/router.service';
import { changePasswordDto } from 'src/router/dto/router-dto';

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
    try {
      const routerDetails = await this.routerService.getRouterDetails();
      return { data: routerDetails, success: true };
    } catch (error) {
      return {
        message: error.message || 'An error occurred',
        success: false,
      };
    }
  }

  @ApiOkResponse({ description: 'WiFi has been enabled' })
  @ApiBadRequestResponse({ description: 'WiFi is already enabled' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('settings/wifi/enable')
  @HttpCode(HttpStatus.OK)
  async enableWiFi() {
    try {
      const message = await this.routerService.enableWiFi();
      return { message, success: true };
    } catch (error) {
      return {
        message: error.message || 'An error occurred',
        success: false,
      };
    }
  }

  @ApiOkResponse({ description: 'WiFi has been disabled' })
  @ApiBadRequestResponse({ description: 'WiFi is already disabled' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('settings/wifi/disable')
  @HttpCode(HttpStatus.OK)
  async disableWiFi() {
    try {
      const message = await this.routerService.disableWiFi();
      return { message, success: true };
    } catch (error) {
      return {
        message: error.message || 'An error occurred',
        success: false,
      };
    }
  }

  @ApiOkResponse({ description: 'Firewall has been enabled' })
  @ApiBadRequestResponse({ description: 'Firewall is already enabled' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('settings/firewall/enable')
  @HttpCode(HttpStatus.OK)
  async enableFirewall() {
    try {
      const message = await this.routerService.enableFirewall();
      return { message, success: true };
    } catch (error) {
      return {
        message: error.message || 'An error occurred',
        success: false,
      };
    }
  }

  @ApiOkResponse({ description: 'Firewall has been disabled' })
  @ApiBadRequestResponse({ description: 'Firewall is already disabled' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('settings/firewall/disable')
  @HttpCode(HttpStatus.OK)
  async disableFirewall() {
    try {
      const message = await this.routerService.disableFirewall();
      return { message, success: true };
    } catch (error) {
      return {
        message: error.message || 'An error occurred',
        success: false,
      };
    }
  }

  @ApiOkResponse({ description: 'Password has been changed successfully' })
  @ApiBadRequestResponse({ description: 'Password cannot be empty' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('settings/password/change')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body('password') password: string) {
    try {
      const message =
        await this.routerService.changeAccessPointPassword(password);
      return { message, success: true };
    } catch (error) {
      return {
        message: error.message || 'An error occurred',
        success: false,
      };
    }
  }

  @ApiOkResponse({ description: 'Password has been changed successfully' })
  @ApiBadRequestResponse({ description: 'Password cannot be empty' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('settings/admin-password/change')
  @HttpCode(HttpStatus.OK)
  async changeAdminPassword(@Body() changePasswordDto: changePasswordDto) {
    try {
      const message = await this.routerService.changePassword(
        changePasswordDto.password,
      );
      return { message, success: true };
    } catch (error) {
      return {
        message: error.message || 'An error occurred',
        success: false,
      };
    }
  }

  @ApiOkResponse({ description: 'Router has been reset to default settings' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('reset')
  @HttpCode(HttpStatus.OK)
  async resetRouter() {
    try {
      const message = await this.routerService.resetRouter();
      return { message, success: true };
    } catch (error) {
      return {
        message: error.message || 'An error occurred',
        success: false,
      };
    }
  }
}
