import { useState } from "react";
import PropTypes from "prop-types";
import { Item, Image } from "./ImageGalleryItem.styled";
import pendingImage from "../../images/pendingImage.png";

export const ImageGalleryItem = ({ previewImage, tags, onImageSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Item>
      <Image
        src={isLoaded ? previewImage : pendingImage}
        alt={tags}
        onClick={onImageSelect}
        onLoad={handleImageLoad}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  previewImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageSelect: PropTypes.func.isRequired,
};

// export class ImageGalleryItem extends Component {
//   static propTypes = {
//     previewImage: PropTypes.string.isRequired,
//     tags: PropTypes.string.isRequired,
//     onImageSelect: PropTypes.func.isRequired,
//   }

//   state = { loaded: false }

// handleImageLoad = () => {
//   this.setState({ loaded: true })
// }

//   render() {
//     const { loaded } = this.state

//     const { previewImage, tags, onImageSelect } = this.props

// return (
//   <Item>
//     <Image
//       src={loaded ? previewImage : pendingImage}
//       alt={tags}
//       onClick={onImageSelect}
//       onLoad={this.handleImageLoad}
//     />
//   </Item>
// )
//   }
// }
