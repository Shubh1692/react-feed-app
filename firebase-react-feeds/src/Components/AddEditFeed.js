import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { get } from 'lodash';
import * as firebase from 'firebase';
import { addFeed, updateFeed } from '../Actions/feeds';
import { ModalAction } from '../app-style';

class AddFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: ""
        }
    }

    /**
     * This method is life cycle of ReactJS used for set feed description on edit otherwise return null
     * @param {*} props Parent state of component
     * @param {*} state Current state of component
     * @returns updated state object or null
     */
    static getDerivedStateFromProps(props, state) {
        const data = get(props, 'data', {
            title: '',
            description: ''
        });
        if (data && data.title !== state.title && !state.title) {
            return {
                data: props.data,
                title: get(props, 'data.title', ''),
                description: get(props, 'data.description', ''),
            };
        }
        return null;
    }


    /**
     * This method used for set current value of feeds inputs
     * @param {*} event On change input event object for read input value
     */
    async handleChange(event) {
        const { name, value } = event.target;
        await this.setState({
            [name]: value
        });
    }

    /**
     * This method used for submit feed details
     * Calling dispatch action based on id for add/update feed
     */
    async handleSubmit() {
        const { title, description } = this.state;
        const { addFeed, updateFeed } = this.props;
        const { id } = this.props;
        if (id)
            updateFeed({
                title, description, id, userId: firebase.auth().currentUser.uid
            })
        else
            addFeed({
                title, description, userId: firebase.auth().currentUser.uid
            })
        await this.setState({ title: '', description: '' });
        await this.props.handleClose();
    }

    render() {
        const { open, handleClose, id } = this.props;
        const { title, description } = this.state;
        return (
            <Modal size={'mini'} open={open} onClose={handleClose}>
                <Modal.Header>  {id ? 'Update' : 'Add'} Feed</Modal.Header>
                <AvForm className="p-20" onValidSubmit={(e) => this.handleSubmit(e)}>
                    <Modal.Content>
                        <div className="ui form">
                            <div className="field">
                                <label>Title</label>
                                <AvField
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    onChange={(e) => this.handleChange(e)}
                                    value={title || ""}
                                    placeholder="Enter title"
                                    validate={{
                                        required: {
                                            value: true,
                                            errorMessage: "This field is required to proceed",
                                        },
                                    }}
                                />
                            </div>
                            <div className="field">
                                <label>Description</label>
                                <AvField
                                    type="textarea"
                                    rows={4}
                                    className="form-control"
                                    name="description"
                                    onChange={(e) => this.handleChange(e)}
                                    value={description || ""}
                                    placeholder="Enter description"
                                    validate={{
                                        required: {
                                            value: true,
                                            errorMessage: "This field is required to proceed",
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </Modal.Content>
                    <ModalAction className="newFeedFooter">
                        <Button onClick={() => handleClose()}>CANCEL</Button>
                        <Button disabled={!firebase.auth().currentUser} type="submit" primary> {id ? 'Update' : 'Add'}</Button>
                    </ModalAction>
                </AvForm>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        feedList: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addFeed: ({ userId, title, description }) => addFeed(dispatch, {
            userId, title, description
        }),
        updateFeed: ({ userId, title, description, id }) => updateFeed(dispatch, {
            userId, title, description, id
        }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFeed);