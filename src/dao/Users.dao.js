import { UserModel } from "./models/user.model.js";

export default class User {
    get = (params) => {
        return UserModel.find(params);
    }

    getBy = (params) => {
        return UserModel.findOne(params);
    }

    save = (doc) => {
        return UserModel.create(doc);
    }

    update = (id, doc) => {
        return UserModel.findByIdAndUpdate(id, { $set: doc });
    }

    delete = (id) => {
        return UserModel.findByIdAndDelete(id);
    }
}


fetch('http://localhost:8080/api/users').then(r => r.json()).then(console.log);
fetch('http://localhost:8080/api/pets').then(r => r.json()).then(console.log);