import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type_id: number;

  @Column()
  name: string;

  @Column()
  mail: string;

  @Column()
  english_level: number;

  @Column()
  tec_knowledge: string;

  @Column()
  cv: string;
}
