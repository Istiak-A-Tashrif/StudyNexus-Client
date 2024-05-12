import React from 'react';
import AssignmentCard from '../Home/AssignmentCard';

const AllAssignments = () => {
    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <AssignmentCard></AssignmentCard>
            <AssignmentCard></AssignmentCard>
            <AssignmentCard></AssignmentCard>
            <AssignmentCard></AssignmentCard>
            <AssignmentCard></AssignmentCard>
            <AssignmentCard></AssignmentCard>
        </div>
    );
};

export default AllAssignments;