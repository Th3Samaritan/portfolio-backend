const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://abdulsamad-dev:I4m0Verwatch@about-me.tx3g1.mongodb.net/portfolio?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Blog Schema
const blogSchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String,
    date: String
});
const Blog = mongoose.model('Blog', blogSchema);

// Routes
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

app.post('/api/blogs', async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save blog' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));