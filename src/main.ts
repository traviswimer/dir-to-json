import createDirectoryObject, { Options } from "./createDirectoryObject";

export const INVALID_PATH_ERROR = `"path" parameter must be a string`;
export const INVALID_OPTIONS_ERROR = `"options" parameter must be an object`;
export default async function dirToJson(path: string, options: Options = {}) {
	if (typeof path !== "string") {
		return Promise.reject(INVALID_PATH_ERROR);
	}
	if (typeof options !== "object") {
		return Promise.reject(INVALID_OPTIONS_ERROR);
	}

	return await createDirectoryObject(path, "", options);
}
