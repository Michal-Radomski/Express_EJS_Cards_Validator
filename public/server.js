"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
// Import routes
const indexRouter_1 = __importDefault(require("./indexRouter"));
// The server
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("combined"));
// View engine
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
//* Favicon
app.get("/favicon.ico", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname + "/public/favicon.png"));
});
// // Test Route
// app.get("/test", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>Server is running</h1>");
// });
//Route middleware
app.use("/", indexRouter_1.default);
// Port
const port = (process.env.PORT || 5000);
const server = http_1.default.createServer(app);
server.listen({ port: port }, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    // For testing only
    console.log("Current Time:", new Date().toLocaleTimeString());
});
