import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './ingredientsActions';
import { getIngredientsApi } from '../../utils/getIngredientsApi';

describe('getIngrets thunk action test', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        {
          data: [],
          succcess: true
        }
      ),
      ok: true,
    })
  })

  afterEach(() => {
    jest.restoreAllMocks();
  })

  test('actions after getIngredients thunk dispatch', () => {
    const middlewares = [thunk.withExtraArgument([getIngredientsApi])];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ data: null })

    fetch.mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        data: [],
        success: true
      }),
    }));

    const expectedActions = [
      { type: actions.INGREDIENTS_REQUEST },
      {
        type: actions.INGREDIENTS_REQUEST_SUCCESS,
        ingredients: [],
      }
    ]

    return store.dispatch(actions.getIngredients())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

})
