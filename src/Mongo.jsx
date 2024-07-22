//Connectivity
const {MongoClient} = require('mongodb');

async function main() {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    try{
        await client.connect();

        console.log("Connected to the server");
        await insertDocument(client, {
            name: "MongoDB",
            url: "https://www.mongodb.com/",
            description: "MongoDB is a source-available cross-platform document-oriented database program.",
        })
    }
    catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}

    main().catch(console.error);
    async function insertDocument(client, newListing) {
        const result = await client.db("test").collection("he").insertOne(newListing);
        console.log("New listing created with the following id:", result.insertedId);
    }