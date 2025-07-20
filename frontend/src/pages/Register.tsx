import styles from '../shared/styles/global.module.scss'
import { AuthForm } from '../widgets/auth-form'
export const Register = () => {
  return (
    <div className={styles.auth}>
      <AuthForm
        title="Регистрация"
        buttonText="Создать аккаунт"
        toggleText="Есть аккаунт?"
        toggleLink="Кликни для авторизации!"
        routeLink="login"
        fields={[
          { name: 'name', type: 'text', placeholder: 'Имя' },
          { name: 'login', type: 'text', placeholder: 'Логин' },
          { name: 'password', type: 'password', placeholder: 'Пароль' },
          { name: 'isFamily', type: 'checkbox', placeholder: '' },
        ]}
        mode={'register'}
      />
    </div>
  )
}
