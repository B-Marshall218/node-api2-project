const server = require("./server.js")

const PORT = 3000;
server.listen(PORT, () => {
    console.log("Listening on localhost: ", PORT);

})

// server.listen(3000, () => {
//     console.log('\n*** Server Running on http://localhost:3000 ***\n');
// });