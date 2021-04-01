const Model = require('./model')
const db = require('../../network/db')
const nowDate = require('../../utils/Date')
const storeGetData = require('../getData/store')
db.Connect()

addUser = (user) => {
    const myUser = new Model(user)
    myUser.save()
}

loginUser = async (email, password) => {
    let statusLogin = false
    const user = await Model.findOne({ email: email })
    let data = {}
    console.log(user);
    if (!user) {
        return statusLogin
    }
    if (password === user.password) {
        statusLogin = true
        data = storeGetData.getData(email)
    }
    return data
}

updateUser = async (idUser, numberID, names, birdOfDate, email, phone, password, coint, experience, imageUrl) => {
    const foundUser = await Model.findOne({ _id: idUser })

    const date = nowDate()

    foundUser.numberID = numberID
    foundUser.names = names
    foundUser.birdOfDate = birdOfDate
    foundUser.email = email
    foundUser.phone = phone
    foundUser.password = password
    foundUser.registerOfDate = date
    foundUser.coint = coint
    foundUser.experience = experience
    foundUser.imageUrl = imageUrl

    const updateNew = await foundUser.save()
    return updateNew
}

deleteUser = (idUser) => {
    return Model.deleteOne({
        _id: idUser
    })
}

module.exports = {
    addUser,
    loginUser,
    updateUser,
    deleteUser,
}