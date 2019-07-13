exports.lightdm = function (config){
	var ldm = window.lightdm;
	var selectedUser = ldm.users[0];
	var password = null;
	var $user = $('#lightdm-un');
	var $pass = $('#lightdm-pw');
	var $prof = $('#lightdm-profile');

	var setupUserList = function(){
		var $list = $user;
		$list.html('');
		$.each(ldm.users, function(i){
			var u = ldm.users[i];
			var opt = new Option(u.display_name, u.username);
			$user.append(opt);
		});
	};

	var displayUserPicture = function(){
		$prof.attr('src', 'img/profile_placehold.jpg');
		if (selectedUser.image != null) $prof.attr('src', selectedUser.image);
	};

	var selectUserFromList = function(id){
		var idx = id || 0;
		selectedUser = ldm.users[idx];
		displayUserPicture();
		if (ldm._username) {
			ldm.cancel_authentication();
		}
		if (selectedUser !== null) window.start_authentication(selectedUser.name);
	};

	window.start_authentication = function(username){
		ldm.cancel_timed_login();
		ldm.start_authentication(username);
	};

	window.provide_secret = function(){
		password = $pass.val() || null;
		if (password !== null) ldm.provide_secret(password);
	};

	window.authentication_complete = function(){
		if (lightdm.is_authenticated) {
			console.log('Logged in!');
			ldm.login(ldm.authentication_user, ldm.default_session);
		}
		else {
			if (selectedUser !== null) window.start_authentication(selectedUser.name);
		}
	};

	window.show_error = function(e){
		console.log('Error: ' + e);
	};
	window.show_prompt = function(e){
		console.log('Prompt: ' + e);
	};

	var $submit = $('.lightdm .signIn');
	var retractTimeout = setTimeout(function(){}, config.timeout);
	this.init = function(){
		$('.lightdm .profile').click(function(){
			$('.lightdm').toggleClass('lightdm-mini');
			$('.lightdm').toggleClass('lightdm-large');
			$('.background').toggleClass('background-blur');
		});

		$(document).keypress(function(e){
			$('.lightdm').removeClass('lightdm-mini');
			$('.lightdm').addClass('lightdm-large');
			if (config.focusPasswordBoxOnKeystroke) $('.lightdm .password input').focus();
			$('.background').addClass('background-blur');

			retractTimeout = setTimeout(function(){
				$('.lightdm').removeClass('lightdm-large');
				$('.lightdm').addClass('lightdm-mini');
				$('.lightdm .password input').blur();
				$('.background').removeClass('background-blur');
			}, config.timeout);
		});

		$user.on('change', function(e){
			e.preventDefault();
			var idx = e.currentTarget.selectedIndex;
			selectUserFromList(idx);
		});

		$('#lightdm-form').on('submit', function(e){
			e.preventDefault();
			window.provide_secret();
		});

		setupUserList();
		selectUserFromList(0);
	};

	this.disable = function(){
		$('.module .lightdm').first().parent().hide();
	};

	return this;
};

