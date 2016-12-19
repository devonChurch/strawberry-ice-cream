import {takeEvery, delay} from 'redux-saga';
import {put} from 'redux-saga/effects';
import action from './action';

// import createSagaMiddleware from 'redux-saga';


// function

// Our worker Saga: will perform the async increment task
function* fetchTransformerAllegiance({data}) {


	console.log('incrementAsync', data);
	console.log(arguments);

	// yield delay(1000);
	const response = yield fetch(`/bin/is-autobot/?_id=${data._id}`);
	const {isAutobot} = yield response.json();

	console.log('isAutobot', isAutobot);

	yield put({
		type: action.UPDATE_TRANSFORMER_ALLEGIANCE,
		data: {
			_id: data._id,
			isAutobot
		}
	});

}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* fetchTransformerAllegianceGateway() {

	console.log('watchIncrementAsync');
	console.log(arguments);

	yield takeEvery(action.FETCH_TRANSFORMER_ALLEGIANCE, fetchTransformerAllegiance);

}

// single entry point to start all Sagas at once
function* rootSaga() {

	console.log('rootSaga');

	yield [
		fetchTransformerAllegianceGateway()
	];

}

export default rootSaga;
