var model = require('../models').slave_database;
const config = require('../config.js');

module.exports = {

  getList: async function (req, res) {
      res.setHeader('Access-Control-Allow-Origin', config.allowedUrl);
        
        try {
          model.ToDoList.findAll().then(function (toDoList) {
            console.log(toDoList)
            res.status(200).json({
              success: true,
              message: 'All data',
              data: toDoList
            });
          });
        } catch (err) {
          res.status(400).json({
            success: false,
            message: 'There is some error',
            data: null
          });
        }
          
    },

  addList: async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', config.allowedUrl);
    const { item,id } = req.body;
    console.log(req.body)
    if (!item) {
      return res.status(400).send(
        'Request missing item param'
      );
    }
        
    try {
      if(id){
        await model.ToDoList.update(
          {item: item},
          {returning: true, where: {id: id} }
        )
        .then(function (updatedRecord) {
              res.status(200).json({
                success: true,
                message: 'update data',
                data: updatedRecord
              });          
        })
        .catch(function (error){
            res.status(500).json({
              success: false,
              message:error,
              data:null
            });
        });
      }else{
         await model.ToDoList.create(req.body)
        .then(itemList => res.status(200).json({
          success: true,
          message: 'All data',
          data: itemList
        }))
      }
      
    } catch (err) {
      return res.status(400).send('There is some error');
    }    
  },
  deleteItem: async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', config.allowedUrl);
    const { id } = req.body;
    await model.ToDoList.destroy({
        where: {
            id: id
        }
    })
    .then(function (deletedRecord) {
        if(deletedRecord === 1){
            res.status(200).json({
              success: true,
              message: 'All data',
              data: deletedRecord
            });          
        }
        else
        {
            res.status(404).json({
              success: false,
              message:"record not found",
              data:null
            })
        }
    })
    .catch(function (error){
        res.status(500).json({
          success: false,
          message:error,
          data:null
        });
    });
  }
}