import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";



export default function Carousel({images}){

    return (
        <div className="image-carousel">
            <ImageGallery 
                items={images} 
                showPlayButton={false}
                showThumbnails={false}
                showIndex={true}
            />
        </div>
    )
}
