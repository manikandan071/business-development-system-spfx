/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */

import * as React from "react";
import "./ProjectDetails.css";

interface IProjectDetailsProps {
  projectDetails: any;
}

const ProjectDetails: React.FC<IProjectDetailsProps> = ({ projectDetails }) => {
  return (
    <div className="project-details-wrapper">
      <div className="project-details-header">
        <p>Project Details</p>
      </div>
      <div className="project-details-content">
        <div className="project-details-item">
          <span>Project ID</span>
          <p>{projectDetails?.Id}</p>
        </div>
        <div className="project-details-item">
          <span>Name</span>
          <p>{projectDetails?.Name}</p>
        </div>
        <div className="project-details-item">
          <span>Total working days</span>
          <p>{projectDetails?.Days} days</p>
        </div>
        <div className="project-details-item">
          <span>Contributors</span>
          <p>Custom component</p>
        </div>
        <div className="project-details-item">
          <span>Status</span>
          <p
            style={{
              color: `${
                projectDetails?.Status?.toLowerCase() === "not started"
                  ? "#d93025"
                  : projectDetails?.Status?.toLowerCase() === "in progress"
                  ? "#ff9900"
                  : "#28a745"
              }`,
            }}
          >
            {projectDetails?.Status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
