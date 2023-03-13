import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  old_team_id: number;

  @Column()
  new_team_id: number;

  @Column()
  start_date: string;

  @Column()
  end_date: string;
}
