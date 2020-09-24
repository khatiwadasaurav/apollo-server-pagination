const { RESTDataSource } = require('apollo-datasource-rest');
const projectData = require('../data/projects.json')
class ProjectAPI extends RESTDataSource {
    constructor() {
        super();
    }

    async getAllProjects() {
        return projectData;
    }
}
module.exports = ProjectAPI;