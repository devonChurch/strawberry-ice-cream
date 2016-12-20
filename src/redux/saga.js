import {takeEvery, delay} from 'redux-saga';
import {put} from 'redux-saga/effects';
import action from './action';

function* fetchTransformerAllegiance({data}) {

	const response = yield fetch(`/bin/is-autobot/?_id=${data._id}`);
	const {isAutobot} = yield response.json();

	yield put({
		type: action.UPDATE_TRANSFORMER_ALLEGIANCE,
		data: {
			_id: data._id,
			isAutobot
		}
	});

}

function* fetchTransformerAllegianceGateway() {

	yield takeEvery(action.FETCH_TRANSFORMER_ALLEGIANCE, fetchTransformerAllegiance);

}

function* rootSaga() {

	yield [
		fetchTransformerAllegianceGateway()
	];

}

export default rootSaga;
