import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany } from "typeorm";
import { FlashCard } from "./FlashCard";
import { StudentCourse } from "./StudentCourse";

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
  password: string;

  @OneToMany(()=> StudentCourse, (studentCourse) => studentCourse.student,{nullable:true})
  studentCourses: StudentCourse[]

  @OneToMany(()=>FlashCard,(FlashCard)=>FlashCard.student)
  FlashCards: FlashCard[]

}
