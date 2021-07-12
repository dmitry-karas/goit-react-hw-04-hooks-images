import Swal from "sweetalert2";

export class Notify {
  static notFound(query) {
    Swal.fire({
      title: "Oops!",
      text: `No results were found for "${query}"`,
      icon: "error",
      confirmButtonColor: "#3f51b5",
    });
  }

  static repeatedQuery(query) {
    Swal.fire({
      title: "Repeated query!",
      text: `Results for "${query}" are already shown`,
      icon: "info",
      confirmButtonColor: "#3f51b5",
    });
  }
}
