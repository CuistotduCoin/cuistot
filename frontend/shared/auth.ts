import Amplify, { Storage } from "aws-amplify";
import { amplifyConfig } from "./config";

Amplify.configure(amplifyConfig);

Storage.configure({ level: "protected" });

export { Storage };
