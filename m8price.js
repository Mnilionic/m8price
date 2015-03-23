
/*

(function ($) {
	$(document).ready(function(){
		var $n = $('.ico-color').each(function(i){
			$el = $(this);
			$el.css({'background-color': $el.text()});
		});
		//$n.parents('.form-type-checkboxes, .form-type-radios').addClass('ico-color-list')
	});
})(jQuery);
*/

(function ($) {
  Drupal.behaviors.m8price = {
    attach: function (context, settings) {

 	    var percent_highlight = function($element, value){
			$('option', $element).each(function(){
      			var $option = $(this);
      			if (this.value > value){
      				$option.addClass('over');
      			}else{
      				$option.removeClass('over');
      			}
      		});
	    }
	    //
    	$('fieldset.m8price-wrapper', context).each(function(){

	    	var $box = $(this);
	      	var $cost = $('input[name$="[cost]"]', $box);
	      	var $added = $('input[name$="[added]"]', $box);
	      	var $original = $('input[name$="[original]"]', $box);
	      	var $percent = $('select[name$="[percent]"]', $box);
	      	var $discount = $('input[name$="[discount]"]', $box);
	      	var $value = $('input[name$="[value]"]', $box);
	      	var $profit = $('.m8price-profit', $box);

	      	$('.fieldset-wrapper', $box).append($profit);



	      	$cost.add($added).bind('change keyup', function(){
	      		var cost = Number($cost.val());
	      		var added = Number($added.val());
	      		var original = cost + added;
	      		$original.val(original.toFixed(2));
	      		$percent.change();
	      		// heightlight discount percentage
	      		var added_percent = added * 100 / original;
	      		percent_highlight($percent, added_percent);
	      	});

	      	$percent.bind('change keyup', function(){
	      		var discount = Number($percent.val()) * Number($original.val()) / 100;
	      		$discount.val(discount.toFixed(2));
	      		var value =  Number($original.val()) - discount;
	      		$value.val(value.toFixed(2));
	      		//
	      		var profit = value - Number($cost.val());
	      		if (profit >= 0){
	      			$profit.removeClass('m8price-lesion').find('label').text('Profit' + ':')
	      		}else{
	      			$profit.addClass('m8price-lesion').find('label').text('Lesion' + ':');
	      		}
	      		$profit.find('var').text(Math.abs(profit.toFixed(2)));
	      	});
	 		//
	 		$original.removeAttr('disabled').bind('change keyup', function(){
	 			var original = Number($original.val());
	 			var cost = Number($cost.val());
	      		var added = original - cost;
	      		$added.val(added.toFixed(2));
	      		$percent.change();
	      		//
	      		var added_percent = added * 100 / original;
	      		percent_highlight($percent, added_percent);
	      	});
	 		//
	      	$cost.change();
	      	//
	      	$value.parent().addClass('m8price-value');
    	})
    },
  };
})(jQuery);