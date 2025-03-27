const Project = require('../models/Project');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Error fetching projects', error: err });
  }
};

const addProject = async (req, res) => {
  try {
    const { title, description, coverimage, projectUrl, githubUrl } = req.body;
    const newProject = new Project({ title, description, coverimage, projectUrl, githubUrl });
    await newProject.save();
    res.status(201).json({ message: 'Project added successfully', project: newProject });
  } catch (err) {
    console.error('Error adding project:', err);
    res.status(500).json({ message: 'Error adding project', error: err });
  }
};



module.exports = { getProjects, addProject};