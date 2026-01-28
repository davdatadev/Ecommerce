export const auth = (role) => {
    return async (req, res, next) => {
        // Verificar que el usuario esté autenticado
        if (!req.user) return res.status(401).send({ error: "Unauthorized" })

        // Verificar el rol
        if (req.user.role !== role) {
            return res.status(403).send({ error: "No permissions" })
        }
        
        next()
    };
};