import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import Select from 'react-select';

import React, { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Dropdown(props) {
    const { apiUrl, selectedOption, setSelectedOption, setListDatas, selectedAip } = props;

    const [options, setOptions] = useState([]);

    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    const handleSelectChange = (selected) => {
        setSelectedOption(selected);
    };

    useEffect(() => {
        fetchData()
            .then((data) => {
                setListDatas(data);
                setOptions(data); // Lưu dữ liệu từ API vào state options
            })
            .catch((error) => {
                console.error('Error loading data:', error);
            });
    }, []);

    const customOptions = options.map((option) => ({
        value: option._id,
        label: option.firstName + ' ' + option.lastName,
    }));

    return (
        <div>
            <Select
                className={cx('dropdown')}
                options={customOptions}
                onChange={handleSelectChange}
                selectedItem={selectedOption}
            >
            </Select>
        </div>
    );
}

export default Dropdown;
