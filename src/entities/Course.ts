import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Course extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  subject: string;

  @Field()
  @Column()
  author: string;

  @Field()
  @Column()
  parts: number;

  

}
