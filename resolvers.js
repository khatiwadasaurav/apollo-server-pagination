const { paginateResults } = require('./utils');

module.exports = {
    Query: {
        projects: async (_, { pageSize = 20, after }, { dataSources }) => {
            const allProjects = await dataSources.projectAPI.getAllProjects();
            // we want these in reverse chronological order
            allProjects.reverse();
            const projects = paginateResults({
                after,
                pageSize,
                results: allProjects
            });
            return {
                projects,
                cursor: projects.length ? projects[projects.length - 1].cursor : null,
                // if the cursor of the end of the paginated results is the same as the
                // last item in _all_ results, then there are no more results after this
                hasMore: projects.length
                    ? projects[projects.length - 1].cursor !==
                    allProjects[allProjects.length - 1].cursor
                    : false
            };
        },
        project: (_, { id }, { dataSources }) =>
            dataSources.quakeAPI.getProjectById({ projectId: id }),
        users: async (_, __, { dataSources }) => await dataSources.userAPI.getAllUsers(),
        allUsers: async (_, { pageSize = 20, after }, { dataSources }) => {
            const allUsers = await dataSources.userAPI.getAllUsers()
            allUsers.reverse();
            const users = paginateResults({
                after,
                pageSize,
                results: allUsers
            })
            return {
                users,
                cursor: users.length ? users[users.length - 1].cursor : null,
                hasMore: users.length ? users[users.length - 1].cursor !== allUsers[allUsers.length - 1].cursor : false
            }
        }
    }
}