import React, { useState } from 'react';

import {Button, Modal, Input, Select, Card} from "react-daisyui";

const ActivityTracking = () => {
    const goalTypeOptions = [
        'Weight Loss',
        'Muscle Gain',
        'Cardio Endurance',
        'Flexibility',
        'Strength Training',
        'Overall Fitness'
    ];

    const onSave = ()=>{
        handleClose();
    }
    const [activityGoal, setActivityGoal] = useState('default');
    const [isActivityPopupOpen, setIsActivityPopupOpen] = useState(false);

    const handleOpen = () => setIsActivityPopupOpen(true);
    const handleClose = () => setIsActivityPopupOpen(false);
    return (
        <>
        <div className="flex items-center justify-between mb-6 p-6">
            <div className="activity-header text-2xl text-indigo-600">Activities</div>
            <Button className={'add-activity-btn'} startIcon={<svg xmlns="http://www.w3.org/2000/svg"
                                                                   className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                                                   stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m-6-6h12"/>
            </svg>} size='sm' color='primary' onClick={handleOpen}>Add Activity</Button>
            <Modal.Legacy open={isActivityPopupOpen}>
                <Modal.Header className="font-bold">Add Activity</Modal.Header>
                <Modal.Body>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 items-center gap-4">
                            <label className="text-center" htmlFor="goal">
                                Activity Date
                            </label>
                            <Select id={'goal'} value={activityGoal}
                                    onChange={(event) => {
                                        setActivityGoal(event.target.value)
                                    }}
                            defaultValue={'default'}>
                                <option className="text-md leading-6 text-gray-900" value={'default'} disabled>
                                    Please pick a Goal to Map Activity
                                </option>
                                {goalTypeOptions && goalTypeOptions.map((option, index) => (
                                    <option key={index} className="text-md leading-6 text-gray-900"
                                            value={option}>{option}</option>))}
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <label className="text-center" htmlFor="duration">
                                Workout Duration (In minutes)
                            </label>
                            <Input type='number' pattern="[0-9]*" id={'duration'} placeholder={'Add Duration'}
                                   color={'neutral'}
                                   className="text-md leading-6 text-gray-900"
                            />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <label className="text-center" htmlFor="calories">
                                Calories Burned
                            </label>
                            <Input type='number' pattern="[0-9]*" id={'calories'} placeholder={'Calories Burned'}
                                   color={'neutral'}
                                   className="text-md leading-6 text-gray-900"
                                   required/>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <label className="text-center" htmlFor="activity_date">
                                Activity Date
                            </label>
                            <Input type='date' id={'activity_date'} placeholder={'Activity Date'}
                                   color={'neutral'}
                                   className="text-md leading-6 text-gray-900"
                                   required/>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Actions>
                    <Button color={"primary"} onClick={onSave}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Actions>
            </Modal.Legacy>
        </div>
            <div className="activity-card-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Card bordered={true} className='rounded-lg border bg-card text-card-foreground shadow-sm'>
                    <Card.Body>
                        <div className="activity-crd flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold">Running</h3>
                                <p className="text-gray-500">Cardio</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">30 min</p>
                                <p className="text-gray-500">2023-04-15</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default ActivityTracking;
