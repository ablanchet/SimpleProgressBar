var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/\.tests\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    baseUrl: '/base/src',
    paths: {
        'jquery': '../vendor/jquery-2.0.3',
		'spb': 'jquery.simpleprogressbar'
    },
	shim: {
		'spb' : {
			deps: ['jquery']
		}
	},
    deps: tests,
    callback: window.__karma__.start
});
