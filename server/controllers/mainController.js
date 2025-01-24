//home page

exports.homepage = async (req, res ) => {
    const locals ={
       title: 'hivemind', 
       description: 'a website for group working '
   };

   res.render('index', {
       locals,
     
   });
}

//about page
exports.about = async (req, res ) => {
    const locals ={
       title: 'About - HiveMind', 
       description: 'about our website HiveMind'
   };

   res.render('about', locals);
}
