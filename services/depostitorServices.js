import Depositor from './../models/depositor'
import DayBook from './../models/daybook';

export default  class DepositorService {
  addDepositor(req, res, next){
      var depositor  = new Depositor();
      Object.keys(req.body).map((key, index) => {
        depositor[key] = req.body[key];
      })
      this.saveDepositor(depositor , res, next)
  }

  editDepositor(req,res,next){

    Depositor.find({_id : req.body.id}).exec((err,deposit) => {
      if(err) return res.end("Error Occured" , err);
      else if(!deposit) return res.send("Depositor Not Found");
      Object.keys(req.body).map((key, index) => {
        deposit[key]  = req.body[key]
      })
      this.saveDepositor(deposit, res)
    })

  }

  getDepostitor(req, res,next){
    Depositor.find( {} , function(err , deposit){
      if(err) return res.send({ message : 'cannot find Depositor', err : err});
      return res.json(deposit);
    })
  }

  getDepostitorById(req,res,next){
    Depositor.findOne({depositorId : req.params.id}).exec((err,deposit) => {
      console.log(deposit);
      if(err) return res.end("Error Occured" , err);
      else if(!deposit) return res.send("Depositor Not Found");
      DayBook.find({depositorId : deposit._id}).exec((err , dayBook) => {
        if(err) return  res.send({message : "Conanot Load DayBook for Depost iD" , err : err})
        return  res.send({  deposit ,dayBook });
      })
    })
  }

  saveDepositor(depositor , res, next){
    try {
      depositor.save(function(err) {
        if (err) return next(err);
        res.send({
          message: 'Depositor  has been added successfully!',
          id: depositor["_id"]
        });
      });
    } catch (e) {
      res.status(404).send({ message: ' Could not save the Depositor to database due to: ' + e });
    }
  }
}
