import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Student extends BaseEntity {

  @Field()
  @Column()
  mobile_num: string;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column({primary:true})
  username: string;

  @Column()
  password: number;

  @OneToMany(()=> StudentCourses, (studentCourses) => studentCourses.student )
  studentCourses: StudentCourses[]

}
