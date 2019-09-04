const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ProjectsSchema = new schema({
    project_name:{
        type:String,
        require:true
    },
    project_type:String,
    project_description:String,
    project_start_date:String,
    project_status:String,
    project_budget:Number,
    
});

module.exports = mongoose.model('projects', ProjectsSchema);