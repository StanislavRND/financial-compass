import styles from '../shared/styles/global.module.scss'
import { AuthForm } from '../widgets/auth-form'

export const Login = () => {
  return (
    <div className={styles.auth}>
      <AuthForm
        title="Авторизация"
        buttonText="Войти"
        toggleText="Нет аккаунта?"
        toggleLink="Кликни для регистрации!"
        routeLink="register"
        fields={[
          { name: 'login', type: 'text', placeholder: 'Логин' },
          { name: 'password', type: 'password', placeholder: 'Пароль' },
        ]}
        mode={'login'}
      />
    </div>
  )
}
