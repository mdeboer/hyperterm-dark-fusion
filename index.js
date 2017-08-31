'use strict'

const foregroundColor = '#cedde0'
const backgroundColor = 'rgb(47,53,66,.65)'
const black = backgroundColor
const cyan = '#44C0C6'
const orange = '#FC8458'
const brightBlack = '#2F3542'
const brightWhite = foregroundColor
const gray = '#3d424b'
const green = '#cae359'
const lightOrange = '#D1BC92'

const colors = {
	black: backgroundColor,
	red: orange,
	green: green,
	yellow: orange,
	blue: cyan,
	magenta: orange,
	cyan: cyan,
	white: foregroundColor,
	lightBlack: backgroundColor,
	lightRed: orange,
	lightGreen: green,
	lightYellow: lightOrange,
	lightBlue: cyan,
	lightMagenta: orange,
	lightCyan: cyan,
	lightWhite: foregroundColor
}

exports.onWindow = browserWindow => browserWindow.setVibrancy('dark');

exports.decorateConfig = config => {
	return Object.assign({}, config, {
		backgroundColor,
		foregroundColor,
		borderColor: `${backgroundColor}`,
		cursorColor: `${orange}`,
		colors: colors,
		css: `
			${config.css || ''}
			.tab_tab, .tabs_borderShim {
				border: none;
				border-bottom-left-radius: 5px;
				border-bottom-right-radius: 5px;
				background-color: rgba(0,0,0,0.1);
            }
            .tab_tab.tab_active {
				border: none;
				background-color: transparent;
				border-bottom-left-radius: 0px;
				border-bottom-right-radius: 0px;
            }
			.tab_tab:last-child:not(.tab_active) {
				border-bottom-right-radius: 0;
			}
			.splitpane_pane > .term_fit {
				background-color: rgba(0,0,0,0.1);
			}
			.splitpane_pane > .term_active {
				background-color: transparent;
			}
			/*.splitpane_divider {
				border-top: 1px solid ${gray};
			}*/
		`
	})
}

exports.middleware = () => (next) => (action) => {
  switch (action.type) {
    case 'CONFIG_LOAD':
    case 'CONFIG_RELOAD':
      action.config.foregroundColor = foregroundColor
      action.config.backgroundColor = backgroundColor
      action.config.cursorColor = orange
      action.config.colors = colors
  }
  next(action)
}
