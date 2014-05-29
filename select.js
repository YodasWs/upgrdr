if(!Array.isArray) {
	upgrdr.add('array');
}
if (!window.JSON) upgrdr.add('JSON');
$(document).ready(function() {
	$('script.datalist').each(function() {
		var datalist,list,i,j,k;

		// Load Drop Down Menus from JSON
		try {
			datalist = JSON.parse($(this).text().replace(/\s+/g, ' ').trim());
			for (i in datalist) {
				if ($('input[list="'+i+'"]').length != 1) continue;
				if (!Array.isArray(datalist[i])) continue;
				list = $('<ul>').attr('id',i).addClass('datalist');
				for (j in datalist[i]) {
					if (datalist[i][j].label && datalist[i][j].value) {
						list.append('<li data-value="' + datalist[i][j].value + '">' + datalist[i][j].label + '</li>');
					} else if (typeof datalist[i][j] == 'object') {
						for (k in datalist[i][j])
							list.append('<li data-value="' + k + '">' + datalist[i][j][k] + '</li>');
					}
				}
				$('input[list="'+i+'"]').after(list);
			}
		} catch(e) {
			return false;
		}
	});
	$('input[list]').filter(function() {
		// Check for datalist to modify
		if ($('ul#' + $(this).attr('list')).length != 1) return false;
		// Discover location and set CSS
		var eleThis = $(this);
		eleThis.css({
			cursor:'pointer'
		});
		// Build datalist menu and set interaction
		var buildMenu = function() {
			// Move for easy CSS placement
			$('ul#' + eleThis.attr('list')).appendTo('body').css({
				// Set basic CSS
				display:'none',margin:'0',position:'absolute',opacity:1,'min-width':eleThis.outerWidth(),
				top:eleThis.offset().top+eleThis.outerHeight()+'px',left:eleThis.offset().left+'px',width:'auto',
				'-webkit-box-sizing':'border-box','-moz-box-sizing':'border-box','box-sizing':'border-box'
			}).children('li').css({
				// Let users now they can click
				cursor:'pointer'
			}).click(function() {
				// Set input value
				var list = $(this).closest('ul[id].datalist').attr('id');
				$('input[list="'+list+'"]:visible').attr('value', $(this).text());
				$('input[list="'+list+'"]:hidden').attr('value',
					$(this).data('value') || $(this).text()
				);
				// Set selected attribute
				$(this).closest('ul.datalist').find('li').removeAttr('selected');
				$(this).attr('selected','selected');
			}).filter('[selected]').last().click();
// TODO: IE8 doesn't click hidden elements
//$('ul#' + eleThis.attr('list')).show().find('li[selected]').click().closest('ul#' + eleThis.attr('list')).hide();
			// Find width of datalist
			var width = $('ul#' + eleThis.attr('list')).show().outerWidth();
			$('ul#' + eleThis.attr('list')).hide();
			eleThis.css({
				// You know you like it
				'-webkit-box-sizing':'border-box','-moz-box-sizing':'border-box','box-sizing':'border-box'
			}).animate({
				// Expand to datalist width
				width:width
			}, 'slow', function() {
				// Set this as datalist's width
				$('ul#' + eleThis.attr('list')).css({
					'width':eleThis.outerWidth()
				});
			}).after(
				$('<input type="hidden"/>').attr('list', eleThis.attr('list')).attr('name', eleThis.attr('name'))
			).removeAttr('name');
		};
		// Save default height for animations
		if ($('ul#' + eleThis.attr('list')).css('height'))
			$('ul#' + eleThis.attr('list')).data('list-height', $('ul#' + eleThis.attr('list')).addClass('datalist').css('height'));
		else
			$('ul#' + eleThis.attr('list')).data('list-height', 'auto');
		if ($('ul#' + $(this).attr('list')).is(':visible'))
			// Animate list disappearance on page load
			$('ul#' + $(this).attr('list')).animate({
				opacity:0,height:0,width:0
			}, 'fast', function() {
				var list = $(this).attr('id');
				buildMenu();
			});
		else buildMenu();
		return true;
	}).attr('readonly','readonly').focus(function() {
		// Show datalist menu
		var height = $('ul#' + $(this).attr('list')).data('list-height');
		if (height == 'auto')
			height = $('ul#' + $(this).attr('list')).show().height();
		$('ul#' + $(this).attr('list')).css({
			top:$(this).offset().top+$(this).outerHeight()+'px',left:$(this).offset().left+'px',
			height:'0px',overflow:'hidden',display:'block'
		}).stop(true,true).animate({
			height:height
		}, 'slow', function() {
			$(this).css({
				height:$(this).data('height')
			}).show();
		});
	}).blur(function() {
		// Hide datalist menu
		$('ul#' + $(this).attr('list')).stop(true,true).animate({
			height:'0px'
		}, 'slow', function() {
			$(this).hide();
		});
	});
});