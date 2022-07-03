import sortByFileOrDir from "./sortByFileOrDir";

it("should return array with directories listed before files", function () {
	const fileObject = {
		parent: "",
		path: "fake-file.txt",
		name: "fake-file.txt",
		type: "file",
	};
	const dirObject = {
		parent: "",
		path: "fake-dir",
		name: "fake-dir",
		type: "directory",
		children: [
			{
				parent: "fake-dir",
				path: "fake-dir/fake-file.txt",
				name: "fake-file.txt",
				type: "file",
			},
		],
	};
	var disorderedArray = [
		fileObject,
		dirObject,
		fileObject,
		dirObject,
		fileObject,
		dirObject,
		fileObject,
		dirObject,
	];

	var orderedArray = sortByFileOrDir(disorderedArray);

	expect(orderedArray.length).toEqual(disorderedArray.length);

	orderedArray.forEach(function (item: any, index: number) {
		if (index < 4) {
			expect(item.type).toEqual("directory");
		} else {
			expect(item.type).toEqual("file");
		}
	});
});
