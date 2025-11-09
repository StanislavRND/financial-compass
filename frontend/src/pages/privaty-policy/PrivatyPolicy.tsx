import React from 'react'
import styles from './PrivatyPolicy.module.scss'

export const PrivacyPolicy: React.FC = () => {
  const handleBack = () => {
    sessionStorage.setItem('scrollToBottom', 'true')
    window.history.back()
  }

  return (
    <section className={styles.policy}>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={handleBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Назад</span>
        </button>

        <h1 className={styles.title}>Политика конфиденциальности</h1>

        <p>
          Настоящая Политика конфиденциальности описывает, как проект{' '}
          <strong>«Финансовый компас»</strong> обрабатывает и защищает персональные данные
          пользователей.
        </p>

        <h2>1. Сбор информации</h2>
        <p>
          Мы собираем только те данные, которые необходимы для работы Сервиса: логин, пароль и, при
          необходимости, статистику по вашим доходам и расходам. Никакие данные не передаются
          третьим лицам без вашего согласия.
        </p>

        <h2>2. Использование данных</h2>
        <p>
          Полученные данные используются исключительно для предоставления функционала: вход в
          аккаунт, сохранение и анализ финансовых операций. Мы не используем персональные данные для
          рекламы.
        </p>

        <h2>3. Хранение и защита</h2>
        <p>
          Все данные хранятся на защищённых серверах. Мы применяем современные методы шифрования и
          регулярно обновляем систему безопасности.
        </p>

        <h2>4. Права пользователя</h2>
        <p>
          Вы можете в любой момент запросить удаление своих данных, изменить их или получить копию.
          Для этого свяжитесь с нами через почту, оставленную ниже.
        </p>

        <h2>5. Изменения в политике</h2>
        <p>
          Мы можем обновлять настоящую политику. Новая версия вступает в силу с момента публикации
          на сайте.
        </p>

        <h2>6. Контакты</h2>
        <p>
          По вопросам конфиденциальности обращайтесь по адресу:
          <br />
          <a href="mailto:stassinelnikov6@gmail.com">stassinelnikov6@gmail.com</a>
        </p>
      </div>
    </section>
  )
}
