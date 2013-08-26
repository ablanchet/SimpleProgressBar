define(['jquery', 'spb'], function($) {

	describe('The require js startup', function(){
		it('Simple progress bar should be here', function(){
			expect($(document).simpleProgressBar).toBeDefined();
		});
	});
	
	describe('The jQuery plugin', function(){
		it('should throw an error if the input is not valid', function(){
			var progress = $('<div id="progress"></div>');
			$('body').append(progress);
			expect( function(){progress.simpleProgressBar('missing');} ).toThrow();
			expect( function(){progress.simpleProgressBar($.noop);} ).toThrow();
		});
	});
	
	describe('The config part', function() {
		it('should not accept negative values for the min value', function(){
			var progress = $('<div id="progress"></div>');
			$('body').append(progress);
			expect( function(){progress.simpleProgressBar({min: -300});} ).toThrow(new Error('The min value cannot be negative'));
			
			progress.simpleProgressBar();
			expect( function(){progress.spb('options', { min: -300 });} ).toThrow(new Error('The min value cannot be negative'));
		});
	});
	
    describe('The DOM', function() {
        it('Creates the right DOM', function() {
            var progress = $('<div id="progress"></div>');
			$('body').append(progress);
			progress.simpleProgressBar();
			expect($('.value', progress).length).toBe(1);
        });
		
		it('moves the value correctly', function(){var progress = $('<div id="progress"></div>');
			$('body').append(progress);
			progress.simpleProgressBar({ animate: false });
			expect(progress.spb('getValue')).toBe(0);
			
			progress.spb(3);
			expect($('.value', progress)[0].style.width).toBe('3%');
			
		});
    });
	
	describe('The data behavior', function() {
        it('saves the right current value', function() {
            var progress = $('<div id="progress"></div>');
			$('body').append(progress);
			progress.simpleProgressBar();
			expect(progress.spb('getValue')).toBe(0);
			
			progress.spb(3);
			expect(progress.spb('getValue')).toBe(3);
			
			progress.spb('+3');
			expect(progress.spb('getValue')).toBe(6);
			
			progress.spb('-3');
			expect(progress.spb('getValue')).toBe(3);
			
			progress.spb('+10000');
			expect(progress.spb('getValue')).toBe(100);
			
			progress.spb(5000);
			expect(progress.spb('getValue')).toBe(100);
			
			progress.spb(-555);
			expect(progress.spb('getValue')).toBe(0);
			
			progress.spb('options', { max: 1000 }); 
			progress.spb(500);
			expect(progress.spb('getValue')).toBe(500);
        });
    });
});
