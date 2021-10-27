import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { Course } from "./entities/course";
const main=async()=>{

    const con=await createConnection({
        database:"potatoDB",
        user:'postgres',
        password:'Shivral31',
        type:'postgres',
        debug:!__prod__,
        entities:[Course]
    });
};
main();
console.log("jesus lodu ")