export const getAllGoals = async ()=> {
    const response = await fetch(`/fitness-tracker/getAllGoal`);
    const data = await response.json();
    console.log(data);
    return data;
}