const Journal = require('../models/Journals');
const mongoose = require('mongoose');


exports.homescreen = async (req, res, next) => {
    const perPage = 12;
    const page = parseInt(req.query.page, 10) || 1;

    const locals = {
        title: "home screen ",
        description: "our website homepage.",
    };

    try {
        // Ensure user ID is valid
        if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
            return res.status(400).send("Invalid user ID format.");
        }

        const userId = new mongoose.Types.ObjectId(req.user.id);

        // Fetch journals with pagination and filtering
        const journals = await Journal.aggregate([
            {
                $match: { user: userId },
            },
            {
                $sort: { updatedAt: -1 },
            },
            {
                $project: {
                    title: { $substr: ['$title', 0, 30] },
                    body: { $substr: ['$body', 0, 100] },
                    date:1
                },
            },
        ])
            .skip(perPage * (page - 1))
            .limit(perPage);

        // Count total journals for pagination
        const totalJournals = await Journal.countDocuments({ user: userId });

        res.render('homescreen/index', {
            userName: req.user.firstName,
            locals,
            journals,
            layout: '../views/layouts/homescreen',
            current: page,
            pages: Math.ceil(totalJournals / perPage),
        });
    } catch (error) {
        console.error("Error in homescreen:", error);
        return res.status(500).send("Internal Server Error");
    }
}



 // View spescfic journal

exports.homescreenViewJournal = async(req,res) => {
    const journal = await Journal.findById({ _id : req.params.id})
    .where({ user : req.user.id}).lean();

    if (journal){
        res.render('homescreen/viewJournals', {
            journalID : req.params.id ,
            journal,
            layout : '../views/layouts/homescreen'

        });

    }else {
        res.send("Something went wrong.")
    }


}


 //Update specfic note
 
exports.homescreenUpdateJournal = async(req,res) => {
    try {
        await Journal.findOneAndUpdate(
            { _id : req.params.id},
            {title : req.body.title , body: req.body.body ,  date: req.body.date, updatedAt: Date.now()}
        ).where({ user: req.user.id });
        res.redirect('/homescreen');

        
    } catch (error) {
        console.log(error);
        
    }
    


}



 //Delete note
 

exports.homescreenDeleteJournal = async (req,res) => {
    try {
        await Journal.deleteOne({ _id : req.params.id}).where({ user: req.user.id});
        res.redirect('/homescreen')
        
    } catch (error) {
        console.log(error);
        
    }
}



 //ADD note
 


exports.homescreenAddJournal = async (req,res) =>{
    res.render('homescreen/add', {
        layout: '../views/layouts/homescreen'
    });
}





exports.homescreenAddJournalSubmit = async (req,res) => {
    try {

        req.body.user = req.user.id;
        const journalData = {
            title: req.body.title,
            body: req.body.body,
            user: req.user.id,
            date: req.body.date || new Date() // Store date properly
        };

        await Journal.create(journalData);
        res.redirect('/homescreen');
        
    } catch (error) {
        console.log(error);
        
    }
}




 //search
 

exports.homescreenSearch = async (req,res) => {
    try {
        res.render('homescreen/search', {
            searchResult: '',
            layout: '../views/layouts/homescreen'
        })
        
    } catch (error) {
        
  
  
    }
}



exports.homescreenSearchSubmit = async (req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const searchResults = await Journal.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
          { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        ],
      }).where({ user: req.user.id });
  
      res.render("homescreen/search", {
        searchResults,
        layout: "../views/layouts/homescreen",
      });
    } catch (error) {
      console.log(error);
    }
  };



  // progile Screens:
exports.profile = async (req, res ) => {
    const locals = {
        title: "progile screen ",
        description: "our website progile page.",
    };
   res.render('homescreen/profile', {
    userName: req.user.displayName, 
    userNameF: req.user.firstName, 
    // userYear: req.UserInfo.year, 
    // userBio: req.UserInfo.bio
   });
}
exports.upprofile = async (req, res ) => {
    const locals = {
        title: "update progile screen ",
        description: "our website update progile page.",
    }
    res.render('homescreen/upprofile', {
        userName: req.user.displayName, 
       });
}





