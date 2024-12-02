import Task from '../Models/task.model.js'

export const getallTask= async (req,res)=>{
    try {
        const data = await Task.find({});
        res.status(200).json(data);
    } catch (error) {
      res.status(500).json({error:"Internal Server Error"});
    }
}

export const createTask = async(req,res)=>{
  try {
    const {title, description} = req.body;
    const newTask = new Task({
        title,
        description,
    });

    await newTask.save();
    res.status(201).json({
        message:"Task created Successfully",
        Task:newTask,
    })

  } catch (error) {
     console.log(error.message);
     res.status(500).json({error:"Internal Server Error"})
  }


}

export const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, status } = req.body;

        // Find and update the task
        const updatedTask = await Task.findByIdAndUpdate(
            { _id: id },
            { title, description, status },
            { new: true } // Return the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        console.log("Entry updated successfully", updatedTask);
        res.status(200).json({
            message: "Task updated successfully",
            Task: updatedTask,
        });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({
            message: "An error occurred while updating the task",
            error: error.message,
        });
    }
};


export const deleteTask = async(req,res)=>{
   try {
    const id = req.params.id;
    // Find by Id and delete
    const data = await Task.findByIdAndDelete({_id:id});
     console.log("Entry deleted Successfully");
     res.status(200).json({message:"Entry deleted Successfully"});
   } catch (error) {
      console.log(error.message);
      res.status(500).json(error);    
   }
}

export const filterstatus = async(req,res)=>{
    const status = req.params.status;
    try {
        const data = await Task.find({status:status});
        if(!data){
            return res.status(404).json({error:"No data found"});
        }
        res.status(200).json(data);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:"Internal Server Error"});
    }

}