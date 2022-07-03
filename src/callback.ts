import dirToJson from "./main";
import { Options } from "./createDirectoryObject";

export const INVALID_CALLBACK_ERROR = `The "dir-to-json/callback" module requires a valid callback function`;

function callback(path: string, callbackFn: Function | undefined): void;
function callback(
	path: string,
	options?: Options,
	callbackFn?: Function | undefined
): void;
function callback(
	path: string,
	optionsOrCallbackFn: Function | Options | undefined,
	callbackFn?: Function
): void {
	let options;
	if (typeof optionsOrCallbackFn === "function") {
		options = undefined;
		callbackFn = optionsOrCallbackFn;
	} else {
		options = optionsOrCallbackFn;
	}

	if (typeof callbackFn !== "function") {
		throw new Error(INVALID_CALLBACK_ERROR);
	}

	dirToJson(path, options)
		.then((dirTree: any) => {
			callbackFn!(undefined, dirTree);
		})
		.catch((err: Error) => {
			callbackFn!(err);
		});
}

export default callback;
