exports.unsplash = function(config){
	this.disable = function(){
		$('.foreground .module .unsplash').parent().hide();
	};

	this.init = function(){
		this.ImageInformation = {};
		this.randomImageUrl = function(){
			var parameters = '';
			var s = config.SearchQuery;
			if (s.featured) parameters += '&featured';
			if (s.username !== '') parameters += '&username=' + s.username;
			if (s.orientation !== '') parameters += '&orientation=' + s.orientation;
			if (s.searchTerm !== '') parameters += '&query=' + s.searchTerm;
			if (s.collections.length > 0) {
				parameters += '&collections=';
				s.collections.forEach((c) => {
					parameters += c + ',';
				});
				parameters = parameters.slice(0, -1);
			}

			var url = config.apiEndpoint.replace('%key', config.apiKey) + parameters;
			return url;
		};

		$.ajax({
			url: this.randomImageUrl(),
			success: function(res){
				this.ImageInformation = res;
				console.log(res);
				var url = res.urls[config.ImageType];
				$('.background .unsplash .image').first().css('background-image', 'url(' + url + ')');
				if (!config.displayLocation || !res.location || !res.location.country)
					$('.foreground .module .unsplash .floating .location .text').hide();
				else
					$('.foreground .module .unsplash .floating .location .text')
						.first()
						.text((res.location.city ? res.location.city + ', ' : '') + res.location.country);
			}
		});
	};

	return this;
};
