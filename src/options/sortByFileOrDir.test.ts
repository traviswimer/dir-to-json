import sortByFileOrDir from "./sortByFileOrDir";

it("should return array with directories listed before files", function () {
	var disorderedArray = [
		{ type: "file" },
		{ type: "directory" },
		{ type: "file" },
		{ type: "directory" },
		{ type: "file" },
		{ type: "directory" },
		{ type: "file" },
		{ type: "directory" },
	];

	var orderedArray = sortByFileOrDir(disorderedArray);

	expect(orderedArray.length).toEqual(disorderedArray.length);

	orderedArray.forEach(function (item, index) {
		if (index < 4) {
			expect(item.type).toEqual("directory");
		} else {
			expect(item.type).toEqual("file");
		}
	});
});
