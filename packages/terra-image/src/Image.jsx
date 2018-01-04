import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import styles from './Image.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The source for the image which will be displayed.
   */
  src: PropTypes.string.isRequired,
  /**
   * Sets the style of the image from the following values; `default`, `rounded`, `circle`, `thumbnail`.
   */
  variant: PropTypes.oneOf(['default', 'rounded', 'circle', 'thumbnail']),
  /**
   * Sets the fluid behavior of the image, which is `nonfluid` by default.
   */
  isFluid: PropTypes.bool,
  /**
   * The text content that specifies an alternative text for an image.
   */
  alt: PropTypes.string.isRequired,
  /**
   * An image which will be displayed during loading and in case of src load failure
   */
  placeholder: PropTypes.string,
  /**
   * Sets the height of the image.
   */
  height: PropTypes.string,
  /**
   * Sets the width of the image.
   */
  width: PropTypes.string,
  /**
   * Function to be executed when the image load is successful.
   */
  onLoad: PropTypes.func,
  /**
   * Function to be executed when the image load errors.
   */
  onError: PropTypes.func,
};

const defaultProps = {
  variant: 'default',
  isFluid: false,
  alt: ' ',
};

class Image extends React.Component {

  constructor(props) {
    super(props);

    this.state = { isLoading: true, isError: false };
    this.classes = cx([
      'image',
      this.props.variant,
      { fluid: this.props.isFluid },
      this.props.className,
    ]);

    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnError = this.handleOnError.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // If a new image is being loaded, reset the state to loading
    if (newProps.src !== this.props.src) {
      this.setState({ isLoading: true, isError: false });
    }
  }

  handleOnLoad() {
    this.setState({ isLoading: false });
    const onLoad = this.props.onLoad;
    if (onLoad !== undefined) {
      onLoad();
    }
  }

  handleOnError() {
    this.setState({ isLoading: false, isError: true });
    const onError = this.props.onError;
    if (onError !== undefined) {
      onError();
    }
  }

  createPlaceholderImage() {
    const { placeholder, alt, height, width } = this.props;
    return (
      <img
        src={placeholder}
        alt={alt}
        height={height}
        width={width}
        className={this.classes}
      />
    );
  }

  createImage() {
    const { src, alt, height, width } = this.props;
    return (
      <img
        src={src}
        alt={alt}
        height={height}
        width={width}
        onLoad={this.handleOnLoad}
        onError={this.handleOnError}
        className={this.classes}
      />
    );
  }

  render() {
    if (this.props.placeholder) {
      if (this.state.isLoading) {
        return (
          <div>
            <div className={styles.hidden}>{this.createImage()}</div>
            <div>{this.createPlaceholderImage()}</div>
          </div>
        );
      }

      return (
        <div>
          <div>{this.state.isError ? this.createPlaceholderImage() : this.createImage()}</div>
        </div>
      );
    }

    return (
      <div>
        <div>{this.createImage()}</div>
      </div>
    );
  }
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
