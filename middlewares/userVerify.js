import jwt from 'jsonwebtoken';

export const userVerify = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' }) 
    }

    try {
        const decoded = jwt.verify(token, 'clave-secreta')
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido' }) 
    }
}
