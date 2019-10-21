import { errorHandler, notFoundError } from "./middleware/ErrorMiddleware";
import express from "express";
import itemRoute from "./routes/itemRoute";
import { config } from "./config/keys";
import mongoose from "mongoose";

const main = async () => {
    const app: express.Application = await express();
    await mongoose.connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true })
            .then(() => console.log("MongoDB is connected!"))
            .catch((error) => console.log(error));

    // CORS Setup
    app.use((
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods",
                "POST, GET, PUT, PATCH, DELETE");
            return res.status(200).json({ "status message": "OK" });
        };
        next();
    });

    app.use(express.json());
    app.use("/api/", itemRoute);
    app.use(errorHandler, notFoundError);

    const port = process.env.PORT || 9000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Press Ctrl + C to exit.`);
    })
};

main();

