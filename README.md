Simple Progress Bar (spb)
=================

Just a basic progress bar in html/css/js. Used as a sand box to implement some unit tests and nodejs tools :
* Karma (https://github.com/karma-runner/karma)
* Grunt (http://gruntjs.com/)
* Jasmine (https://github.com/pivotal/jasmine)
* UglifyJS (https://github.com/mishoo/UglifyJS)
* Istanbul (https://github.com/gotwarlost/istanbul)
* RequireJS (https://github.com/jrburke/requirejs)

Download
--------

[Unminified](https://github.com/ablanchet/SimpleProgressBar/blob/master/src/jquery.simpleprogressbar.js) or [Minified](https://github.com/ablanchet/SimpleProgressBar/blob/master/build/jquery.simpleprogressbar-0.1.0.min.js) ? ?

Usage
-------------

	It can be used only on a jQuery object (like $('div')), with following options
	 --> min (int)           | the minimal value of the progress bar                       | default : 0
	 --> max (int)           | the maximal value of the progress bar                       | default : 100
	 --> value (int)         | the default value when the progress bar will be initialized | default : 0
	 --> animate (bool)      | if the change of the value will be animated or not          | default : true (it looks cool)
	 --> onValueChanged (fn) | function called when the value changed                      | default : noop function.

	 Css classes :
	  The plugin will write html like :
		  <div class="progress">
			  <div class="value"></div>
		  </div>
	  So you just have to create .progress and .value classes in your css to stylize your progressbar

	 Example of uses :
		  $('#progress').simpleProgressBar() // initalize with default values
		  $('#progress').simpleProgressBar({ max: 6, value: 3 }) // initalize with custom options
		  $('#progress').simpleProgressBar(3) // on an initialized progress bar, it sets the value to 3
		  $('#progress').simpleProgressBar('+3') // on an initialized progress bar, it adds 3 to the value
		  $('#progress').simpleProgressBar('-3') // on an initialized progress bar, it removes 3 to the value
		  $('#progress').simpleProgressBar('getValue') // it returns the current value of the progress bar
		  $('#progress').simpleProgressBar('options',{ max: 100 }) // it will re-configure the progress bar with new custom options

	 And finally in order to short your scripts you can use the alias "spb" just like example before. ($('#progress').spb())
	

Home build
----------

You want to build your own version ? 

Just open a console and type

	npm install
	grunt
 
And go to the "/build" folder.
