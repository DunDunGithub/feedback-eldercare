import classNames from 'classnames/bind';
import styles from './Feedback.module.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingPopup from '../LoadingPopup';

const cx = classNames.bind(styles);

const apiUrlAIP = `https://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/aip`;
const apiUrlGuardian = `https://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/guardian`;
const apiUrlFeedback = `https://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/feedback`;

function Feedback() {
    const [feedback, setFeedback] = useState({
        fullname: '',
        phone: '',
        email: '',
        relationship: '',
        guardian: '',
        aip: '',
        satisfactionLevel: 1,
        comment: '',
        workTime: new Date(),
    });

    const [loading, setLoading] = useState(false);
    const [aips, setAips] = useState([]);
    const [guardians, setGuardians] = useState([]);
    const [selectedAIP, setSelectedAIP] = useState(null);
    const [selectedGuardian, setSelectedGuardian] = useState(null);
    const [levelFeedback, setLevelFeedback] = useState(1);

    const fetchData = async () => {
        setLoading(true); // Show loading popup
        try {
            const responseAIP = await axios.get(apiUrlAIP);
            setAips(responseAIP.data);

            const responseGuardian = await axios.get(apiUrlGuardian);
            setGuardians(responseGuardian.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Hide loading popup regardless of success or failure
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(apiUrlFeedback, feedback)
            .then((res) => {
                // Call the callback function to trigger table update in DataViewAIP
                // Reset the form fields
                setFeedback({
                    fullname: '',
                    phone: '',
                    email: '',
                    relationship: '',
                    guardian: '',
                    aip: '',
                    satisfactionLevel: 1,
                    comment: '',
                    workTime: '',
                });
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        // Xử lý trường hợp checkbox
        const newValue = type === 'checkbox' ? e.target.checked : value;

        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [name]: newValue,
        }));
    };

    const [comment, setComment] = useState('');

    const handleGuardianChange = (e) => {
        const selectedGuardian = e.target.value;
        const selectedGuardianObject = guardians.find(
            (guardian) => guardian._id === selectedGuardian,
        );
        setSelectedGuardian(selectedGuardianObject);
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            guardian: selectedGuardianObject._id,
        }));
    };

    console.log(feedback);

    const handleCommentChange = (event) => {
        const newComment = event.target.value;
        setComment(newComment);
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            comment: newComment,
        }));
    };

    const handleLevelChange = (e) => {
        const selectedLevel = parseInt(e.target.value, 10); // Parse the value as an integer
        setLevelFeedback(selectedLevel); // Update levelFeedback state
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            satisfactionLevel: selectedLevel, // Use the updated value here
        }));
    };

    const handleAIPChange = (e) => {
        const selectedAip = e.target.value;
        const selectedAIPObject = aips.find((aip) => aip._id === selectedAip);
        setSelectedAIP(selectedAIPObject);
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            aip: selectedAIPObject._id,
        }));
    };

    return (
        <div className={cx('wrap-form')}>
            <h3>Feedback</h3>
            <form
                noValidate
                onSubmit={handleSubmit}
                className={cx('main-form')}
            >
                {/* Fullname */}
                <div className={cx('form-item')}>
                    <label htmlFor="fullname">Fullname</label>
                    <input
                        name="fullname"
                        placeholder="Fullname"
                        value={feedback.fullname}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Phone */}
                <div className={cx('form-item')}>
                    <label htmlFor="phone">Phone number</label>
                    <input
                        name="phone"
                        placeholder="Phone number"
                        value={feedback.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Email */}
                <div className={cx('form-item')}>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        placeholder="Status"
                        value={feedback.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Relationship */}
                <div className={cx('form-item')}>
                    <label htmlFor="relationship">Relationship</label>
                    <input
                        name="relationship"
                        placeholder="Relationship"
                        value={feedback.relationship}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* AIP */}
                <div className={cx('form-item')}>
                    <label htmlFor="aip">AIP</label>
                    <select
                        id="aip"
                        value={selectedAIP ? selectedAIP._id : ''}
                        onChange={handleAIPChange}
                        style={{width:'220px', height:'36px' ,padding:'2px', fontSize:'18px'}}
                    >
                        {aips.map((aip, index) => (
                            <option key={index} value={aip._id}>
                                {aip.firstName + ' ' + aip.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Guardian */}
                <div className={cx('form-item')}>
                    <label htmlFor="guardian">Guardian</label>
                    <select
                        id="guardian"
                        value={selectedGuardian ? selectedGuardian._id : ''}
                        onChange={handleGuardianChange}
                        style={{width:'220px', height:'36px' ,padding:'2px', fontSize:'18px'}}
                    >
                        {guardians.map((guardian, index) => (
                            <option key={index} value={guardian._id}>
                                {guardian.firstName + ' ' + guardian.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* satisfactionLevel */}
                <div className={cx('form-item')}>
                    <label htmlFor="satisfactionLevel">
                        Satisfaction Level
                    </label>
                    <select
                        id="satisfactionLevel"
                        value={levelFeedback}
                        onChange={handleLevelChange}
                        style={{width:'220px', height:'36px' ,padding:'2px', fontSize:'18px'}}
                    >
                        {[1, 2, 3, 4, 5].map((level) => (
                            <option key={level} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Comment */}
                <div className={cx('form-item', 'comment-input')}>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        placeholder="Nhập nhận xét của bạn..."
                        value={comment}
                        onChange={handleCommentChange}
                        rows={4}
                        name="comment"
                    />
                </div>

                <button type="submit" style={{padding:'10px 20px', fontSize:'20px'}}>Submit</button>
            </form>
            {loading && <LoadingPopup />}
        </div>
    );
}

export default Feedback;
