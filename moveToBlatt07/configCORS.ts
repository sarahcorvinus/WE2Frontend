import express from 'express';
import cors, { CorsOptions } from 'cors';

/**
 * In app.ts aufrufen:
 * ```
 * configureCORS(app);
 * ```
 * (am besten gleich nach dem Erzeugen der app).
 * Das Paket 'cors' ist bereits installiert.
 */
export function configureCORS(app: express.Express) {

    const corsOptions: CorsOptions = {
        origin: process.env.CORS_ORIGIN ?? "https://localhost:3000",
        methods: "GET,PUT,POST,DELETE",
        allowedHeaders: "Origin,Content-Type",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true
    }
    app.use(cors(corsOptions));
    app.options('*', cors()) // enable pre-flight (request method "options") everywhere, you may want to specify that in detail in production

}
