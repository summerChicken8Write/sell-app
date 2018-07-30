/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'sell-icon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-add_circle': '&#xe906;',
		'icon-arrow_lift': '&#xe907;',
		'icon-check_circle': '&#xe908;',
		'icon-close': '&#xe909;',
		'icon-favorite': '&#xe90a;',
		'icon-keyboard_arrow_right': '&#xe90b;',
		'icon-remove_circle_outline': '&#xe90c;',
		'icon-shopping_cart': '&#xe90d;',
		'icon-thumb_down': '&#xe90e;',
		'icon-thumb_up': '&#xe90f;',
		'icon-home': '&#xe900;',
		'icon-home2': '&#xe901;',
		'icon-home3': '&#xe902;',
		'icon-office': '&#xe903;',
		'icon-newspaper': '&#xe904;',
		'icon-pencil': '&#xe905;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
