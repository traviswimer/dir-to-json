import fs from "fs/promises";
import path from "path";
import sortByFileOrDir from "./options/sortByFileOrDir.js";

export interface Options {
	sortType?: boolean;
}

export interface FileInfo {
	parent: string;
	path: string;
	name: string;
	type: string;
	children?: FileInfo[];
}

export default async function createDirectoryObject(
	rootDir: string,
	fileName: string,
	options: Options
): Promise<FileInfo> {
	const { sortType = true } = options;

	let currentDir = path.normalize(rootDir + "/" + fileName);

	// Remove any trailing slashes. This prevents an error if rootDir is actually a file.
	currentDir = currentDir.replace(/\/+$/, "");

	// Check if file or directory
	const stats = await fs.stat(currentDir);
	const fileType = stats.isFile() ? "file" : "directory";

	const fileInfo: FileInfo = {
		parent: path.relative(rootDir, path.dirname(currentDir)),
		path: path.relative("./" + rootDir, "./" + currentDir),
		name: path.basename(currentDir),
		type: fileType,
	};

	if (fileInfo.type === "file") {
		// It's a file so we can't go any deeper
		return fileInfo;
	} else {
		// It's a directory, so prep adding children
		fileInfo.children = [];
	}

	const files = await fs.readdir(currentDir);

	// Recursively examine directory's children
	const promises = files.map((newFileName) => {
		return createDirectoryObject(
			rootDir,
			fileName + "/" + newFileName,
			options
		);
	});

	// Wait for all children to complete
	let data = await Promise.all(promises);
	if (sortType) {
		data = sortByFileOrDir(data);
	}
	fileInfo.children = data;

	return fileInfo;
}
