import mongoose from "mongoose"

const ConnectToMonogDb = async () => {
   try {
      await mongoose.connect('mongodb+srv://red458718:gQsc2cY0auqqm58h@cluster0.ygbtf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
      console.log("Succesfully connected to MonogDB");
   } catch (error) {
         console.log(error.message);
   }
}

export default ConnectToMonogDb