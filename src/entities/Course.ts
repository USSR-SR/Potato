import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentCourse } from "./StudentCourse";

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

  @OneToMany(() => StudentCourse, (studentCourse) => studentCourse.course,{nullable:true})
  studentCourses: StudentCourse []

}
