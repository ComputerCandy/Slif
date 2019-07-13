var settings = require('./config.json');

//var lightdmModule = require("./modules/lightdm.js");
//var clock = require("./modules/clock.js");
//var unsplash = require("./modules/unsplash.js");

import lightdmModule from './modules/lightdm.js';
import clock from './modules/clock.js';
import unsplash from './modules/unsplash.js';

import './style.scss';

$(document).ready(function(){
	var m = unsplash.unsplash(settings.modules.unsplash)
	if (settings.modules.unsplash.enabled) m.init();
	else m.disable();

	var m = clock.clock(settings.modules.clock);
	if (settings.modules.clock.enabled) m.init();
	else m.disable();

	m = lightdmModule.lightdm(settings.modules.lightdm)
	if (settings.modules.lightdm.enabled) m.init();
	else m.disable();

    //Add other modules here!
});