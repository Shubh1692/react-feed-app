import { constants } from '../Helper/Constant';

/**
 * This method use for add feed details on redux store
 * @param {*} feed feed details
 */
export async function addFeed(dispatch, {
    title, description, userId = 'Test'
}) {
    dispatch({
        type: constants.IS_LOADING
    });
    try {
        const feedReq = await fetch(`http://localhost:5001/react-redux-feed/us-central1/addFeed`, {
            method: 'POST',
            body: JSON.stringify({
                title, description, userId
            })
        });
        const { feed } = await feedReq.json();
        dispatch({
            type: constants.ADD_NEW_FEED,
            payload: {
                feed
            }
        });
    } catch (error) {
        dispatch({
            type: constants.HAS_ERROR,
            payload: {
                error
            }
        });
    }
}




/**
 * This method use for edid feed details on redux store
 * @param {*} feed feed details
 */
export async function updateFeed(dispatch, {
    title, description, userId = 'Test', id
}) {
    dispatch({
        type: constants.IS_LOADING
    });
    try {
        const feedReq = await fetch(`http://localhost:5001/react-redux-feed/us-central1/updateFeed`, {
            method: 'POST',
            body: JSON.stringify({
                title, description, userId, id
            })
        });
        const { feed } = await feedReq.json();
        dispatch({
            type: constants.UPDATE_FEED,
            payload: {
                feed,
                id
            }
        });
    } catch (error) {
        dispatch({
            type: constants.HAS_ERROR,
            payload: {
                error
            }
        });
    }
}



/**
 * This method use fetch and load all feed details on redux store
 */
export async function fetchFeeds(dispatch, userId) {
    dispatch({
        type: constants.IS_LOADING
    });
    try {
        const feedReq = await fetch(`http://localhost:5001/react-redux-feed/us-central1/feeds?userId=${userId}`);
        const { feeds } = await feedReq.json();
        dispatch({
            type: constants.LIST_FEED,
            payload: {
                feeds
            }
        });
    } catch (error) {
        dispatch({
            type: constants.HAS_ERROR,
            payload: {
                error
            }
        });
    }
}
