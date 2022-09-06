import { AjaxToastBootStrap } from "wbuutilities";

//
export default {
	...AjaxToastBootStrap,
	languageId:
		window.drupalSettings &&
		window.drupalSettings.path &&
		window.drupalSettings.path.currentLanguage
			? window.drupalSettings.path.currentLanguage
			: null,
	TestDomain: "http://wb-horizon.kksa",
};
