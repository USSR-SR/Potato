import { Student } from "../entities/Student";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { FlashCard } from "../entities/FlashCard";

@InputType()
class FlashCardDetails {
  @Field()
  dataFront: string;

  @Field()
  dataBack: string;

  @Field()
  username: string;
}

@Resolver()
export class FlashCardREsolver {
  @Mutation(() => FlashCard, { nullable: true })
  async createFlashCard(
    @Arg("details") details: FlashCardDetails
  ): Promise<FlashCard | undefined> {
    const res = new FlashCard();
    res.dataFront = details.dataFront;
    res.dataBack = details.dataBack;

    const stud = await Student.findOne({ username: details.username });
    if (stud !== undefined) {
      res.student = stud;

      const con = getConnection();
      con.manager.save(res);
      return res;
    }
    return undefined;
  }

  @Query(() => [FlashCard])
  async getStudentFlashCards(
    @Arg("username") username: string
  ): Promise<FlashCard[] | undefined> {
      console.log( (
      await FlashCard.find({ relations: ["student"] })
    ))
    const flash_cards = (
      await FlashCard.find({ relations: ["student"] })
    ).filter((fc) => (fc.student.username === username));
    const cards = flash_cards.map((fc)=> fc);
    return cards;
  }
}
