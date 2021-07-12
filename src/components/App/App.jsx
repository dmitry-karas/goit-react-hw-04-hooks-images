import React, { Component } from "react";
import { StyledApp } from "./App.styled";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { Spinner } from "../Spinner/Spinner";
import { Api } from "../../services/api";
import { Notify } from "../../services/notifications";

export class App extends Component {
  state = {
    searchQuery: "",
    page: 1,
    images: [],
    selectedImage: null,
    status: "idle",
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: "pending" });

      try {
        const images = await Api.getImages(searchQuery, page);

        if (!images.length) {
          throw new Error();
        }

        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          status: "resolve",
        }));
      } catch (err) {
        this.setState({ status: "idle" });

        Notify.notFound(searchQuery);
      }

      page > 1 &&
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
    }
  }

  resetState = () => {
    this.setState({
      searchQuery: "",
      page: 1,
      images: [],
      selectedImage: null,
      isModalOpen: false,
      status: "idle",
    });
  };

  onSubmit = (searchQuery) => {
    const repeatedQuery = this.state.searchQuery === searchQuery;

    if (repeatedQuery) {
      return;
    }

    this.resetState();
    this.setState({ searchQuery });
  };

  onModalClose = () => {
    this.setState({ selectedImage: null, isModalOpen: false });
    document.body.classList.remove("modal-open");
  };

  onImageSelect = (src, alt) => {
    this.setState({ selectedImage: { src, alt }, isModalOpen: true });
    document.body.classList.add("modal-open");
  };

  onLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, selectedImage, status, isModalOpen } = this.state;

    switch (status) {
      case "idle":
        return (
          <StyledApp>
            <Searchbar onSubmit={this.onSubmit} />
          </StyledApp>
        );

      case "pending":
        return (
          <StyledApp>
            <Searchbar onSubmit={this.onSubmit} />
            <ImageGallery images={images} onImageSelect={this.onImageSelect} />
            <Spinner />
            {images.length > 0 && <Button onClick={this.onLoadMore} />}
          </StyledApp>
        );

      case "resolve":
        return (
          <StyledApp>
            <Searchbar onSubmit={this.onSubmit} />
            <ImageGallery images={images} onImageSelect={this.onImageSelect} />
            {images.length > 0 && <Button onClick={this.onLoadMore} />}
            {isModalOpen && (
              <Modal image={selectedImage} onClose={this.onModalClose} />
            )}
          </StyledApp>
        );

      default:
        return (
          <StyledApp>
            <Searchbar onSubmit={this.onSubmit} />
          </StyledApp>
        );
    }
  }
}
