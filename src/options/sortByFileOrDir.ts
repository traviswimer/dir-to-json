import { FileInfo } from "../createDirectoryObject.js";

export default function sortByFileOrDir(childrenArray: FileInfo[]) {
	// Move directories to the beginning of the array
	return childrenArray.sort(function (a, b) {
		if (a.type === "file" && b.type === "directory") {
			return 1;
		} else if (a.type === "directory" && b.type === "file") {
			return -1;
		} else {
			return 0;
		}
	});
}
