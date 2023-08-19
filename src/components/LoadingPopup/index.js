'use client';
import classNames from 'classnames/bind';
import styles from './LoadingPopup.module.scss';
import { Spinner } from 'flowbite-react';

const cx = classNames.bind(styles);

function LoadingPopup() {
    return (
        <div className={cx('popup')}>
            <div className={cx('popup-inner')}>
                <div className={cx('loading-spinner')}>
                    <i className="fas fa-spinner fa-spin"></i> Loading...
                </div>
            </div>
        </div>
    );
}

export default LoadingPopup;
