import { useState, useEffect } from "react";
import { StyledApp } from "./App.styled";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { Spinner } from "../Spinner/Spinner";
import { Api } from "../../services/api";
import { Notify } from "../../services/notifications";

export const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setStatus("pending");

    Api.getImages(searchQuery, page)
      .then((images) => {
        if (!images.length) {
          throw new Error();
        }

        setImages((prevImages) => [...prevImages, ...images]);
        setStatus("resolve");

        page > 1 &&
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
      })
      .catch(() => {
        setStatus("idle");

        Notify.notFound(searchQuery);
      });
  }, [searchQuery, page]);

  const resetState = () => {
    setSearchQuery("");
    setPage(1);
    setImages([]);
    setSelectedImage(null);
    setStatus("idle");
  };

  const onSubmit = (query) => {
    const repeatedQuery = query === searchQuery;

    if (repeatedQuery) {
      return;
    }

    resetState();
    setSearchQuery(query);
  };

  const onModalClose = () => {
    setSelectedImage(null);

    document.body.style.overflow = "";
  };

  const onImageSelect = (src, alt) => {
    setSelectedImage({ src, alt });

    document.body.style.overflow = "hidden";
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  switch (status) {
    case "idle":
      return (
        <StyledApp>
          <Searchbar onSubmit={onSubmit} />
        </StyledApp>
      );

    case "pending":
      return (
        <StyledApp>
          <Searchbar onSubmit={onSubmit} />
          <ImageGallery images={images} onImageSelect={onImageSelect} />
          <Spinner />
          {images.length > 0 && <Button onClick={onLoadMore} />}
        </StyledApp>
      );

    case "resolve":
      return (
        <StyledApp>
          <Searchbar onSubmit={onSubmit} />
          <ImageGallery images={images} onImageSelect={onImageSelect} />
          {images.length > 0 && <Button onClick={onLoadMore} />}
          {selectedImage && (
            <Modal image={selectedImage} onClose={onModalClose} />
          )}
        </StyledApp>
      );

    default:
      return (
        <StyledApp>
          <Searchbar onSubmit={onSubmit} />
        </StyledApp>
      );
  }
};

// export class App extends Component {
//   state = {
//     searchQuery: "",
//     page: 1,
//     images: [],
//     selectedImage: null,
//     status: "idle",
//   };

// async componentDidUpdate(prevProps, prevState) {
//   const { searchQuery, page } = this.state;

//   if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//     this.setState({ status: "pending" });

//     try {
//       const images = await Api.getImages(searchQuery, page);

//       if (!images.length) {
//         throw new Error();
//       }

//       this.setState((prevState) => ({
//         images: [...prevState.images, ...images],
//         status: "resolve",
//       }));
//     } catch (err) {
//       this.setState({ status: "idle" });

//       Notify.notFound(searchQuery);
//     }

// page > 1 &&
//   window.scrollTo({
//     top: document.documentElement.scrollHeight,
//     behavior: "smooth",
//   });
//   }
// }

//   resetState = () => {
//     this.setState({
//       searchQuery: "",
//       page: 1,
//       images: [],
//       selectedImage: null,
//       status: "idle",
//     });
//   };

// onSubmit = (searchQuery) => {
//   const repeatedQuery = this.state.searchQuery === searchQuery

//   if (repeatedQuery) {
//     return
//   }

//   this.resetState()
//   this.setState({ searchQuery })
// }

// onModalClose = () => {
//   this.setState({ selectedImage: null });
//   document.body.classList.remove("modal-open");
// };

// onImageSelect = (src, alt) => {
//   this.setState({ selectedImage: { src, alt }});
//   document.body.classList.add("modal-open");
// };

// onLoadMore = () => {
//   this.setState((prevState) => ({ page: prevState.page + 1 }));
// };

//   render() {
//     const { images, selectedImage, status, isModalOpen } = this.state;

//     switch (status) {
//       case "idle":
//         return (
//           <StyledApp>
//             <Searchbar onSubmit={this.onSubmit} />
//           </StyledApp>
//         );

//       case "pending":
//         return (
//           <StyledApp>
//             <Searchbar onSubmit={this.onSubmit} />
//             <ImageGallery images={images} onImageSelect={this.onImageSelect} />
//             <Spinner />
//             {images.length > 0 && <Button onClick={this.onLoadMore} />}
//           </StyledApp>
//         );

//       case "resolve":
//         return (
//           <StyledApp>
//             <Searchbar onSubmit={this.onSubmit} />
//             <ImageGallery images={images} onImageSelect={this.onImageSelect} />
//             {images.length > 0 && <Button onClick={this.onLoadMore} />}
//             {isModalOpen && (
//               <Modal image={selectedImage} onClose={this.onModalClose} />
//             )}
//           </StyledApp>
//         );

//       default:
//         return (
//           <StyledApp>
//             <Searchbar onSubmit={this.onSubmit} />
//           </StyledApp>
//         );
//     }
//   }
// }
