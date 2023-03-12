import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account_name: string;

  @Column()
  client_name: string;

  @Column()
  in_charge_name: string;
}
