import Lottie from "lottie-react";
import faq from "../../assets/faqAnimate.json";

const Faq = () => {
  return (
    <div className="my-14">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-2 text-lg">
          Here are some of the most common questions and answers about
          StudyNexus.
        </p>
      </div>

      <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-4 my-6">
        <div className="w-1/2 flex justify-center">
          <Lottie animationData={faq} loop={true} className="h-44" />;
        </div>
        <div className="md:w-2/3">
          <div className="collapse collapse-arrow">
            <input type="radio" name="my-accordion-2" defaultChecked/>
            <div className="collapse-title text-xl font-medium">
              What is StudyNexus?
            </div>
            <div className="collapse-content">
              <p>
                StudyNexus is an online platform designed to facilitate group
                study sessions among friends. It allows users to create study
                assignments, complete them, and grade their friends' assignments
                collaboratively.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              How can I create a study assignment?
            </div>
            <div className="collapse-content">
              <p>
                To create a study assignment, simply navigate to the "Create
                Assignment" page and fill out the required fields, including the
                assignment title, description, marks, thumbnail image URL,
                difficulty level, and due date.
              </p>
            </div>
            <div className="collapse collapse-arrow ">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                Can I delete assignments created by other users?
              </div>
              <div className="collapse-content">
                <p>
                  No, you can only delete assignments that you have created. If
                  you attempt to delete an assignment created by another user,
                  you will receive an error message.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow ">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
              How can I submit an assignment?
              </div>
              <div className="collapse-content">
                <p>
                To submit an assignment, click on the "Take Assignment" button on the assignment details page. You will be prompted to provide a PDF/doc link and any additional notes before submitting.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow ">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
              How are pending assignments handled
              </div>
              <div className="collapse-content">
                <p>
                Pending assignments are displayed on the "Pending Assignments" page, where users can view all assignments that have not yet been marked. Users can grade pending assignments and provide feedback to their peers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
