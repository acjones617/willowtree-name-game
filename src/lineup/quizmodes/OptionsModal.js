import React from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import FilterOptions from './FilterOptions';
import Toggles from './Toggles';

/**
 * Component handling the modal containing the filter modes and the game play
 * toggles.
 */
class OptionsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMode: props.mode,
      selectedToggles: props.toggles,
      showModal: false,
    }
  }

  handleModalClose() {
    if (this.hasModeToggleChanged()) {
      this.props.onChange(this.state.selectedMode, this.state.selectedToggles);
    }
    this.setState({ showModal: false });
  }

  /**
   * Determines if the selected modes and toggles have changed since the modal
   * was opened.
   * @returns {boolean} true if it has changed.
   */
  hasModeToggleChanged() {
    return this.state.selectedMode !== this.props.mode ||
      Object.keys(this.state.selectedToggles).some(
        key => this.state.selectedToggles[key] !== this.props.toggles[key]);
  }

  handleModeChange(newMode) {
    this.setState({ selectedMode: newMode });
  }

  handleToggle(toggleName) {
    const selectedToggles = { ...this.state.selectedToggles };
    selectedToggles[toggleName] = !selectedToggles[toggleName];
    this.setState({ selectedToggles });
  }

  handleModalShow() {
    this.previousMode = this.state.mode;
    this.previousToggles = this.state.toggles;
    this.setState({ showModal: true });
  }

  render() {
    return (
      <React.Fragment>
        <Button bsStyle="primary" onClick={this.handleModalShow.bind(this)}>
          Select other game options
        </Button>
        <Modal show={this.state.showModal} onHide={this.handleModalClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Other Game Options</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert bsStyle="warning">Changing the mode restarts the game</Alert>
            <FilterOptions
              currentMode={this.state.selectedMode}
              onClick={newMode => this.handleModeChange(newMode)}
            />
            <Toggles
              options={this.state.selectedToggles}
              onChange={toggleName => this.handleToggle(toggleName)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleModalClose.bind(this)}>Ok</Button>
          </Modal.Footer>
        </Modal>
        </React.Fragment>
    );
  }
}

export default OptionsModal;
