var settings = {};
var compileMode = require('./compilemode.js');
if (compileMode == 'lightdm') settings = require('./config.json');

import lightdmModule from './modules/lightdm.js';
import clock from './modules/clock.js';
import unsplash from './modules/unsplash.js';

import './style.scss';

$(document).ready(function(){
	var m = unsplash.unsplash(settings.modules.unsplash);
	if (settings.modules.unsplash.enabled) m.init();
	else m.disable();

	m = clock.clock(settings.modules.clock);
	if (settings.modules.clock.enabled) m.init();
	else m.disable();

	m = lightdmModule.lightdm(settings.modules.lightdm);
	if (settings.modules.lightdm.enabled) m.init();
	else m.disable();

	//Add other modules here!
});
