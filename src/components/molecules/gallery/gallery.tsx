import { GalleryItem } from '../../atoms';
import { MAX_GALLERY_IMAGES_PER_PAGE } from '../../../constants';

type GalleryProps = {
  images: string[];
};

function Gallery({images}: GalleryProps) {
  return (
    <div className="offer__gallery-container container" data-testid="gallery">
      <div className="offer__gallery">
        { images.slice(0, MAX_GALLERY_IMAGES_PER_PAGE).map((image) => <GalleryItem key={image} imageLink={image} />) }
      </div>
    </div>
  );
}

export default Gallery;
