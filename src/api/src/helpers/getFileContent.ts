import {readFileSync} from "fs";

export default (filePath: string): string => {
    return readFileSync( filePath, 'utf-8')
}
