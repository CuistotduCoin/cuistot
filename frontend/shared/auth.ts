import { Amplify, Storage } from "../components/Amplify";
import { amplifyConfig } from "./config";

Amplify.configure(amplifyConfig);

Storage.configure({ level: "protected" });

export { Storage };
