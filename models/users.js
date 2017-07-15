const mongoose = require('mongoose')
        , Schema = mongoose.Schema;

const UsersSchema = new mongoose.Schema({

        
        
        email: {type: String, required: true, unique: true}, 
        password: {type: String, required: true},
        snippets: [{type: Schema.Types.ObjectId, ref: "Snippets"}]
    
});

const Users = mongoose.model('Users', UsersSchema);

const SnippetsSchema = new mongoose.Schema({

        title: {type: String, required: true}, 
        body: {type: String}, 
        notes: {type : String},
        language: {type: String},
        tags: [String],
        _user: {type: String, ref: 'Users'},
        
});

const Snippets = mongoose.model('Snippets', SnippetsSchema);

module.exports = {
        users: Users,
        snippet: Snippets
}