import path from "path";

import dirToJson, { INVALID_PATH_ERROR, INVALID_OPTIONS_ERROR } from "./main";

test(`rejects if "path" is not a valid string`, () => {
	// @ts-ignore: This is testing an invalid parameter
	return expect(dirToJson()).rejects.toMatch(INVALID_PATH_ERROR);
});
test(`rejects if "options" is not a valid object`, () => {
	return expect(
		// @ts-ignore: This is testing an invalid parameter
		dirToJson("a/fake/path", "This should be an object")
	).rejects.toMatch(INVALID_OPTIONS_ERROR);
});

describe("single file", () => {
	let filePath: string;
	beforeEach(() => {
		filePath = path.resolve(__dirname, "../fixtures/file_1.txt");
	});
	test("should match snapshot", async function () {
		const data: any = await dirToJson(filePath);
		expect(data).toMatchSnapshot();
	});

	test("should resolve with no children", async function () {
		const data: any = await dirToJson(filePath);
		expect(data.children).toBeUndefined;
	});
});

describe("directory with one file", () => {
	let filePath: string;
	beforeEach(() => {
		filePath = path.resolve(__dirname, "../fixtures/dir-1");
	});
	test("should match snapshot", async function () {
		const data: any = await dirToJson(filePath);
		expect(data).toMatchSnapshot();
	});

	test("should resolve with one child", async function () {
		const data: any = await dirToJson(filePath);
		expect(data.children.length).toEqual(1);
	});
});

describe("directory with multiple files", () => {
	let filePath: string;
	beforeEach(() => {
		filePath = path.resolve(__dirname, "../fixtures/dir-2");
	});
	test("should match snapshot", async function () {
		const data: any = await dirToJson(filePath);
		expect(data).toMatchSnapshot();
	});

	test("should resolve with three children", async function () {
		const data: any = await dirToJson(filePath);
		expect(data.children.length).toEqual(3);
	});
});

describe("directory with single sub directory", () => {
	let filePath: string;
	beforeEach(() => {
		filePath = path.resolve(__dirname, "../fixtures/dir-3");
	});
	test("should match snapshot", async function () {
		const data: any = await dirToJson(filePath);
		expect(data).toMatchSnapshot();
	});

	test("should resolve with a directory child", async function () {
		const data: any = await dirToJson(filePath);
		expect(data.children[0].children.length).toEqual(1);
	});
});

describe("directory with multiple levels", () => {
	let filePath: string;
	beforeEach(() => {
		filePath = path.resolve(__dirname, "../fixtures/dir-4");
	});
	test("should match snapshot", async function () {
		const data: any = await dirToJson(filePath);
		expect(data).toMatchSnapshot();
	});

	test("should resolve with a directory child", async function () {
		const data: any = await dirToJson(filePath);
		expect(
			data.children[0].children[0].children[0].children[0].children.length
		).toEqual(2);
	});
});

describe("options.sortType", () => {
	let filePath: string;
	beforeEach(() => {
		filePath = path.resolve(__dirname, "../fixtures/dir-5");
	});
	test("should match snapshot when true", async function () {
		const data: any = await dirToJson(filePath, { sortType: true });
		expect(data).toMatchSnapshot();
	});
	test("should match snapshot when false", async function () {
		const data: any = await dirToJson(filePath, { sortType: false });
		expect(data).toMatchSnapshot();
	});
});
