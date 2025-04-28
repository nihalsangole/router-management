import { ApiProperty } from '@nestjs/swagger';
import { ConnectedUser } from 'src/users/entities/connectedUser.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';


@Entity({
  name: 'routers',
})
export class Router {
  @ApiProperty({
    description: 'ID of the router',
    example: 1,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Model of the router',
    example: 'RouterModel123',
  })
  @Column({ default: 'RouterModel123', nullable: false })
  model: string;

  @ApiProperty({
    description: 'Default gateway of the router',
    example: '192.168.0.1',
  })
  @Column({ default: '192.168.0.1', nullable: false })
  defaultGateway: string;

  @ApiProperty({
    description: 'Firmware version of the router',
    example: '1.0.0',
  })
  @Column({ default: '1.0.0', nullable: false })
  firmwareVersion: string;

  @ApiProperty({
    description: 'MAC address of the router',
    example: 'AA:BB:CC:DD:EE:FF',
  })
  @Column({ default: '00:00:00:00:00:00', nullable: false })
  macAddress: string;

  @ApiProperty({
    description: 'Serial number of the router',
    example: 'SN123456789',
  })
  @Column({ default: 'DEFAULT123456', nullable: false })
  serialNumber: string;

  @ApiProperty({
    description: 'Uptime of the router',
    example: '48 hours',
  })
  @Column({ default: '0 hours' })
  uptime: string;

  @ApiProperty({
    description: 'Admin username for the router',
    example: 'admin',
  })
  @Column({ default: 'admin', nullable: false })
  adminUsername: string;

  @ApiProperty({
    description: 'Admin password for the router',
    example: 'securepassword123',
  })
  @Column({ nullable: false })
  adminPassword: string;

  @ApiProperty({
    description: 'Access point name (SSID) of the router',
    example: 'MyWiFiNetwork',
  })
  @Column({ nullable: false })
  accessPointName: string;

  @ApiProperty({
    description: 'Access point password of the router',
    example: 'securepassword123',
  })
  @Column({ nullable: false })
  accessPointPassword: string;

  @ApiProperty({
    description: 'WiFi status of the router',
    example: true,
  })
  @Column({ default: true, nullable: false })
  wifiEnabled: boolean;

  @ApiProperty({
    description: 'Firewall status of the router',
    example: true,
  })
  @Column({ default: true, nullable: false })
  firewallEnabled: boolean;

  @ApiProperty({
    description: 'Created date of the router record',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Updated date of the router record',
  })
  @UpdateDateColumn()
  updatedAt: Date;


  @ApiProperty({
    description: 'Last wifi enabled date of the router',
  })
  @Column({ nullable: true })
  lastWiFiEnabledAt: Date;


  @OneToMany(() => ConnectedUser, (connectedUser) => connectedUser.router)
  connected_users: ConnectedUser[];

  
}