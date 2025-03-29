import React from 'react';
import styles from './skeleton.module.css';
import detailStyles from '../TicketDetail/ticket.detail.module.css';

const SkeletonDetail: React.FC = () => {
  return (
    <div className={detailStyles['container']}>
       
      <div className={detailStyles['formCard']}>
        <h1 className={detailStyles['title']}>
          <div className={`${styles['skeleton']}`} style={{ width: '200px', height: '30px' }}></div>
        </h1>
        
        <div className={detailStyles['formGroup']}>
          <label className={detailStyles['label']}>Description</label>
          <div className={`${styles['skeleton']}`} style={{ width: '100%', height: '100px' }}></div>
        </div>
        
        <div className={detailStyles['formGroup']}>
          <label className={detailStyles['label']}>Assignee</label>
          <div className={`${styles['skeleton']}`} style={{ width: '100%', height: '40px' }}></div>
        </div>
        
        <div className={detailStyles['formGroup']}>
          <div className={detailStyles['statusContainer']}>
            <span className={detailStyles['statusLabel']}>Status:</span>
            <div className={`${styles['skeleton']}`} style={{ width: '150px', height: '30px', borderRadius: '9999px' }}></div>
          </div>
        </div>
        
        <div className={detailStyles['buttonGroup']}>
          <div className={`${styles['skeleton']}`} style={{ width: '100px', height: '40px' }}></div>
          <div className={`${styles['skeleton']}`} style={{ width: '100px', height: '40px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetail; 