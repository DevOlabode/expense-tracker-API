const Category = require('../models/category')


module.exports.newCategory = async(req, res)=>{
    const category = new Category({
        ...req.body,
        user : req.user._id
    });

    await category.save();
    res.status(200).json({msg : 'Created New Category Successfully', category});
};

module.exports.allCategories = async(req, res)=>{
    const category = await Category.find({user : req.user._id});

    if(!category) return res.status(404).json({error : 'No Category Found'})

    if(category.length === 0){
        return res.status(404).json({msg : 'No Category Found'})
    }

    res.status(200).json({msg : 'All Categories', category})
};

module.exports.oneCategory = async(req, res)=>{
    const category = await Category.findOne({_id : req.params.id, user : req.user._id});

    if(!category) return res.status(404).json({msg : 'Category Not Found'})
    res.send(category)
};

module.exports.editCategory = async(req,res)=>{
    const category = await Category.findOneAndUpdate({
        _id : req.params.id,
        user : req.user._id,
    },
    req.body,
    {
        new : true,
        runValidators : true
    });

    if(!category) return res.status(404).json({error : 'Category Not Found'})

    res.status(200).json({msg : `Category Info Updated Successfully`, category})
};

module.exports.deleteCategory = async(req, res)=>{ 
    const category = await Category.findOneAndDelete({ _id : req.params.id, user : req.user._id});

    if(!category) return res.status(500).json({error : 'Category Not Found'})

    res.status(200).json({msg : `Successfully Deleted the ${category.name} category`})    
}