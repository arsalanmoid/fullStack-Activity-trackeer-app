const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://2211201158:DOha6YJJSPYzhuBn@cluster0.zi9uj.mongodb.net/todoApp");

// Define User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 3 },
    password: { type: String, required: true, minlength: 8 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);
// Define Todo schema
const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference the User model
        required: true,
    },
    todos: [
        {
            todoId: { type: Number, required: true },
            title: { type: String, required: true },
            description: { type: String },
            completed: { type: Boolean, default: false },
        },
    ],
});

// Initialize Models
const Todo = mongoose.model("Todo", todoSchema);

// Export Models
module.exports = { User, Todo };
