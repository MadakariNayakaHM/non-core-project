const User = require("./../models/userTandW");
const Task = require("./../models/userTandW");
const mongoose = require("mongoose");

exports.optimiseTask = async (req, res, next) => {
  const user = await User.find();
  const task = await Task.find();

  for (i = 0; i < user.length; i++) {
    currentUser = user[i];
    console.log(i)
    // console.log(currentUser.sum)
    if (currentUser.sum != 0) 
    {
      for (j = i + 1; j < user.length; j++) {
        if (user[j].sum < currentUser.sum && user[i].sum >15) {
          var minWeightIndex;
          var min =user[i].taw[0].weight;
          

          for (k = 0; k < user[i].taw.length; k++) 
          {
            if (min < user[i].taw[k].weight && user[i].taw[k].Active == 1) 
            {
              min = user[i].taw[k].weight;
              minWeightIndex = k;
            }
          }
        //   console.log(minWeightIndex)

          if(minWeightIndex)
          {
            const dobj = Date.now();
          const date = new Date(dobj).getDate();
          const month = new Date(dobj).getMonth();
          const year = new Date(dobj).getFullYear();
          const replaceTask = 
          {
            task: user[i].taw[minWeightIndex].task,
            weight: user[i].taw[minWeightIndex].weight,
            assignedOn: `${date}/${month}/${year}`,
            Active: 1,
          };
        //   console.log(replaceTask);
          user[j].taw.push(replaceTask);
          await user[j].save();

        //   console.log(minWeightIndex)
          user[j-1].taw[minWeightIndex].Active=0;
          user[j-1].taw[minWeightIndex].deletedOn = `${date}/${month}/${year}`;
          await user[j-1].save();

          
          }
          break;
        }
      }
    }
  }

  res.status(201).json({ status: "success" });
};
