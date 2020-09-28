import { RESTDataSource } from 'apollo-datasource-rest';
import faker from 'faker'
import userDatas from '../data/users.json';
class UserAPI extends RESTDataSource {
    constructor() {
        super()
    }
    async getAllUsers() {
        const allUserData = { ...userDatas };
        let userData = []
        Object.keys(allUserData).map((data, index) => {
            if (allUserData[data].profileImageUrl) {
                let userDetails = {};
                userDetails['name'] = data;
                userDetails['profileImageUrl'] = allUserData[data].profileImageUrl
                userDetails['cursor'] = faker.random.uuid();
                userData.push(userDetails);
            }
        });
        return userData;
    }
}
module.exports = UserAPI