if (window.jQuery || window.Zepto)
$(document).ready(function() {
	$('input[placeholder]').each(function() {
		if ($(this).val() == '') $(this).val($(this).attr('placeholder'));
		$(this).on('blur', function() {
			if ($(this).val() == '') $(this).val($(this).attr('placeholder'));
		}).on('focus', function() {
			if ($(this).val() == $(this).attr('placeholder')) $(this).val('');
		});
	});
	$('form').on('submit', function() {
		$('input[placeholder]').each(function() {
			if ($(this).val() == $(this).attr('placeholder')) $(this).val('');
		});
	});
});