/*
	Taken from: https://github.com/omgmog/lightdm-webkit-google/blob/master/assets/js/mock.js
    Mock data for testing your LightDM theme in the browser
*/
if (!('lightdm' in window)) {
	window.lightdm = {};
	lightdm.hostname = 'test-host';
	lightdm.languages = [
		{
			code: 'en_US',
			name: 'English(US)',
			territory: 'USA'
		},
		{
			code: 'en_UK',
			name: 'English(UK)',
			territory: 'UK'
		}
	];
	lightdm.default_language = lightdm.languages[0];
	lightdm.layouts = [
		{
			name: 'test',
			short_description: 'test description',
			short_description: 'really long epic description'
		}
	];
	lightdm.default_layout = lightdm.layouts[0];
	lightdm.layout = lightdm.layouts[0];
	lightdm.sessions = [
		{
			key: 'key1',
			name: 'session 1',
			comment: 'no comment'
		},
		{
			key: 'key2',
			name: 'session 2',
			comment: 'no comment'
		}
	];

	lightdm.default_session = lightdm.sessions[0];
	lightdm.authentication_user = null;
	lightdm.is_authenticated = false;
	lightdm.can_suspend = true;
	lightdm.can_hibernate = true;
	lightdm.can_restart = true;
	lightdm.can_shutdown = true;

	lightdm.users = [
		{
			name: 'clarkk',
			real_name: 'Superman',
			display_name: 'Clark Kent',
			image: 'https://d2ffutrenqvap3.cloudfront.net/items/2e312W101Q0R1U2a1Q2k/1756295270.jpg.x160.jpg',
			language: 'en_US',
			layout: null,
			session: null,
			logged_in: false
		},
		{
			name: 'brucew',
			real_name: 'Batman',
			display_name: 'Bruce Wayne',
			image: 'https://d2ffutrenqvap3.cloudfront.net/items/31411b1L1l1k1M062s1R/OW-blog-Batman.jpg',
			language: 'en_US',
			layout: null,
			session: null,
			logged_in: false
		},
		{
			name: 'peterp',
			real_name: 'Spiderman',
			display_name: 'Peter Parker',
			image: '',
			language: 'en_US',
			layout: null,
			session: null,
			logged_in: true
		}
	];

	lightdm.num_users = lightdm.users.length;
	lightdm.timed_login_delay = 0; // increase to simulate timed_login_delay
	lightdm.timed_login_user = lightdm.timed_login_delay > 0 ? lightdm.users[0] : null;

	lightdm.get_string_property = function(){};
	lightdm.get_integer_property = function(){};
	lightdm.get_boolean_property = function(){};
	lightdm.cancel_timed_login = function(){
		_lightdm_mock_check_argument_length(arguments, 0);

		lightdm._timed_login_cancelled = true;
	};

	lightdm.provide_secret = function(secret){
		if (typeof lightdm._username == 'undefined' || !lightdm._username) {
			throw 'must call start_authentication first';
		}
		_lightdm_mock_check_argument_length(arguments, 1);

		var user = _lightdm_mock_get_user(lightdm.username);

		// That's right, passwords are the same as the username's!
		if (!user && secret == lightdm._username) {
			lightdm.is_authenticated = true;
			lightdm.authentication_user = user;
		}
		else {
			lightdm.is_authenticated = false;
			lightdm.authentication_user = null;
			lightdm._username = null;
		}

		authentication_complete();
	};

	lightdm.start_authentication = function(username){
		_lightdm_mock_check_argument_length(arguments, 1);

		if (lightdm._username) {
			throw 'Already authenticating!';
		}
		var user = _lightdm_mock_get_user(username);
		if (!user) {
			show_error(username + ' is an invalid user');
		}
		show_prompt('Password: ');
		lightdm._username = username;
	};

	lightdm.cancel_authentication = function(){
		_lightdm_mock_check_argument_length(arguments, 0);

		if (!lightdm._username) {
			throw 'we are not authenticating';
		}
		lightdm._username = null;
	};

	lightdm.suspend = function(){
		alert('System Suspended. Bye Bye');
		document.location.reload(true);
	};

	lightdm.hibernate = function(){
		alert('System Hibernated. Bye Bye');
		document.location.reload(true);
	};

	lightdm.restart = function(){
		alert('System restart. Bye Bye');
		document.location.reload(true);
	};

	lightdm.shutdown = function(){
		alert('System Shutdown. Bye Bye');
		document.location.reload(true);
	};

	lightdm.login = function(user, session){
		_lightdm_mock_check_argument_length(arguments, 2);

		if (!lightdm.is_authenticated) {
			throw 'The system is not authenticated';
		}
		if (user !== lightdm.authentication_user) {
			throw 'this user is not authenticated';
		}

		alert('logged in successfully!!');
		document.location.reload(true);
	};

	if (lightdm.timed_login_delay > 0) {
		setTimeout(function(){
			if (!lightdm._timed_login_cancelled()) timed_login();
		}, lightdm.timed_login_delay);
	}
}
// Helper functions
var _lightdm_mock_check_argument_length = function(args, length){
	if (args.length != length) {
		throw 'incorrect number of arguments in function call';
	}
};

var _lightdm_mock_get_user = function(username){
	var user = null;
	for (var i = 0; i < lightdm.users.length; ++i) {
		if (lightdm.users[i].name == username) {
			user = lightdm.users[i];
			break;
		}
	}
	return user;
};
