import { RESTDataSource } from 'apollo-datasource-rest';
import projectData from '../data/projects.json'
class ProjectAPI extends RESTDataSource {
    constructor() {
        super();
    }

    async getAllProjects() {
        return projectData;
    }
}
module.exports = ProjectAPI;