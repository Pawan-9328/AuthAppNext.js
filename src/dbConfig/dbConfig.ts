import mongoose from "mongoose";

// database in another cont
export async function connect() {
  try {
    //! used for yes i sure ki data aygega hi ayega or also used condition [if ]
    mongoose.connect(process.env.MONGO_URI!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected ");
    });

    connection.on('error', (err) =>{
         console.log('Mongodb connection error, please make sure db is up and running' + err);
         process.exit();
         
    })
  } catch (error) {
    console.log("Something went wrong in connecting to DB");
    console.log(error);
  }
}
