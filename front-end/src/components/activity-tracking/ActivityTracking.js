import React, {useMemo, useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import {Button, Modal, Input, Select, Card} from "react-daisyui";
import {getAllActivities, getFormattedDate, createActivities,convertMinsToHrsMins} from "queries/activites";
import {getAuth, onAuthStateChanged} from "firebase/auth";
const ActivityTracking = () => {
    const goalTypeOptions = [
        'Weight Loss',
        'Muscle Gain',
        'Cardio Endurance',
        'Flexibility',
        'Strength Training',
        'Overall Fitness'
    ];


    const activityType = [
        'Running',
        'Jogging',
        'Swimming',
        'Yoga',
        'Gym Exercise',
        'Cycling'
    ];
    const auth = getAuth();
    const [activityGoal, setActivityGoal] = useState('default');
    const [activitySelected, setActivitySelected] = useState('default');
    const [isActivityPopupOpen, setIsActivityPopupOpen] = useState(false);

    const handleOpen = () => setIsActivityPopupOpen(true);
    const handleClose = () => {
        resetActivityForm();
        setIsActivityPopupOpen(false)
    };
    const [userCredential, setUserCredential] = useState({});
    const [activities, setActivities] = useState([]);
    const [activityDate, setActivityDate] = useState("");
    const [activityDuration, setActivityDuration] = useState("");
    const [activityCalories, setActivityCalories] = useState("");
    const onSave = () => {
        console.log(activityGoal, activitySelected, activityDuration, activityCalories, activityDate)
        const activityPayload = {
            "userId": userCredential?.uid,
            "activityType": activitySelected,
            "duration": activityDuration,
            "caloriesBurned": activityCalories
        }

        createActivities(activityPayload).then(data => {
            console.log('Activity Created with Data::', data);
            handleClose();
            getAllActivities(userCredential?.uid).then((activities) => {
                setActivities(activities);
            }).catch((err) => {
                console.log(err);
            })
            toast.success("Activity Added successfully.");
            resetActivityForm();
        }).catch(error => {
            toast.error("Something Went Wrong, Please try again!.");
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    const resetActivityForm = ()=>{
        setActivityGoal('default');
        setActivitySelected('default');
        setActivityDate('');
        setActivityCalories("");
        setActivityDuration("");
    }

    useMemo(() => {
        onAuthStateChanged(auth, (user) => {
            const uid = user?.uid;
            if (uid) {
                setUserCredential(user);
            }
            getAllActivities(uid).then((activities)=>{
                console.log(activities);
                setActivities(activities);
            }).catch((err)=>{
                console.log(err);
            })
        })

    }, []);
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
                                Activity Towards the Goal
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
                            <label className="text-center" htmlFor="goal">
                                Type of Activity
                            </label>
                            <Select id={'goal'} value={activitySelected}
                                    onChange={(event) => {
                                        setActivitySelected(event.target.value)
                                    }}
                                    defaultValue={'default'}>
                                <option className="text-md leading-6 text-gray-900" value={'default'} disabled>
                                    Please select an Activity
                                </option>
                                {activityType && activityType.map((option, index) => (
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
                                       value={activityDuration}
                                       onChange={(event)=>setActivityDuration(event.target.value)}
                                required/>
                            </div>
                            <div className="grid grid-cols-2 items-center gap-4">
                                <label className="text-center" htmlFor="calories">
                                    Calories Burned
                                </label>
                                <Input type='number' pattern="[0-9]*" id={'calories'} placeholder={'Calories Burned'}
                                       color={'neutral'}
                                       className="text-md leading-6 text-gray-900"
                                       value={activityCalories}
                                       onChange={(event)=>setActivityCalories(event.target.value)}
                                       required/>
                            </div>
                            <div className="grid grid-cols-2 items-center gap-4">
                                <label className="text-center" htmlFor="activity_date">
                                    Activity Date
                                </label>
                                <Input type='date' id={'activity_date'} placeholder={'Activity Date'}
                                       color={'neutral'}
                                       className="text-md leading-6 text-gray-900"
                                       value={activityDate}
                                       onChange={(event)=>setActivityDate(event.target.value)}
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
                {activities && activities.map((activity, index) => (
                    <Card key={index} bordered={true}
                          className='rounded-lg border bg-card text-card-foreground shadow-sm'>
                        <Card.Body>
                            <div className="activity-crd flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold">{activity?.activityType}</h3>
                                    {/*<p className="text-gray-500">Cardio</p>*/}
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold">{activity?.duration > 60 ? convertMinsToHrsMins(activity?.duration) : activity?.duration + 'min'} </p>
                                    <p className="text-gray-500">{getFormattedDate(activity?.createdAt)}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <ToastContainer
                position="bottom-center" // Set default position for all toasts
                autoClose={2000} />
        </>
    );
}

export default ActivityTracking;
