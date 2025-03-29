import React from 'react';
import styles from './skeleton.module.css';
import ticketStyles from '../TicketList/ticket.list.module.css';

const SkeletonTicket: React.FC = () => {
  return (
    <div className={ticketStyles['ticketItem']}>
      <div className={ticketStyles['ticketHeader']}>
        <div className={`${styles['skeleton']} ${styles['descriptionSkeleton']}`}></div>
        <div className={ticketStyles['statusContainer']}>
          <div className={`${styles['skeleton']} ${styles['statusSkeleton']}`}></div>
        </div>
      </div>
      <div className={ticketStyles['ticketFooter']}>
        <div className={`${styles['skeleton']} ${styles['assigneeSkeleton']}`}></div>
        <div className={ticketStyles['completionContainer']}>
          <div className={`${styles['skeleton']} ${styles['checkboxLabelSkeleton']}`}></div>
          <div className={`${styles['skeleton']} ${styles['checkboxSkeleton']}`}></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonTicket;