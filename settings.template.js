var settings = {
	modules: {
		unsplash: {
			enabled: true,
			apiEndpoint: 'https://api.unsplash.com/photos/random/?client_id=%key',
			apiKey: '',

			displayLocation: true,

			SearchQuery: {
				featured: true,
				username: '',
				orientation: '',
				searchTerm: '',
				collections: []
			},
			ImageType: 'raw'
		},
		clock: {
			enabled: true,
			timeFormat: 'hh:mm',
			updateInterval: 1000
		},
		lightdm: {
			enabled: false,
			defaultUserId: 0,
			timeout: 10000,
			focusPasswordBoxOnKeystroke: true
		}
	}
};

$(document).ready(function(){
	if (settings.modules.unsplash.enabled) unsplash(settings.modules.unsplash).init();
	else unsplash(settings.modules.unsplash).disable();
	if (settings.modules.clock.enabled) clock(settings.modules.clock).init();
	else clock(settings.modules.clock).disable();
	if (settings.modules.lightdm.enabled) lightdmModule(settings.modules.lightdm).init();
	else lightdmModule(settings.modules.lightdm).disable();
});
