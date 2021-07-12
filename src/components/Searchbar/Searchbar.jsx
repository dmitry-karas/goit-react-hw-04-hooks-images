import PropTypes from "prop-types";
import { useState } from "react";
import { Header, Form, Button, ButtonLabel, Input } from "./Searchbar.styled";

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;

    setValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(value);

    setValue("");
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button>
          <ButtonLabel>Search</ButtonLabel>
        </Button>
        <Input
          value={value}
          onChange={handleInputChange}
          placeholder="Search images"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

// export class Searchbar extends Component {
//   static propTypes = { onSubmit: PropTypes.func.isRequired }

//   state = { value: '' }

// handleInputChange = (e) => {
//   const value = e.target.value

//   this.setState({ value })
// }

// handleSubmit = (e) => {
//   e.preventDefault()

//   this.props.onSubmit(this.state.value)
//   this.resetState()
// }

// resetState = () => {
//   this.setState({ value: '' })
// }

//   render() {
//     const { value } = this.state

// return (
//   <Header>
//     <Form onSubmit={this.handleSubmit}>
//       <Button>
//         <ButtonLabel>Search</ButtonLabel>
//       </Button>
//       <Input
//         value={value}
//         onChange={this.handleInputChange}
//         placeholder="Search images"
//       />
//     </Form>
//   </Header>
// )
//   }
// }
