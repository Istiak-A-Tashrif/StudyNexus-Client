import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';

const CheckPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
    return (
        <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Live Website</th>
                  <th>Repository</th>
                  <th>Counts in</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover cursor-pointer">
                  <td>Sample Assignment</td>
                  <td><a className="font-bold text-[#AD88C6] underline">Demo URL</a></td>
                  <td><a className="font-bold text-[#AD88C6] underline">Link</a></td>
                  <td>60</td>
                  <td><button className="font-bold text-blue-700 underline" onClick={handleOpenModal}>Give feedback</button></td>
                </tr>
                
              </tbody>
            </table>
            <FeedbackForm isOpen={isModalOpen} onClose={handleCloseModal} />
          </div>
    );
};

export default CheckPage;