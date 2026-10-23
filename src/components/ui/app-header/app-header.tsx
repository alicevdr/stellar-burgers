import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

// 👇 Возвращаем импорт типа
import type { TAppHeaderUIProps } from './type';

import styles from './app-header.module.css';

// 👇 Возвращаем деструктуризацию { userName }
export const AppHeaderUI = ({ userName }: TAppHeaderUIProps): React.JSX.Element => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text text_type_main-default ml-2 mr-10 ${isActive ? styles.link_active : styles.link}`
          }
        >
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default ml-2 mr-10">Конструктор</p>
            </>
          )}
        </NavLink>
        <NavLink
          to="/feed"
          className={({ isActive }) =>
            `text text_type_main-default ml-2 ${isActive ? styles.link_active : styles.link}`
          }
        >
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default ml-2">Лента заказов</p>
            </>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <NavLink to="/">
          <Logo className="" />
        </NavLink>
      </div>
      <div className={styles.link_position_last}>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `text text_type_main-default ml-2 ${isActive ? styles.link_active : styles.link}`
          }
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default ml-2">
                {/* 👇 ИСПОЛЬЗУЕМ userName ЗДЕСЬ */}
                {userName ?? 'Личный кабинет'}
              </p>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
