import app from "./app";

const PORT = process.env.PORT || 6000;

app.listen(PORT, function () {
    console.log(`Server is Working Great On Port: ${PORT} `);
});