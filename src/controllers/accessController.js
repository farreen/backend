const accessDataModal = require('../dataModals/accessDataModal');
const bcrypt = require('bcryptjs');
let accessControllerObj = {
    login: {},
    register: {}
}

accessControllerObj.login = async(req, res) => {
    try {
        let loginData = await accessDataModal.find({ "userEmail": req.body.email, "userPassword": req.body.password })
        if (loginData.length > 0) {
            res.status(200).json({ status: 'Success', message: "login successfully completed", userData: loginData })
                // res.status(200).send(loginData);
        } else {
            res.status(200).json({ status: 'Fail', message: "Invalid credentials", userData: [] })
        }
    } catch (err) {
        console.log("________err in  accessControllerObj.login ", err)
        res.status(500).json({ status: 'Fail', message: "Internal server error please try afyer sometime", userData: [] })
    }


    // try {
    //     console.log("Login", req.body)
    //     const { email, password } = req.body;
    //     if (email.length === 0 || password.length === 0) {
    //         res.status(400).send("cannot find blank data");
    //     } else {
    //         const user = await accessDataModal.findOne({ userEmail: email, userPassword: password })
    //         console.log("user", user);
    //         if (!user) {
    //             res.status(400).send("User doesnot exist");
    //         } else {
    //             const dbpassword = await bcrypt.compare(password, user.userPassword)
    //             console.log("dbpassword", dbpassword);
    //             if (!dbpassword) {
    //                 res.status(400).send("username and password doesnot exist");
    //             } else {
    //                 console.log("matched..")
    //                 res.status(200).send(user);
    //             }
    //         }
    //     }
    // } catch (err) {
    //     res.status(400).send(err)
    // }

}
accessControllerObj.register = async(req, ress) => {
    try {
        let result = await accessDataModal.create({
            userName: req.body.name,
            userEmail: req.body.email,
            userPassword: req.body.password
        })
        console.log("-__________saDA")
        ress.status(200).json({ status: 'Success', message: "Registration successfully completed", userData: result })
    } catch (err) {
        console.log("________err in  accessControllerObj.register ", err)
        ress.status(500).json({ status: 'Fail', message: "Internal server error please try afyer sometime", userData: [] })
    }
}

module.exports = accessControllerObj;