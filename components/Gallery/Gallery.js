import React from 'react';
import PropTypes from 'prop-types';
import './Gallery.module.css';

class Gallery extends React.Component {
  constructor() {
    super();

    this.loadImage = this.loadImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.changeRadioButton = this.changeRadioButton.bind(this);

    this.state = {
      thisImage: {},
    };
  }

  componentDidMount() {
    this.loadImage();
  }

  changeImage({ target }) {
    const { value: id } = target;

    const { pictures } = this.props;

    const selectedImage = pictures.find((picture) => picture.id === id);

    this.setState({ thisImage: selectedImage });
  }

  async loadImage() {
    const { pictures } = this.props;

    const radioButtons = document.getElementsByClassName('select-image');

    if (radioButtons.length > 0) {
      radioButtons[0].checked = true;
    }

    this.setState({ thisImage: pictures[0] });
  }

  changeRadioButton(id) {
    const radioButtons = document.getElementsByClassName('select-image');

    const radioButton = Array.from(radioButtons)
      .find((button) => button.value === id);
    radioButton.checked = true;
  }

  nextImage() {
    const { pictures } = this.props;
    const { thisImage } = this.state;

    let newPicture;

    const indexOfThisPicture = pictures.indexOf(thisImage);

    if (indexOfThisPicture < pictures.length - 1) {
      newPicture = pictures[indexOfThisPicture + 1];
      console.log(pictures.length, indexOfThisPicture);
    } else {
      [newPicture] = pictures;
    }

    this.changeRadioButton(newPicture.id);
    this.setState({ thisImage: newPicture });
  }

  previousImage() {
    const { pictures } = this.props;
    const { thisImage } = this.state;

    let newPicture;

    const indexOfThisPicture = pictures.indexOf(thisImage);

    if (indexOfThisPicture > 0) {
      newPicture = pictures[indexOfThisPicture - 1];
    } else {
      newPicture = pictures[pictures.length - 1];
    }

    this.changeRadioButton(newPicture.id);
    this.setState({ thisImage: newPicture });
  }

  render() {
    const { thisImage } = this.state;
    const { pictures } = this.props;

    return (
      <div className="gallery-container">
        <div className="image">
          <img src={ thisImage.url } alt="Product" />
        </div>

        {
          pictures.length > 1 && (
            <>
              <div className="buttons">
                <button
                  className="previous-image"
                  onClick={ this.previousImage }
                  type="button"
                >
                  <span className="material-icons">
                    chevron_left
                  </span>
                </button>

                <button className="next-image" onClick={ this.nextImage } type="button">
                  <span className="material-icons">
                    chevron_right
                  </span>
                </button>
              </div>

              <div className="checkbox-container">
                {
                  pictures.map((picture) => (
                    <label htmlFor={ picture.id } key={ picture.id } className="label">
                      <input
                        id={ picture.id }
                        type="radio"
                        name="image-selector"
                        value={ picture.id }
                        className="select-image"
                        onChange={ this.changeImage }
                        hidden
                      />
                      <span className="marker" />
                    </label>
                  ))
                }
              </div>
            </>
          )
        }
      </div>
    );
  }
}

Gallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Gallery;
