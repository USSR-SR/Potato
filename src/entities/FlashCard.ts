import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";

@ObjectType()
@Entity()
export class FlashCard extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id:number;
    @Field()
    @Column()
    dataFront:string

    @Field()
    @Column()
    dataBack:string

    @ManyToOne(()=>Student,(Student)=>Student.FlashCards)
    student:Student;
}