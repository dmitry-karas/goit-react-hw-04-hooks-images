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
}
