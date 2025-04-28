import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Router } from 'src/router/entities/router.entity';


@Entity({
  name: 'connected_users',
})
export class ConnectedUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  macAddress: string;

  @Column()
  ipAddress: string;

  @Column({ nullable: true })
  hostname: string; // Optional — device name if available

  @Column({ default: true })
  isConnected: boolean;

  @Column({ type: 'timestamp' })
  connectedAt: Date;


  @ManyToOne(() => Router, (router) => router.connected_users, { onDelete: 'CASCADE' })
  router:any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}