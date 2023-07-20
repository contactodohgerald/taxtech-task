"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const connection_1 = require("./src/database/connection");
const api_1 = __importDefault(require("./src/routes/api"));
const default_1 = __importDefault(require("./src/config/default"));
const app = (0, express_1.default)();
if ((0, connection_1.connection)()) {
    // app.use(express.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    //routes
    (0, api_1.default)(app);
    app.listen(default_1.default.port(), () => console.log(`app listening on port ${default_1.default.port()}`));
}
else {
    console.error('database not connected');
}
//# sourceMappingURL=server.js.map