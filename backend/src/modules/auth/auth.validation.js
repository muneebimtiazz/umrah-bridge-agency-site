export const validateSignup = (req,res,next)=>{ 
    let { firstName,lastName,email,password } = req.body;

    firstName = firstName?.trim();
    lastName = lastName?.trim();
    email = email?.trim().toLowerCase();

    req.body.firstName = firstName;
    req.body.lastName = lastName;
    req.body.email = email;

    if(!firstName || !lastName || !email || !password)
    return res.status(400).json({ message:"All fields are required" });

    if(password.length < 6)
    return res.status(400).json({ message:"Password must be at least 6 characters" });

    next();
};

export const validateLogin = (req,res,next)=>{ 
    let { email,password } = req.body;

    email = email?.trim().toLowerCase();
    req.body.email = email;

    if(!email || !password)
    return res.status(400).json({ message:"Email and password are required" });

    next();
};