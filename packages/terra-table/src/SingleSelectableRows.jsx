import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';
import TableRows from './TableRows';
import TableRow from './TableRow';

const KEYCODES = {
  ENTER: 13,
};

const propTypes = {
  /**
   * The children passed to the component
   */
  children: PropTypes.node,
  /**
   * A callback function for onClick action
   */
  onClick: PropTypes.func,
  /**
  * A callback function for onKeyDown action for tab key
  */
  onKeyDown: PropTypes.func,
};

const defaultProps = {
  onClick: undefined,
  onKeyDown: undefined,
};

class SingleSelectableRows extends React.Component {
  static selectedRowIndex(rows) {
    // Find the first row which is selected and is selectable
    for (let i = 0; i < rows.length; i += 1) {
      if (rows[i].props.isSelected && rows[i].props.isSelectable) {
        return i;
      }
    }
    return -1;
  }

  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.shouldHandleSelection = this.shouldHandleSelection.bind(this);
    this.state = { selectedIndex: SingleSelectableRows.selectedRowIndex(this.props.children) };
  }

  handleSelection(event, index) {
    this.setState({ selectedIndex: index });
  }

  shouldHandleSelection(index) {
    return index !== this.state.selectedIndex;
  }

  wrappedOnClickForRow(row, index) {
    const initialOnClick = this.props.onClick;

    return (event) => {
      if (row.props.isSelectable && this.shouldHandleSelection(index)) {
        this.handleSelection(event, index);
      }

      if (initialOnClick) {
        initialOnClick(event);
      }
    };
  }

  wrappedOnKeyDownForRow(row, index) {
    const initialOnKeyDown = this.props.onKeyDown;

    return (event) => {
      if (event.nativeEvent.keyCode === KEYCODES.ENTER) {
        if (row.props.isSelectable && this.shouldHandleSelection(index)) {
          this.handleSelection(event, index);
        }
      }

      if (initialOnKeyDown) {
        initialOnKeyDown(event);
      }
    };
  }

  newPropsForRow(row, index, onClick, onKeyDown) {
    const isSelected = this.state.selectedIndex === index;
    const newProps = { };

    // set the isSelected attribute to false for all the rows except the row whose index is set to state selectedIndex
    // This will ensure that only one row will be selected at a moment of time.
    if (isSelected !== row.props.isSelected) {
      newProps.isSelected = isSelected;
    }

    newProps.isSelectable = row.props.isSelectable;

    // If selectable, add tabIndex on rows to navigate through keyboard tab key for selectable row and add
    // onClick and onKeyDown functions.
    if (newProps.isSelectable) {
      newProps.tabIndex = '0';
      newProps.onClick = onClick;
      newProps.onKeyDown = onKeyDown;
    }

    return newProps;
  }

  clonedChildItems(rows) {
    return rows.map((row, index) => {
      if (row.type === TableRow) {
        const wrappedOnClick = this.wrappedOnClickForRow(row, index);
        const wrappedOnKeyDown = this.wrappedOnKeyDownForRow(row, index);
        const newProps = this.newPropsForRow(row, index, wrappedOnClick, wrappedOnKeyDown);
        return React.cloneElement(row, newProps);
      }
      return row;
    });
  }

  render() {
    const { children, ...customProps } = this.props;
    const clonedChildItems = this.clonedChildItems(children);
    if ('onClick' in customProps) {
      delete customProps.onClick;
    }
    if ('onKeyDown' in customProps) {
      delete customProps.onKeyDown;
    }
    return (
      <TableRows {...customProps}>
        {clonedChildItems}
      </TableRows>
    );
  }

}

SingleSelectableRows.propTypes = propTypes;
SingleSelectableRows.defaultProps = defaultProps;

export default SingleSelectableRows;
