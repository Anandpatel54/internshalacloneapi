exports.homepage = async (req, res, next) => {
    try{
      res.json({ message: "home page" });
    } catch(error){
      res.json(error)
    }
  }