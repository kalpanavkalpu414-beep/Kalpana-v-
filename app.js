app.post("/signup", async (req, res) => {
    try {
        const {
            email,
            name,
            username,
            gender,
            mobile,
            address,
            password
        } = req.body;

        const exist = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (exist) {
            return res.send("User already exists");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            name,
            username,
            gender,
            mobile,
            address,
            password: hashPassword
        });

        await user.save();

        res.send("Signup successful");

    } catch (err) {
        res.send("Signup failed");
    }
});
