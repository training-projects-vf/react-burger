/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../redux/store';
import { Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getIngredients } from '../../redux/actions/ingredientsActions';
import { Header } from '../Header/Header';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { Modal } from '../Modal/Modal';
import { Error } from '../Error/Error';
import { Login } from '../../pages/Login/Login';
import { ForgotPassword } from '../../pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../../pages/ResetPassword/ResetPassword';
import { Profile } from '../../pages/Profile/Profile';
import { NotFound404 } from '../../pages/NotFound404/NotFound404';
import { IngredientDetails } from '../IngredientDetails/IndgredientDetails';
import { Registration } from '../../pages/Registration/Registration';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { checkAuthorization } from '../../redux/actions/authActions';
import { Orders } from '../UserOrders/UserOrders';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';
import styles from './App.module.css'
import { Location } from 'history'
import { Dashboard } from '../../pages/Dashboard/Dashboard';
import { Order } from '../Order/Order';

function App() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  const { isError, errorMessage, isSuccess: isIngredients } = useSelector((store) => store.ingredients);
  const { name } = useSelector((store) => store.auth.user);

  useEffect(() => {
    dispatch(checkAuthorization())
    dispatch(getIngredients())
  }, [])

  return (
    <>
      <Routes location={state?.backgroundLocation || location} >

        <Route path='/*' element={
          <>
            <main className={styles.main}>
              <Header />
              <Outlet />

              {isError &&
                <Modal title="" closeIcon={false} >
                  <Error errorMessage={errorMessage} />
                </Modal>
              }
            </main>
          </>
        }>

          <Route index element={
            <>
              {isIngredients &&
                <DndProvider backend={HTML5Backend} >
                  <section className={styles.section_content}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </section>
                </DndProvider>
              }
            </>
          } />

          <Route path='feed' element={<Dashboard />} />
          <Route path='feed/:id' element={<Order />} />
          <Route path='login' element={<Login />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='ingredients/:id' element={isIngredients && <IngredientDetails />} />
          <Route path='registration' element={<Registration />} />

          <Route path='profile/*'
            element={
              <ProtectedRoute>
                <ProfileMenu />
              </ProtectedRoute>
            }
          >

            <Route index element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path='orders'
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path='profile/orders/:id'
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            } />

          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>

      {state?.backgroundLocation &&
        <>
          <Routes>
            <Route path='/*' element={<Header />} />

            {isIngredients && (
              <Route
                path='ingredients/:id'
                element={
                  <>
                    <Modal
                      title="Детали ингредиента"
                      onClose={() => navigate(-1)}
                      closeIcon={true}
                    >
                      <IngredientDetails />
                    </Modal>
                  </>
                } />
            )}

            {isIngredients && (
              <Route
                path='feed/:id'
                element={
                  <>
                    <Modal
                      title=''
                      onClose={() => navigate(-1)}
                      closeIcon={true}
                    >
                      <Order />
                    </Modal>
                  </>
                } />
            )}

            {isIngredients && (
              <Route
                path='profile/orders/:id'
                element={
                  <ProtectedRoute>
                    <Modal
                      title={`Заказ пользователя ${name}`}
                      onClose={() => navigate(-1)}
                      closeIcon={true}
                    >
                      <Order />
                    </Modal>
                  </ProtectedRoute>
                } />
            )}

            {isError &&
              <Modal title="" closeIcon={false} >
                <Error
                  errorMessage={errorMessage}
                  errorMessage2={'сейчас не получится оформить заказ через терминал'}
                  errorMessage3={'сделайте заказ на кассе'}
                />
              </Modal>
            }

            <Route path='*' element={<NotFound404 />} />
          </Routes>
        </>
      }
    </>
  );
}

export default App;
