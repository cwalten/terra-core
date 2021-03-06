'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('terra-base/lib/baseStyles');

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableHeaderCell = require('./TableHeaderCell');

var _TableHeaderCell2 = _interopRequireDefault(_TableHeaderCell);

var _TableRows = require('./TableRows');

var _TableRows2 = _interopRequireDefault(_TableRows);

var _TableRow = require('./TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _TableCell = require('./TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _SingleSelectableRows = require('./SingleSelectableRows');

var _SingleSelectableRows2 = _interopRequireDefault(_SingleSelectableRows);

var _TableSubheader = require('./TableSubheader');

var _TableSubheader2 = _interopRequireDefault(_TableSubheader);

require('./Table.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  /**
   * The children passed to the component
   */
  children: _propTypes2.default.node.isRequired,
  /**
   * Whether or not the rows should be zebra striped
   */
  isStriped: _propTypes2.default.bool,
  /**
   * Whether or not the table cells should be padded
   */
  isPadded: _propTypes2.default.bool
};

var defaultProps = {
  isStriped: true,
  isPadded: true
};

var Table = function Table(_ref) {
  var children = _ref.children,
      isStriped = _ref.isStriped,
      isPadded = _ref.isPadded,
      customProps = _objectWithoutProperties(_ref, ['children', 'isStriped', 'isPadded']);

  var tableClassNames = (0, _classnames2.default)(['terra-Table', { 'terra-Table--striped': isStriped }, { 'terra-Table--padded': isPadded }, customProps.className]);
  return _react2.default.createElement(
    'table',
    _extends({}, customProps, { className: tableClassNames }),
    children
  );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
Table.Rows = _TableRows2.default;
Table.Header = _TableHeader2.default;
Table.HeaderCell = _TableHeaderCell2.default;
Table.Row = _TableRow2.default;
Table.Cell = _TableCell2.default;
Table.SingleSelectableRows = _SingleSelectableRows2.default;
Table.Subheader = _TableSubheader2.default;

exports.default = Table;