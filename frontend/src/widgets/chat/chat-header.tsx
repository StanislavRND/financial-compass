import { useEffect, useRef, useState } from 'react'
import { getInfoFamilyForUser } from '../../shared/api/user'
import { FamilyData } from '../../shared/types/family'
import styles from './chat-header.module.scss'

interface ChatHeaderProps {
  typingUsers: number[]
}

export const ChatHeader = ({ typingUsers }: ChatHeaderProps) => {
  const [family, setFamily] = useState<FamilyData | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const data = await getInfoFamilyForUser()
        setFamily(data || null)
      } finally {
        setLoading(false)
      }
    }
    fetchFamily()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  if (loading) {
    return (
      <div className={styles.header}>
        <div className={styles.name}>Загрузка...</div>
      </div>
    )
  }

  if (!family || !family.members || family.members.length === 0) {
    return (
      <div className={styles.header}>
        <div className={styles.name}>Семейный чат не найден</div>
      </div>
    )
  }

  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.chatInfo}>
          <div className={styles.name}>Семейный чат</div>
        </div>

        {typingUsers.length > 0 && (
          <div className={styles.typingIndicator}>
            {typingUsers.length === 1
              ? 'Кто-то печатает...'
              : `${typingUsers.length} человека печатают...`}
          </div>
        )}

        <div className={styles.userInfo}>
          <button
            ref={buttonRef}
            className={styles.membersButton}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Участники
            <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>▼</span>
          </button>

          {isOpen && (
            <div ref={dropdownRef} className={styles.dropdown}>
              {family.members.map((member) => (
                <div
                  key={member.id}
                  className={styles.dropdownItem}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.avatarSmall}>
                    {member.name ? member.name[0].toUpperCase() : '?'}
                  </span>
                  <span className={styles.userName}>{member.name || 'Без имени'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
