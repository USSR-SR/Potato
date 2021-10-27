import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";
import { StudentCourse } from "./StudentCourse";

@ObjectType()
@Entity()
export class FlashCard extends BaseEntity{
    @Field()
    @Column()
    dataFront:string

    @Field()
    @Column()
    dataBack:string

    @ManyToOne(()=>Student,(Student)=>Student.FlashCards)
    student:Student;
}