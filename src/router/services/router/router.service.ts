import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from 'src/auth/bcrypt.service';
import { Router } from 'src/router/entities/router.entity';

import { Repository } from 'typeorm';


@Injectable()
export class RouterService implements OnModuleInit {
  constructor(
      @InjectRepository(Router)
      private readonly routerRepository: Repository<Router>,
      private readonly bcryptService: BcryptService,
  ) {}

  async onModuleInit() {
    const routerCount = await this.routerRepository.count();
    if (routerCount === 0) {
      const defaultRouter = this.routerRepository.create({
        model: 'RouterModel123',
        defaultGateway: '192.168.0.1',
        firmwareVersion: '1.0.0',
        macAddress: 'AA:BB:CC:DD:EE:FF',
        serialNumber: 'SN123456789',
        uptime: '0 hours',
        adminUsername: 'admin',
        adminPassword: await this.bcryptService.hash('admin'),
        accessPointName: 'DefaultSSID',
        accessPointPassword: await this.bcryptService.hash('admin'),
        wifiEnabled: true,
        firewallEnabled: true,
        lastWiFiEnabledAt: new Date(), // Track when WiFi was last enabled
      });
      await this.routerRepository.save(defaultRouter);
      console.log('Default router created successfully.');
    } else {
      console.log('Router already exists in the database.');
    }

    
  }

  private async updateUptime(router: Router): Promise<Router> {
    if (!router.lastWiFiEnabledAt) {
      router.lastWiFiEnabledAt = new Date();
    }

    const now = new Date();
    const timeDifference = now.getTime() - router.lastWiFiEnabledAt.getTime(); // Difference in milliseconds
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert to hours

    if (hoursDifference > 0) {
      const currentUptime = parseInt(router.uptime.split(' ')[0], 10) || 0;
      router.uptime = `${currentUptime + hoursDifference} hours`;
      router.lastWiFiEnabledAt = now; // Update the last enabled time
     return await this.routerRepository.save(router);
    }
  }

  async ShowRouterDetails(): Promise<Omit<Router, 'adminPassword' | 'accessPointPassword'>> {
    const router = await this.routerRepository.findOne({
      where: { serialNumber: 'SN123456789' },
      relations: ['connected_users'],
    });
    if (!router) {
      throw new Error('Router not found');
    }

    if (router.wifiEnabled) {
      const updated = await  this.updateUptime(router);
       if (updated) {
           router.uptime = updated.uptime;
         }
     }


    const { adminPassword, accessPointPassword, ...routerDetails } = router;
    return routerDetails;
  }

  async getRouterDetails(): Promise<Router> {
    const router = await this.routerRepository.findOne({
      where: { serialNumber: 'SN123456789' },
    });
    if (!router) {
      throw new BadRequestException('Router not found');
    }

     // Update uptime dynamically whenever details are fetched
     if (router.wifiEnabled) {
     const updated = await  this.updateUptime(router);
      if (updated) {
          router.uptime = updated.uptime;
        }
    }
    return router;
  }


  async enableWiFi(): Promise<string> {
    const router = await this.getRouterDetails();
    if (router.wifiEnabled) {
      throw new BadRequestException('WiFi is already enabled.');
    }
    router.wifiEnabled = true;
    await this.routerRepository.save(router);
    return 'WiFi has been enabled.';
  }

  async disableWiFi(): Promise<string> {
    const router = await this.getRouterDetails();
    if (!router.wifiEnabled) {
      throw new BadRequestException('WiFi is already disabled.');
    }
    router.wifiEnabled = false;

     // Update uptime before disabling WiFi
     this.updateUptime(router);

     router.wifiEnabled = false;
    router.uptime = '0 hours'; // Reset uptime when WiFi is disabled
     await this.routerRepository.save(router);
    
    return 'WiFi has been disabled.';
  }

  async enableFirewall(): Promise<string> {
    const router = await this.getRouterDetails();
    if (router.firewallEnabled) {
      throw new BadRequestException('Firewall is already enabled.');
    }
    router.firewallEnabled = true;
    await this.routerRepository.save(router);
    return 'Firewall has been enabled.';
  }

  async disableFirewall(): Promise<string> {
    const router = await this.getRouterDetails();
    if (!router.firewallEnabled) {
      throw new BadRequestException('Firewall is already disabled.');
    }
    router.firewallEnabled = false;
    await this.routerRepository.save(router);
    return 'Firewall has been disabled.';
  }

  async changePassword(newPassword: string): Promise<string> {
    if (!newPassword || newPassword.trim() === '') {
      throw new BadRequestException('Password cannot be empty.');
    }
    const router = await this.getRouterDetails();
    router.adminPassword = await this.bcryptService.hash(newPassword);
    await this.routerRepository.save(router);
    return 'Password has been changed successfully.';
  }

  async changeAccessPointName(newName: string): Promise<string> {
    if (!newName || newName.trim() === '') {
      throw new BadRequestException('Access point name cannot be empty.');
    }
    const router = await this.getRouterDetails();
    router.accessPointName = newName;
    await this.routerRepository.save(router);
    return 'Access point name has been changed successfully.';
  }


  async changeAccessPointPassword(newPassword: string): Promise<string> {
    if (!newPassword || newPassword.trim() === '') {
      throw new BadRequestException('Access point password cannot be empty.');
    }
    const router = await this.getRouterDetails();
    router.accessPointPassword = await this.bcryptService.hash(newPassword);
    await this.routerRepository.save(router);
    return 'Access point password has been changed successfully.';
  }

async resetRouter(): Promise<string> {
    const router = await this.getRouterDetails();

    router.model = 'RouterModel123';
    router.defaultGateway = '192.168.0.1';
    router.firmwareVersion = '1.0.0';
    router.macAddress = 'AA:BB:CC:DD:EE:FF';
    router.serialNumber = 'SN123456789';
    router.uptime = '0 hours';
    router.adminUsername = 'admin';
    router.adminPassword = await this.bcryptService.hash('admin');
    router.accessPointName = 'DefaultSSID';
    router.accessPointPassword = await this.bcryptService.hash('admin');
    router.wifiEnabled = true;
    router.firewallEnabled = true;

    await this.routerRepository.save(router);
    return 'Router has been reset to default settings.';
}



}