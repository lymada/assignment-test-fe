import React from 'react';
import styles from '../TicketList/ticket.list.module.css';

const Loading: React.FC = () => {
  return (
    <div className={styles['pageContainer']}>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <div className={styles['title']}>Ticket Manager</div>
          <div className={styles['addButton']}>Add New Ticket</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;