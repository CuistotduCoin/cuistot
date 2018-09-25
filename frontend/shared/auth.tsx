import Amplify, { Storage } from "aws-amplify";
import { awsExports } from "../config";

Amplify.configure(awsExports);

Storage.configure({ level: "protected" });

export { Storage };
