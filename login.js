 app.post("/login", async (req, res) => {
    const { email, username, password } = req.body;

    const user = await User.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    }).select("+password");

    if (!user) {
        return res.send("User not found");
    }

    const match = (password, user.password);

    if (!match) {
        return res.send("Wrong password");
    }

    res.send("Login successful");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
