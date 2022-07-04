import path from "path";

import callback, { INVALID_CALLBACK_ERROR } from "./callback";
import { INVALID_PATH_ERROR } from "./main";

test(`rejects if "callback" is not a valid function`, () => {
	// @ts-ignore: This is testing an invalid parameter
	return expect(() => callback("a/fake/path", null)).toThrow(
		INVALID_CALLBACK_ERROR
	);
});

test(`successfully generates directory tree with all valid parameters`, (done) => {
	const filePath = path.resolve(__dirname, "../fixtures/dir-5");
	callback(filePath, undefined, (err: any, data: any) => {
		expect(err).toBeUndefined();
		expect(data).toMatchSnapshot();
		done();
	});
});

test(`successfully generates directory tree with no "options" parameter provided`, (done) => {
	const filePath = path.resolve(__dirname, "../fixtures/dir-5");
	callback(filePath, (err: any, data: any) => {
		expect(err).toBeUndefined();
		expect(data).toMatchSnapshot();
		done();
	});
});

test(`callback receives errors when they occur`, (done) => {
	const filePath = path.resolve(__dirname, "../fixtures/dir-5");
	callback(
		// @ts-ignore: This is testing an invalid parameter
		{
			this: "is not a valid path string",
		},
		(err: any, data: any) => {
			expect(data).toBeUndefined();
			expect(err).toEqual(INVALID_PATH_ERROR);
			done();
		}
	);
});
