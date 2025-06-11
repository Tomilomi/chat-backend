import jwt from "jsonwebtoken"


export default (req, res, next) => {
    const authorization = req.get("authorization")
    let token = ""

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        token = authorization.substring(7);
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedToken.id) {
            return res.status(401).json({ error: "Invalid token" })
        }

        req.idAccount = decodedToken.id
        req.admin = decodedToken.admin
        next()
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({ error: "Invalid token" })
    }
};